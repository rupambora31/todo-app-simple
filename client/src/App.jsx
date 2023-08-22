import React, { useState, useEffect  } from 'react';
import 'tailwindcss/tailwind.css';

function App() {

  //useState Hook
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [editedTodoIndex, setEditedTodoIndex] = useState(null);


useEffect(() => {
  fetch('http://localhost:3000/api/todos') // Update URL to match your server
    .then(response => response.json())
    .then(data => setTodos(data))
    .catch(error => console.error('Error fetching todos:', error));
}, []);


  //event-handlers
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };


  //Adding Todo
  const handleAddTodo = () => {

    if (title.trim() === '' || description.trim() === '') {
      // Prevent adding if title or description is empty
      return alert("Please add Title and Description!");
    } 

    if (editedTodoIndex !== null) {
      // Editing existing todo
      const updatedTodo = { ...todos[editedTodoIndex], title, description };
    
      fetch(`http://localhost:3000/api/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
        .then(response => response.json())
        .then(data => {
          const updatedTodos = [...todos];
          updatedTodos[editedTodoIndex] = data;
          setTodos(updatedTodos);
          setTitle('');
          setDescription('');
          setEditedTodoIndex(null);
        })
        .catch(error => console.error('Error editing todo:', error));
    } else {
      // Adding new todo
      const newTodo = { title, description };
    
      fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })
        .then(response => response.json())
        .then(data => {
          setTodos([...todos, data]);
          setTitle('');
          setDescription('');
        })
        .catch(error => console.error('Error adding todo:', error));
    }
  };
  
  


  //Editing Todo

  const handleEditTodo = (index) => {
    const editedTodo = todos[index];
    
    // Update the input fields with the edited todo's data
    setTitle(editedTodo.title); 
    setDescription(editedTodo.description); 
    setEditedTodoIndex(index);
  };
  
 
  //Deleting Todo
  const handleDeleteTodo = (index) => {
    const todoToDelete = todos[index];
  
    fetch(`http://localhost:3000/api/todos/${todoToDelete.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div className="todo-app p-8">
      <h1 className="text-4xl text-violet-700 font-bold mb-4">My To-dos</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title} 
          onChange={handleTitleChange} 
          className="w-full p-2 border rounded border-violet-400 focus:outline-violet-500"

        />
        <textarea
          placeholder="Description"
          value={description} 
          onChange={handleDescriptionChange} 
          className="w-full p-2 mt-2 border rounded border-violet-400 focus:outline-violet-500"
        />
        <button
          onClick={handleAddTodo}
          className="bg-violet-500 text-white px-4 py-2 font-medium rounded mt-2"
        >
          {editedTodoIndex !== null ? 'Edit Todo' : 'Add Todo'}
        </button>
      </div>
      <ul>
        {todos.map((todos, index) => (
          <li key={index} className="border p-4 rounded mb-2 border-violet-400">
            <h3 className="text-xl font-semibold text-violet-700">{todos.title}</h3>
            <p className="text-violet-500">{todos.description}</p>
            <button
              onClick={() => handleEditTodo(index)}
              className="text-violet-700 font-medium mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(index)}
              className="text-red-500 font-medium"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
