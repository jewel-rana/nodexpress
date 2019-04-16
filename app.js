const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [{ id: 1, name: "course 1" }, { id: 2, name: "course 2" }, { id: 3, name: "course 3" }];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) return res.status(404).send('The course you are looking for is not found.');

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(6).required()
    };
    const result = Joi.validate(req.body, schema);
    // console.log(result);
    if (result.error)
        return res.status(400).send(result.error.details[0].message);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
