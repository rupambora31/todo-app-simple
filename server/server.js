
const express = require('express');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

const todos = []; // Array to store TODOs

app.get('/api/todos', (req, res) => {
  res.json(todos);
});


app.post('/api/todos', (req, res) => {
    const newTodo = {
        id:  uuidv4(), // unique random id
        title: req.body.title,
        description: req.body.description
      };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = {
    id: todoId,
    title: req.body.title,
    description: req.body.description
  };
  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todos[index] = updatedTodo;
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;

  const index = todos.findIndex(todo => todo.id === todoId);
  if (index !== -1) {
    todos.splice(index, 1);
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
