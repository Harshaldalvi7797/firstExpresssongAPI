let express = require("express");
let app = express();
let port = process.env.NODE_ENV || 4800;
let Joi = require("@hapi/joi");

app.get("/api/songlist", (req, res) => {
    res.send(songslist);
})
app.use(express.json());

let songslist = [{ id: 1, name: "sairat" }, { id: 2, name: "senorita" }, { id: 3, name: "Dil" }];

app.get("/api/songs/:id", (req, res) => {
    let id = req.params.id;
    // res.send(id);
    let song = songslist.find(item => item.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).send({ message: "invalid song " })
    }
    // let { name } = song;
    res.send(song);
})



app.post("/api/songs/newsong", (req, res) => {

    let Schema = Joi.object({
        name: Joi.string().required()
    })

    let result = Schema.validate(req.body);

    console.log(result);
    if (result.error) {
        return res.send(result.error)
    }

    let song = {
        id: songslist.length + 1,
        name: req.body.name
    }
    songslist.push(song);
    res.send(songslist);

})




app.listen(port, () => {
    console.log(`port workin on ${port}`);
})