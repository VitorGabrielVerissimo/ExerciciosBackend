const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('To Do Manager!'));

app.listen(3000, () => console.log('Server Started on port 3000!'));

//Método Post
const tasks = [];

app.post('/tasks', (request, response) => {
    const { body } = request;
    const task = {
        id: Math.random().toString().replace('0.', ''),
        title: body.title,
        resume: body.resume,
         isDone: body.isDone,
        isPriority: body.isPriority
    };
    tasks.push(task);
    response.status(201);
    response.send(task);
});

//Métodp Get
app.get('/tasks', (request, response) => {
    response.send(tasks);
});

//Método Get com Parâmetro
app.get('/tasks/:taskId', (request, response) => {
    const task = tasks.find(t => t.id == request.params.taskId);
    if (task) {
        response.status(200);
        response.send(task);
    } else {
        response.status(404);
        response.send();
    }
});

//Método Put
app.put('/tasks/:taskId', (request, response) => {
    const { body } = request;
    const task = tasks.find(t => t.id == request.params.taskId);
   
    if (task) {
        task.title = body.title;
        task.resume = body.resume;
        task.isDone = body.isDone;
        task.isPriority = body.isPriority;

        response.send(task);
    } else {
        response.status(404);
        response.send();
    }
});

//Método Delete
app.delete('/tasks/:taskId', (request, response) => {
    const task = tasks.find(t => t.id == request.params.taskId);
    if (task) {
        tasks.pop(task);
        response.send(task);
    } else {
        response.status(404);
        response.send();
    }
});