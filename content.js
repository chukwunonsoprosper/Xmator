/**
 * Xmator Content Script
 * 
 * This script provides automated follow/unfollow functionality for Twitter/X.
 * It analyzes user profiles and takes actions based on bio content and specified keywords.
 * 
 * Features:
 * - Smart bio detection and keyword matching
 * - Support for both follow and unfollow operations
 * - Automatic confirmation handling for unfollow actions
 * - Duplicate profile detection to prevent repeated actions
 * - Robust error handling and logging
 * 
 * @author Xmator Team
 * @version 2.0
 */

(function() {
    'use strict';
    
    // Prevent multiple instances from running simultaneously
    if (window.xmatorRunning) {
        console.log("Xmator: Instance already running on this page");
        return;
    }
    
    window.xmatorRunning = true;
    
    /**
     * Utility function to pause execution
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise} Promise that resolves after the specified time
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Global state variables
    let keywords = [];
    let mode = "unfollow";
    let processedProfiles = new Set();
    let actionCount = 0;

    /**
     * Initialize Xmator with user settings from Chrome storage
     * @returns {Promise} Promise that resolves when initialization is complete
     */
    async function initializeXmator() {
        return new Promise((resolve) => {
            chrome.storage.local.get(["keywords", "mode"], (data) => {
                keywords = data.keywords || [];
                mode = data.mode || "unfollow";
                
                console.log(`Xmator initialized - Mode: ${mode}`);
                console.log(`Keywords: ${keywords.length > 0 ? keywords.join(", ") : "None (processing all profiles)"}`);
                console.log(`Current page: ${window.location.href}`);
                
                resolve();
            });
        });
    }

    /**
     * Extract bio text from a profile container using multiple detection methods
     * @param {Element} profileContainer - The profile container element
     * @returns {string} The extracted bio text (trimmed and lowercase)
     */
    function extractBioText(profileContainer) {
        // Primary method: Use Twitter's specific bio selectors
        const specificBioSelectors = [
            '[data-testid="UserDescription"]',
            '[data-testid="UserProfileHeader_Items"] [dir="auto"]',
        ];

        for (const selector of specificBioSelectors) {
            const bioElement = profileContainer.querySelector(selector);
            if (bioElement && bioElement.innerText.trim()) {
                const bioText = bioElement.innerText.trim();
                console.log(`Bio found using selector ${selector}: "${bioText}"`);
                return bioText.toLowerCase();
            }
        }

        // Secondary method: Analyze content characteristics for bio detection
        const potentialBioElements = profileContainer.querySelectorAll('.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3, span[dir="ltr"], div[dir="ltr"]');
        
        for (const element of potentialBioElements) {
            const text = element.innerText?.trim();
            if (!text) continue;

            // Filter out usernames and UI elements
            if (text.startsWith('@') || 
                text.length < 5 || 
                element.closest('a[href^="/"]') ||
                element.closest('[data-testid="UserName"]')) {
                continue;
            }

            // Filter out engagement and navigation text
            if (text.includes('Like') || 
                text.includes('Retweet') || 
                text.includes('Reply') ||
                text.includes('Follow') ||
                text.includes('Following') ||
                text.includes('·') ||
                /^\d+$/.test(text)) {
                continue;
            }

            // Identify bio content by common characteristics
            const bioWords = ['developer', 'engineer', 'founder', 'ceo', 'manager', 'student', 'passionate', 'love', 'building', 'creating', 'working', 'tweets', 'opinions', 'views'];
            const containsBioWords = bioWords.some(word => text.toLowerCase().includes(word));
            const hasHashtags = text.includes('#');
            const hasEmojis = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(text);
            const isReasonableLength = text.length >= 10 && text.length <= 300;

            if (isReasonableLength && (containsBioWords || hasHashtags || hasEmojis || text.length > 30)) {
                console.log(`Bio found via content analysis: "${text}"`);
                return text.toLowerCase();
            }
        }

        // Fallback method: Find any substantial descriptive text
        const allTextElements = profileContainer.querySelectorAll('span, div');
        for (const element of allTextElements) {
            const text = element.innerText?.trim();
            if (!text) continue;

            // Validate text is substantial and not UI elements
            if (text.length > 20 && 
                text.length < 300 &&
                !text.startsWith('@') &&
                !text.includes('Follow') &&
                !text.includes('Following') &&
                !text.includes('·') &&
                !element.closest('a[href^="/"]') &&
                !element.closest('[data-testid="UserName"]') &&
                !element.closest('button') &&
                !element.closest('[role="button"]')) {
                
                console.log(`Bio found using fallback method: "${text}"`);
                return text.toLowerCase();
            }
        }

        console.log(`No bio found for profile`);
        return "no bio found";
    }

    /**
     * Extract username from a profile container
     * @param {Element} profileContainer - The profile container element
     * @returns {string} The extracted username or display name
     */
    function extractUsername(profileContainer) {
        // Primary method: Use Twitter's username-specific selectors
        const usernameSelectors = [
            '[data-testid="UserName"] span:not([dir="ltr"])',
            '[data-testid="UserName"] a span',
            'a[href^="/"] span:first-child',
        ];

        for (const selector of usernameSelectors) {
            const usernameElement = profileContainer.querySelector(selector);
            if (usernameElement && usernameElement.innerText.trim()) {
                const text = usernameElement.innerText.trim();
                // Validate username characteristics
                if (text.length > 0 && text.length < 50 && 
                    !text.includes('Follow') && !text.includes('Following') &&
                    !text.includes('#') && !text.includes('http')) {
                    return text;
                }
            }
        }

        // Secondary method: Extract from profile link href
        const profileLinks = profileContainer.querySelectorAll('a[href^="/"]');
        for (const link of profileLinks) {
            const href = link.getAttribute('href');
            if (href && href !== '/' && !href.includes('/status/') && !href.includes('/photo/')) {
                const username = href.replace('/', '').split('/')[0];
                if (username && username.length > 0 && username.length < 20) {
                    return username;
                }
            }
        }

        // Fallback method: Find short text that appears to be a display name
        const shortTextElements = profileContainer.querySelectorAll('span');
        for (const element of shortTextElements) {
            const text = element.innerText?.trim();
            if (text && text.length > 0 && text.length < 30 && 
                !text.startsWith('@') && !text.includes('#') && 
                !text.includes('Follow') && !text.includes('Following') &&
                !element.closest('[data-testid="UserDescription"]')) {
                return text;
            }
        }

        return "unknown_user";
    }

    /**
     * Match bio text against specified keywords
     * @param {string} bioText - The bio text to check
     * @param {Array} keywordsToCheck - Array of keywords to match against
     * @returns {boolean} True if bio matches any keyword or if no keywords specified
     */
    function matchesKeywords(bioText, keywordsToCheck) {
        // If no keywords are specified, process all profiles
        if (!keywordsToCheck || keywordsToCheck.length === 0) {
            return true;
        }

        const bio = bioText.toLowerCase();
        return keywordsToCheck.some(keyword => {
            const cleanKeyword = keyword.toLowerCase().trim();
            if (cleanKeyword.length === 0) return false;
            
            // Use word boundary matching for better accuracy
            const wordBoundaryRegex = new RegExp(`\\b${cleanKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return wordBoundaryRegex.test(bio) || bio.includes(cleanKeyword);
        });
    }

    // Find both "Follow" and "Following" buttons anywhere on the page
    function findActionButtons() {
        const followButtons = [];
        const followingButtons = [];
        
        // Get all buttons that could be Follow or Following
        const allButtons = document.querySelectorAll('div[role="button"], button');
        
        allButtons.forEach(button => {
            const buttonText = button.innerText?.toLowerCase().trim() || '';
            const ariaLabel = button.getAttribute('aria-label')?.toLowerCase() || '';
            
            // Check if it's clickable
            const isClickable = button.getAttribute('role') === 'button' || 
                              button.tagName === 'BUTTON' ||
                              button.style.cursor === 'pointer' ||
                              button.onclick !== null;
            
            // Make sure it's not a navigation element or user profile link
            const isNotNavigation = !button.closest('nav') && 
                                   !button.closest('[role="navigation"]') &&
                                   !button.closest('a[href^="/"]') && // Not inside a profile link
                                   !buttonText.includes('followers') &&
                                   !button.hasAttribute('href'); // Not a link itself
            
            if (isClickable && isNotNavigation) {
                // Check for Following buttons (exact match to avoid false positives)
                if (buttonText === 'following' || ariaLabel.includes('unfollow')) {
                    followingButtons.push(button);
                }
                // Check for Follow buttons (exact match and not Following)
                else if (buttonText === 'follow' || (ariaLabel.includes('follow') && !ariaLabel.includes('unfollow'))) {
                    followButtons.push(button);
                }
            }
        });

        // Remove duplicates based on position and text
        const uniqueFollowButtons = followButtons.filter((button, index, self) => {
            const buttonRect = button.getBoundingClientRect();
            return index === self.findIndex(b => {
                const bRect = b.getBoundingClientRect();
                return Math.abs(buttonRect.top - bRect.top) < 5 && 
                       Math.abs(buttonRect.left - bRect.left) < 5;
            });
        });

        const uniqueFollowingButtons = followingButtons.filter((button, index, self) => {
            const buttonRect = button.getBoundingClientRect();
            return index === self.findIndex(b => {
                const bRect = b.getBoundingClientRect();
                return Math.abs(buttonRect.top - bRect.top) < 5 && 
                       Math.abs(buttonRect.left - bRect.left) < 5;
            });
        });

        return { followButtons: uniqueFollowButtons, followingButtons: uniqueFollowingButtons };
    }

    // Handle the unfollow confirmation popup
    async function handleUnfollowConfirmation() {
        // Faster wait for the popup to appear
        await sleep(500); // Reduced from 1000ms
        
        const confirmSelectors = [
            '[data-testid="confirmationSheetConfirm"]',
            'div[role="button"][data-testid="confirmationSheetConfirm"]'
        ];

        // First try the specific selectors
        for (const selector of confirmSelectors) {
            const confirmBtn = document.querySelector(selector);
            if (confirmBtn) {
                console.log("Found confirmation button, clicking to confirm unfollow");
                confirmBtn.click();
                await sleep(200);
                return true;
            }
        }

        // Fallback: look for any button with "Unfollow" text in a modal/popup
        const allButtons = document.querySelectorAll('div[role="button"], button');
        for (const button of allButtons) {
            const buttonText = button.innerText?.toLowerCase().trim() || '';
            if (buttonText === 'unfollow') {
                const rect = button.getBoundingClientRect();
                // Check if button is visible and likely in a popup (centered on screen)
                if (rect.width > 0 && rect.height > 0 && rect.top > 100 && rect.top < window.innerHeight - 100) {
                    console.log("Found unfollow confirmation button in popup, clicking");
                    button.click();
                    await sleep(200);
                    return true;
                }
            }
        }

        console.log("Confirmation button not found");
        return false;
    }

    /**
     * Main function to execute follow/unfollow actions
     * Processes all available buttons based on the selected mode and keywords
     */
    async function startAction() {
        console.log(`Starting ${mode} mode - analyzing buttons on current page`);
        console.log(`UNLIMITED MODE: No action limits, running until no more buttons found`);
        
        let consecutiveNoButtons = 0;
        const maxScrollAttempts = 50;
        
        while (consecutiveNoButtons < maxScrollAttempts) {
            const { followButtons, followingButtons } = findActionButtons();
            
            let targetButtons = [];
            if (mode === "follow") {
                targetButtons = followButtons.map(btn => ({ button: btn, type: 'follow' }));
                console.log(`Found ${followButtons.length} Follow buttons to analyze`);
            } else if (mode === "unfollow") {
                targetButtons = followingButtons.map(btn => ({ button: btn, type: 'following' }));
                console.log(`Found ${followingButtons.length} Following buttons to analyze`);
            }

            if (targetButtons.length === 0) {
                const buttonType = mode === "follow" ? "Follow" : "Following";
                console.log(`No ${buttonType} buttons found, scrolling for more profiles`);
                window.scrollBy(0, window.innerHeight);
                consecutiveNoButtons++;
                await sleep(800);
                continue;
            }

            consecutiveNoButtons = 0;

            for (const { button: actionBtn, type: buttonType } of targetButtons) {
                // Locate the profile container using multiple methods
                let profileContainer = actionBtn.closest('[data-testid="UserCell"]') || 
                                     actionBtn.closest('.css-175oi2r') ||
                                     actionBtn.closest('div[style*="padding"]');
                
                // Traverse up the DOM tree to find profile container
                if (!profileContainer) {
                    let parent = actionBtn.parentElement;
                    let attempts = 0;
                    while (parent && attempts < 10) {
                        if (parent.querySelector('a[href^="/"]') && parent.textContent.length > 20) {
                            profileContainer = parent;
                            break;
                        }
                        parent = parent.parentElement;
                        attempts++;
                    }
                }
                
                if (!profileContainer) {
                    console.log("Could not find profile container for button");
                    continue;
                }

                const username = extractUsername(profileContainer);
                const profileId = `${username}_${Date.now()}_${Math.random()}`;

                // Prevent processing the same profile multiple times
                if (processedProfiles.has(profileId.split('_')[0])) {
                    continue;
                }
                processedProfiles.add(profileId.split('_')[0]);

                const bioText = extractBioText(profileContainer);
                const hasMatchingKeywords = matchesKeywords(bioText, keywords);

                console.log(`\nAnalyzing: ${username} (${buttonType} button)`);
                console.log(`Bio: ${bioText.substring(0, 100)}${bioText.length > 100 ? '...' : ''}`);
                console.log(`Keywords match: ${keywords.length > 0 ? hasMatchingKeywords : 'N/A (no keywords specified)'}`);

                let shouldTakeAction = false;
                let actionDescription = '';

                if (mode === "follow" && buttonType === 'follow') {
                    // Follow mode: follow if bio matches keywords or no keywords specified
                    shouldTakeAction = hasMatchingKeywords;
                    if (shouldTakeAction) {
                        actionDescription = keywords.length > 0 ? 
                            `Following ${username} - matches keywords` : 
                            `Following ${username} - no keywords specified`;
                    } else {
                        actionDescription = `Skipping ${username} - no keyword match`;
                    }
                } else if (mode === "unfollow" && buttonType === 'following') {
                    // Unfollow mode: unfollow if bio does NOT match keywords, or unfollow all if no keywords specified
                    if (keywords.length === 0) {
                        // No keywords specified - unfollow all
                        shouldTakeAction = true;
                        actionDescription = `Unfollowing ${username} - no keywords specified`;
                    } else {
                        // Keywords specified - only unfollow if bio doesn't match
                        shouldTakeAction = !hasMatchingKeywords;
                        if (shouldTakeAction) {
                            actionDescription = `Unfollowing ${username} - no keyword match`;
                        } else {
                            actionDescription = `Keeping ${username} - contains keywords to keep`;
                        }
                    }
                }

                console.log(actionDescription);

                if (shouldTakeAction) {
                    try {
                        // Scroll button into view for interaction
                        actionBtn.scrollIntoView({ behavior: 'auto', block: 'center' });
                        await sleep(150);

                        // Verify button state hasn't changed
                        const currentButtonText = actionBtn.innerText?.toLowerCase().trim() || '';
                        const expectedText = buttonType === 'follow' ? 'follow' : 'following';
                        
                        if (currentButtonText !== expectedText) {
                            console.log(`Button text changed from ${expectedText} to ${currentButtonText}, skipping`);
                            continue;
                        }

                        console.log(`Clicking ${buttonType} button for ${username}`);
                        
                        // Execute the button click
                        actionBtn.click();

                        if (buttonType === 'following') {
                            // Handle unfollow confirmation dialog
                            console.log("Waiting for unfollow confirmation popup");
                            const confirmed = await handleUnfollowConfirmation();
                            
                            if (confirmed) {
                                actionCount++;
                                console.log(`Successfully unfollowed ${username} (Total: ${actionCount})`);
                                await sleep(300);
                            } else {
                                console.log(`Could not confirm unfollow for ${username}`);
                                await sleep(200);
                            }
                        } else {
                            // Follow action completed without confirmation
                            actionCount++;
                            console.log(`Successfully followed ${username} (Total: ${actionCount})`);
                            await sleep(300);
                        }

                        // Brief random delay between actions to appear natural
                        await sleep(Math.random() * 200 + 100);
                    } catch (error) {
                        console.error(`Error processing ${username}:`, error);
                        await sleep(300);
                    }
                }
            }

            console.log("Scrolling for more profiles");
            window.scrollBy(0, window.innerHeight);
            await sleep(500);
        }

        const buttonType = mode === "follow" ? "Follow" : "Following";
        console.log(`Reached end of page or no more ${buttonType} buttons found after ${maxScrollAttempts} scroll attempts`);
        console.log(`Total actions completed: ${actionCount}`);
    }

    /**
     * Public function to initialize and start Xmator automation
     * Called from the popup interface when user clicks Start
     */
    window.startXmator = async function() {
        try {
            await initializeXmator();
            await startAction();
        } catch (error) {
            console.error("Xmator error:", error);
        }
    };

    console.log("Xmator content script loaded and ready. Click 'Start' in the popup to begin.");
})();
