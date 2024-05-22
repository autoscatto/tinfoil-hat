const hasWordEndingWithAsterisk = (str)=> /(\w+)\*/.test(str);

const replaceAsteriskWithRandomVowel = (str)=>{
    // ripristina la lingua come IDDIO comanda
    // VIVA CRISTO!
    const vowels = ['a', 'e', 'i', 'o'];
    function getRandomVowel() {
        return vowels[Math.floor(Math.random() * vowels.length)];
    }
    return str.replace(/(\w+)\*/g, function(match, p1) {
        return p1 + getRandomVowel();
    });
}

async function showBanner() {
    const originalText = document.body.innerText;
    let bannerDetails = await browser.runtime.sendMessage({
        command: "getBannerDetails",
    });

    const { text } = bannerDetails;

    const banner = document.createElement("div");
    banner.className = "thunderbirdMessageDisplayActionExample";

    const bannerText = document.createElement("div");
    bannerText.className = "thunderbirdMessageDisplayActionExample_Text";
    bannerText.innerText = text;

    // Create a button to display it in the banner.
    const markUnreadButton = document.createElement("button");
    markUnreadButton.innerText = "TOGLI GLI ASTERISCHI PER DIO!";
    markUnreadButton.addEventListener("click", async () => {
        // Add the button event handler to send the command to the
        // background script.
        // browser.runtime.sendMessage({
        //     command: "markUnread",
        // });
        document.body.innerText = replaceAsteriskWithRandomVowel(originalText);
    });

    // Add text and button to the banner.
    banner.appendChild(bannerText);
    banner.appendChild(markUnreadButton);

    if (hasWordEndingWithAsterisk(document.body.innerText)) {
        console.log("Ho trovato un ASTERISCO. E' NEOLINGUA, ci stanno LAVANDO IL CERVELLO!!!!!!!")
        document.body.insertBefore(banner, document.body.firstChild);
    }
};

showBanner();
