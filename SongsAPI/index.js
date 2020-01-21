let express = require("express");
let app = express();

// let port = process.env.NODE_ENV || 4800; // set envirment
// let port = process.env.PORT || 4800; // set port
let port = process.env.PORT || 4800;

app.use(express.json());
let Joi = require("@hapi/joi");
let config = require("config");
console.log(`Default mode: ${app.get('env')}`);
console.log(`mode: ${process.env.NODE_ENV}`);

console.log(`app name: ${config.get("name")}`);
console.log(`mode: ${config.get("email")}`)








// console.log(`default mode ${app.get('env')}`);
// console.log(`MODE ${process.env.NODE_ENV}`);



app.get("/api/songlist", (req, res) => {
    res.send(songslist);
})


let songslist = [{ id: 1, name: "sairat", Singer: "Ajay-Atul", Duration: "4:30", Price: "500" },
{ id: 2, name: "senorita", Singer: "María del Mar Fernández ", Duration: "5:30", Price: "800" }]
// { id: 3, name: "Dil" }];

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

    // let Schema = Joi.object({
    //     name: Joi.string().required().min(4)
    // })

    let { error } = validationError(req.body);

    // console.log(result);
    if (error) {
        return res.send(error.details[0].message)
    }

    let song = {
        id: songslist.length + 1,
        name: req.body.name
    }

    songslist.push(song);
    res.send(songslist);

})

//Update song
app.put("/api/songs/updatesong/:id", (req, res) => {

    //id
    let song = songslist.find(item => item.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).send({ message: "invalid song id " })
    }


    //Joi

    // let Schema = Joi.object({
    //     name: Joi.string().required().min(4)
    // })

    let { error } = validationError(req.body);

    // console.log(result);
    if (error) {
        return res.send(error.details[0].message)
    }
    song.name = req.body.name;
    res.send(songslist);

})

//Remove Song

app.delete("/api/songs/removesong/:id", (req, res) => {
    //id
    let song = songslist.find(item => item.id === parseInt(req.params.id));
    if (!song) {
        return res.status(404).send({ message: "invalid song id " })
    }
    let index = songslist.indexOf(song)
    songslist.splice(index, 1);
    res.send({ message: "remove the data", S: songslist });

})

function validationError(error) {
    let Schema = Joi.object({
        name: Joi.string().required().min(4)
    })
    return Schema.validate(error);

}




app.listen(port, () => {
    console.log(`port workin on ${port}`);
})