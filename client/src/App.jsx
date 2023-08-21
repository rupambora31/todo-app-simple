import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

function App() {

  //useState Hook
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [editedTodoIndex, setEditedTodoIndex] = useState(null);


  //event-handlers
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAddTodo = () => {
    if (editedTodoIndex !== null) {
      // Editing existing todo
      const updatedTodo = [...todos]; // ...Spread Operator
      updatedTodo[editedTodoIndex] = { title, description }; 
      setTodos(updatedTodo);
      setEditedTodoIndex(null);
    } else if (title.trim() !== '') {
      // Adding new todo
      setTodos([...todos, { title, description }]); 
    }

    // Resetting the Inputs
    setTitle('');
    setDescription('');
  };

  const handleEditTodo = (index) => {
    const editedTodo = todos[index];
    setTitle(editedTodo.title); 
    setDescription(editedTodo.description); 
    setEditedTodoIndex(index);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app p-8">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Title"
          value={title} 
          onChange={handleTitleChange} 
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Enter Description"
          value={description} 
          onChange={handleDescriptionChange} 
          className="w-full p-2 mt-2 border rounded"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {editedTodoIndex !== null ? 'Edit Todo' : 'Add Todo'}
        </button>
      </div>
      <ul>
        {todos.map((todos, index) => (
          <li key={index} className="border p-4 rounded mb-2">
            <h3 className="text-lg font-semibold">{todos.title}</h3>
            <p className="text-gray-600">{todos.description}</p>
            <button
              onClick={() => handleEditTodo(index)}
              className="text-blue-500 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(index)}
              className="text-red-500"
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
