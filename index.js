const express = require("express");
const bodyParser = require("body-parser");
const average = require("./app");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const PORT = 8080;

/* Charger la page principal */
app.get("/", (req, res) => {
    /* Afficher la page */
    app.set("view engine", "ejs");
    res.render("index.ejs", {
        matters: [],
        average: "",
        more: "none",
        time: "",
    });

    /* Implémenter le dossier public */
    app.use(express.static("public"));
});

/* Lancer la récupération des informations */
app.post("/average", async (req, res) => {
    app.set("view engine", "ejs");
    var username = req.body.username;
    var password = req.body.password;
    if (username.length > 2 && password.length > 6) {
        try {
            var d = new Date();
            const { matters, Mnote } = await average.average(
                username,
                password
            );
            var s = d.getSeconds();
            /* Afficher la page */
            res.render("index.ejs", {
                matters: matters,
                average: `Moyenne Générale : ${Mnote.toString()}`,
                more: "block",
                time: ` : ${s} sec `,
            });
        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }

    /* Implémenter le dossier public */
    app.use(express.static("public"));
});

app.listen(PORT, () => {
    /* Lancement du serveur */
    console.log("Le server est lancé sur le port", PORT);
});
