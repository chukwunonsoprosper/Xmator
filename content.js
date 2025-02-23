(async function () {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let keywords = [];
    let mode = "unfollow";

    // Get keywords & mode from Chrome storage
    chrome.storage.local.get(["keywords", "mode"], (data) => {
        keywords = data.keywords || [];
        mode = data.mode || "unfollow";
        startAction();
    });

    async function startAction() {
        while (true) {
            let buttons;

            if (mode === "follow") {
                buttons = document.querySelectorAll('.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-15ysp7h.r-4wgw6l.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l');
            } else {
                buttons = document.querySelectorAll('.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr');
            }

            if (buttons.length === 0) {
                window.scrollBy(0, window.innerHeight);
                await sleep(2000);
                continue;
            }

            for (const btn of buttons) {
                const userContainer = btn.closest("div")?.parentElement;
                const bioElement = userContainer?.querySelector('.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');

                if (bioElement) {
                    const bioText = bioElement.innerText.toLowerCase();

                    if (keywords.some(keyword => bioText.includes(keyword))) {
                        if (mode === "follow" && btn.innerText.toLowerCase().includes("follow")) {
                            btn.click();
                            await sleep(1500);
                        } 
                        else if (mode === "unfollow" && btn.innerText.toLowerCase().includes("following")) {
                            btn.click();
                            await sleep(1000);
                            const confirmBtn = document.querySelector('.css-175oi2r.r-16y2uox.r-6gpygo');
                            if (confirmBtn) {
                                confirmBtn.click();
                                await sleep(1500);
                            }
                        }
                    }
                }
            }

            window.scrollBy(0, window.innerHeight);
            await sleep(2000);
        }
    }
})();
