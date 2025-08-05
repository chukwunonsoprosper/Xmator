/**
 * Xmator Popup Script
 * 
 * Handles the popup interface for configuring and starting Xmator automation.
 * Provides mode selection, keyword input, and validation functionality.
 * 
 * @author Xmator Team
 * @version 2.0
 */

// Mode descriptions for user guidance
const modeDescriptions = {
    follow: "<strong>Follow Mode:</strong> Finds 'Follow' buttons and follows accounts that match your keywords in their bio. If no keywords are specified, follows all available accounts.",
    unfollow: "<strong>Unfollow Mode:</strong> Finds 'Following' buttons and unfollows accounts that don't match your keywords in their bio. If no keywords are specified, unfollows all accounts."
};

/**
 * Update the information box based on selected mode
 */
function updateModeInfo() {
    const selectedMode = document.querySelector('input[name="mode"]:checked').value;
    const infoBox = document.getElementById('info-box');
    
    infoBox.innerHTML = modeDescriptions[selectedMode];
    infoBox.className = `info-box ${selectedMode}`;
}

// Initialize popup interface
document.addEventListener('DOMContentLoaded', () => {
    updateModeInfo();
    
    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="mode"]').forEach(radio => {
        radio.addEventListener('change', updateModeInfo);
    });
});

document.getElementById("start").addEventListener("click", () => {
    const statusElement = document.getElementById('status');
    const startButton = document.getElementById('start');
    
    // Verify Chrome storage API is available
    if (!chrome.storage || !chrome.storage.local) {
        statusElement.textContent = "Chrome storage error";
        statusElement.style.color = "#FF6B6B";
        console.error("Chrome storage is undefined. Make sure your manifest.json includes 'storage' permission.");
        return;
    }

    const keywordsInput = document.getElementById("keywords").value;
    const keywords = keywordsInput.toLowerCase().split(",").map(k => k.trim()).filter(k => k !== "");
    const mode = document.querySelector('input[name="mode"]:checked').value;

    // Update UI state
    startButton.disabled = true;
    startButton.textContent = "Starting...";
    statusElement.textContent = `Starting ${mode} mode with ${keywords.length} keywords`;
    statusElement.style.color = "#1DA1F2";

    // Store settings and execute script
    chrome.storage.local.set({ keywords, mode }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || tabs.length === 0 || !tabs[0].id) {
                statusElement.textContent = "No active tab found";
                statusElement.style.color = "#FF6B6B";
                startButton.disabled = false;
                startButton.textContent = "Start Xmator";
                console.error("No active tab found.");
                return;
            }

            // Verify we're on Twitter/X
            if (!tabs[0].url.includes('twitter.com') && !tabs[0].url.includes('x.com')) {
                statusElement.textContent = "Please navigate to Twitter/X first";
                statusElement.style.color = "#FF6B6B";
                startButton.disabled = false;
                startButton.textContent = "Start Xmator";
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            }, () => {
                if (chrome.runtime.lastError) {
                    statusElement.textContent = "Script injection failed";
                    statusElement.style.color = "#FF6B6B";
                    startButton.disabled = false;
                    startButton.textContent = "Start Xmator";
                    console.error("Script injection failed:", chrome.runtime.lastError);
                } else {
                    // Execute the automation after script injection
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: function() {
                            if (typeof window.startXmator === 'function') {
                                window.startXmator();
                            } else {
                                console.error("startXmator function not found");
                            }
                        }
                    }, () => {
                        if (chrome.runtime.lastError) {
                            statusElement.textContent = "Failed to start Xmator";
                            statusElement.style.color = "#FF6B6B";
                            console.error("Failed to start Xmator:", chrome.runtime.lastError);
                        } else {
                            statusElement.textContent = "Xmator is running! Check console for progress";
                            statusElement.style.color = "#00D084";
                        }
                        
                        // Reset UI after a brief delay
                        setTimeout(() => {
                            startButton.disabled = false;
                            startButton.textContent = "Start Xmator";
                            statusElement.textContent = "Ready to start";
                            statusElement.style.color = "#666";
                        }, 3000);
                    });
                }
            });
        });
    });
});
