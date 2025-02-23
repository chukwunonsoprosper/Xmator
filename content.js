(async function () {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let keywords = [];
    let mode = "unfollow";
    let followButtons, unfollowButtons, bioElements;
    
    chrome.storage.local.get(["keywords", "mode"], (data) => {
        keywords = data.keywords || [];
        mode = data.mode || "unfollow";
        startAction();
    });

    function listElements() {
        followButtons = document.querySelectorAll('.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-15ysp7h.r-4wgw6l.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l');
        unfollowButtons = document.querySelectorAll('.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr');
        bioElements = document.querySelectorAll('.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');
    }

    async function startAction() {
        while (true) {
            listElements();
            let buttons = mode === "follow" ? followButtons : unfollowButtons;

            if (buttons.length === 0) {
                window.scrollBy(0, window.innerHeight);
                await sleep(2000);
                continue;
            }

            for (const btn of buttons) {
                const bioElement = btn.closest("div")?.parentElement?.querySelector('.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');
                let bioText = bioElement ? bioElement.innerText.toLowerCase() : "unknown";
                
                const containsKeyword = keywords.some(keyword => bioText.includes(keyword));
                
                if (mode === "follow" && containsKeyword && btn.innerText.toLowerCase().includes("follow")) {
                    btn.click();
                    console.log(`Followed: ${bioText}`);
                    await sleep(1500);
                } 
                else if (mode === "unfollow" && !containsKeyword && btn.innerText.toLowerCase().includes("following")) {
                    // console.log(`Unfollowing: ${bioText}`);
                    btn.click();
                    await sleep(1000);
                    const confirmBtn = document.querySelector('.css-175oi2r.r-16y2uox.r-6gpygo');
                    if (confirmBtn) {
                        confirmBtn.click();
                        console.log(`Unfollowed: ${bioText}`);
                        await sleep(1500);
                    }
                }
            }

            window.scrollBy(0, window.innerHeight);
            await sleep(2000);
        }
    }
})();
