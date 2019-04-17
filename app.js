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
    
    const error = validate(req.body);

    if (error)
        return res.status(400).send(error);
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    const error = validate(req.body);

    if (error)
        return res.status(400).send(error);
    
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (! course)
        return res.status(404).send('The course you are updating not found.');
    
    course.name = req.body.name;

    return res.send( courses );
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course)
        return res.status(404).send("The course you want to delete does not found.");
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    return res.send(courses);
});

function validate(data) {
    const schema = {
      name: Joi.string()
        .min(6)
        .required()
    };
    const result = Joi.validate(data, schema);
    // console.log(result);
    if (result.error)
        return result.error.details[0].message;
}

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
