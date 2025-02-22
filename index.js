(async function() {
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function unfollow() {
        let count = 0;
        const allowKeywords = ["tech", "build", "developer", "coding", "programming", "engineer", "software", "AI", "ML", "crypto", "startup", "innovation"];

        while (true) {
            const buttons = document.querySelectorAll('.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-15ysp7h.r-4wgw6l.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l');

            if (buttons.length === 0) {
                window.scrollBy(0, window.innerHeight);
                await sleep(2000);
                continue;
            }

            for (const btn of buttons) {
                const userContainer = btn.closest("div").parentElement;
                const bioElement = userContainer?.querySelector('.css-175oi2r');

                if (bioElement) {
                    const bioText = bioElement.innerText.toLowerCase();
                    if (allowKeywords.some(keyword => bioText.includes(keyword))) continue;
                }

                btn.click();
                await sleep(1000);

                const confirmBtn = document.querySelector('.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-16y2uox.r-6gpygo.r-1udh08x.r-1udbk01.r-3s2u2q.r-peo1c.r-1ps3wis.r-cxgwc0.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l');
                if (confirmBtn) confirmBtn.click();

                count++;
                await sleep(1500);
            }

            window.scrollBy(0, window.innerHeight);
            await sleep(2000);
        }
    }

    unfollow();
})();
