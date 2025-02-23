document.getElementById("start").addEventListener("click", () => {
    if (!chrome.storage || !chrome.storage.local) {
        console.error("Chrome storage is undefined. Make sure your manifest.json includes 'storage' permission.");
        return;
    }

    const keywords = document.getElementById("keywords").value.toLowerCase().split(",").map(k => k.trim());
    const mode = document.querySelector('input[name="mode"]:checked').value;

    chrome.storage.local.set({ keywords, mode }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || tabs.length === 0 || !tabs[0].id) {
                console.error("No active tab found.");
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["content.js"]
            });
        });
    });
});
