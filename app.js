const puppeteer = require("puppeteer");

const sleep = async (ms) => {
    return await new Promise((resolve) => setTimeout(resolve, ms));
};

const clickButtonNavigation = async (page, selector) => {
    console.log(`\tClick on ${selector} and Navigate`);
    const button = await page.waitForSelector(selector);
    console.log("Button find : ✓");

    await button.click();
    console.log("Button Click : ✓");

    await page.waitForNavigation({ waitUntil: "networkidle2" });
    console.log("Navigation : ✓\n");
};

const clickButton = async (page, selector) => {
    console.log(`\tClick on ${selector}`);
    const button = await page.waitForSelector(selector);
    console.log("Button find : ✓");

    await button.click();
    console.log("Button Click : ✓\n");
};

const isLoaded = async (page) => {
    var loaded = false;
    while (loaded == false) {
        await sleep(1000);
        try {
            const notesElements = await page.$$(".liste_contenu_ligne .Gras");
            loaded = true;
            return notesElements;
        } catch (error) {
            console.log(`Wait more (loaded:${loaded})`);
        }
    }
    return notesElements;
};

module.exports = {
    average: async (username, password) => {
        try {
            console.log("\tInit");
            const browser = await puppeteer.launch({
                defaultViewport: {
                    width: 1280,
                    height: 1024,
                },
            });
            console.log("Browser : ✓");

            const page = await browser.newPage();
            console.log("New Page : ✓");

            await page.goto("https://www.toutatice.fr/portail");
            console.log("Page loaded : ✓\n");

            await clickButtonNavigation(page, "a.btn-login");

            await clickButtonNavigation(page, "a");

            await clickButton(page, "#bouton_eleve");

            await page.type("#username", username);
            console.log("Username : ✓");
            await page.type("#password", password);
            console.log("Password : ✓");

            await clickButtonNavigation(page, "#bouton_valider");

            await clickButton(page, "#travaux > div > div > a");
            await page.goto(
                "https://0350026n.pronote.toutatice.fr/pronote/eleve.html?page=",
                {
                    waitUntil: "networkidle2",
                }
            );

            /*await page.waitForSelector("article.notes");*/
            console.log("Loaded New Page : ✓\n");

            await clickButton(page, "article.notes header h3");

            const notesElements = await isLoaded(page);

            var Mnote = 0;
            var lenMnote = 0;
            console.log("Notes retrieve : ✓_n");

            let matters = [];

            for (var i = 0; i < notesElements.length; i++) {
                const note = await notesElements[i].$eval(
                    "div:nth-child(1)",
                    (n) => n.textContent
                );

                const matter = await notesElements[i].$eval(
                    "div:nth-child(0n+2)",
                    (m) => m.textContent
                );

                matters.push([matter,note]);
                console.log(`\n${matter} : ${note}`);

                if (note !== "N.Not") {
                    Mnote += parseFloat(note.replace(",", "."));
                    lenMnote += 1;
                }
            }
            Mnote = Math.round((Mnote / lenMnote) * 100) / 100;
            console.log(`\nMoyenne Générale : ${Mnote.toString()}\n`);

            await browser.close();
            return {matters, Mnote};
        } catch (err) {
            console.log(err.message);
        }
    },
};
