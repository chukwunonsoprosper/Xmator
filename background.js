/**
 * Xmator Background Script
 * 
 * Handles extension lifecycle events and default settings initialization.
 * Provides fallback navigation for users not on Twitter/X.
 * 
 * @author Xmator Team
 * @version 2.0
 */

chrome.runtime.onInstalled.addListener(() => {
    console.log("Xmator v2.0 Installed!");
    
    // Initialize default settings
    chrome.storage.local.set({
        keywords: [],
        mode: "unfollow"
    });
});

/**
 * Handle extension icon click when popup is not available
 */
chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes('twitter.com') || tab.url.includes('x.com')) {
        // Open popup interface if on Twitter/X
        chrome.action.openPopup();
    } else {
        // Navigate to Twitter if not currently on the platform
        chrome.tabs.update(tab.id, { url: 'https://twitter.com' });
    }
});

/**
 * Listen for messages from content script
 * Provides communication channel for status updates and logging
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'XMATOR_STATUS') {
        console.log('Xmator Status:', request.message);
        sendResponse({ status: 'received' });
    }
    return true;
});
