const express = require("express");
const bodyParser = require("body-parser");
const average = require("./app");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const PORT = 8080;

app.get("/", (req, res) => {
    app.set("view engine", "ejs");
    res.render("index.ejs", { matters: [], average: "", more: "none" });
    app.use(express.static("public"));
});

app.post("/average", async (req, res) => {
    app.set("view engine", "ejs");
    var username = req.body.username;
    var password = req.body.password;
    if (username.length > 2 && password.length > 6) {
        try {
            const { matters, Mnote } = await average.average(
                username,
                password
            );
            res.render("index.ejs", {
                matters: matters,
                average: `Moyenne Générale : ${Mnote.toString()}`,
                more: "block",
            });
        } catch (error) {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
    app.use(express.static("public"));
});

app.listen(PORT, () => {
    console.log("Le server est lancé sur le port", PORT);
});
