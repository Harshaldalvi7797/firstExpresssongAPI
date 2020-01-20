// @ts-nocheck
let express = require("express");
let app = express();
// console.log(app);
// let port = 4800;

let port = process.env.NODE_ENV || 4800;
// let Joi = require("@hapi/joi");

app.use(express.json()); // in build middleware



let courses = [{ id: 1, name: "react" }, { id: 2, name: "Node JS" }, { id: 3, name: "Angular" },
{ id: 4, name: "Javascript" }, { id: 5, name: "Express JS" }];

//Fetch All Data
app.get("/api/courses", (req, res) => {
    res.send(courses);
})

//Fetch data by id

app.get("/api/courses/:id", (req, res) => {
    let id = req.params.id;
    // res.send(id);
    let course = courses.find(item => item.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send({ message: "invalid course " })
    }
    let { name } = course;
    res.send(name);
})



// Create new course

app.post("/api/courses/newcourse", (req, res) => {

    // if(req.body.name.length <= 0)
    // {
    //     return res.
    // }

    let Schema = Joi.object({
        name: Joi.string()
    })
    let result = Schema.validate(req.body);

    console.log(result);


    let course = {
        id: courses.length + 1,
        name: req.body.name

    }
    courses.push(course)
    res.send(courses);

})

app.listen(4800, () => {
    console.log(`port working on ${4800}`);
})