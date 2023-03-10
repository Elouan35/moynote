const puppeteer = require("puppeteer");

const sleep = async (ms) => {
    /* Attendre un temps "ms" donné */
    return await new Promise((resolve) => setTimeout(resolve, ms));
};

const clickButton = async (page, selector, nav = false) => {
    /* Click sur un bouton d'une page */
    console.log(`\tClick on ${selector} and Navigate`);
    const button = await page.waitForSelector(selector);
    console.log("Button find : ✓");

    await button.click();
    console.log("Button Click : ✓");

    /* Attend la navigation ou le chargement de la page */
    if (nav) {
        await page.waitForNavigation({ waitUntil: "networkidle2" });
        console.log("Navigation : ✓\n");
    }
};

const isLoaded = async (page, element) => {
    /* Attendre qu'un élément charge sur une page */
    var loaded = false;
    while (loaded == false) {
        await sleep(1000);
        try {
            const notesElements = await page.$$(element);
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

            await clickButton(page, "a.btn-login", (nav = true));

            await clickButton(page, "a", (nav = true));

            await clickButton(page, "#bouton_eleve");

            await page.type("#username", username);
            console.log("Username : ✓");
            await page.type("#password", password);
            console.log("Password : ✓");

            await clickButton(page, "#bouton_valider", (nav = true));

            await clickButton(page, "#travaux > div > div > a");
            await page.goto(
                "https://0350026n.pronote.toutatice.fr/pronote/eleve.html?page=",
                {
                    waitUntil: "networkidle2",
                }
            );

            console.log("Loaded New Page : ✓\n");

            await clickButton(page, "article.notes header h3");

            const notesElements = await isLoaded(page, element=".liste_contenu_ligne .Gras");

            var Mnote = 0;
            var lenMnote = 0;
            console.log("Notes retrieve : ✓\n");

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

                matters.push([matter, note]);
                console.log(`\n${matter} : ${note}`);

                if (note !== "N.Not") {
                    Mnote += parseFloat(note.replace(",", "."));
                    lenMnote += 1;
                }
            }
            Mnote = Math.round((Mnote / lenMnote) * 100) / 100;
            console.log(`\nMoyenne Générale : ${Mnote.toString()}\n`);

            await browser.close();
            return { matters, Mnote };
        } catch (err) {
            console.log(err.message);
        }
    },
};
