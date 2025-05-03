import { useState } from 'react'
import NavBar from '/NavBar.jsx'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

 
  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    if (!t) return;
    setTodo(t.todo); // set input box value
    const newTodos = todos.filter(item => item.id !== id); // remove old item
    setTodos(newTodos);
  }

  // Handle Delete
  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  }

  // Handle Add
  const handleAdd = () => {
    if (todo.trim() === "") return; // Prevent adding empty todo
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  }

  // Handle Input Change
  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  // Handle Checkbox Toggle
  const handleCheckBox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 w-2xl">

        <div className="addTodo flex gap-5 mb-5 items-center">
          <h2 className="text-lg font-bold">Add a ToDo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2 border-2 border-gray-400 p-2 rounded-md"
            placeholder="Enter your todo"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6"
          >
            Add
          </button>
        </div>

        <h1 className="text-xl font-bold my-5">Your Todos</h1>
        <div className="todos flex flex-col gap-4">
          {todos.length === 0 && (
            <div className="text-gray-500">No todos yet. Add some!</div>
          )}
          {todos.map((item) => (
            <div key={item.id} className="todo flex items-center px-10 mx-4 bg-white p-4 rounded-md shadow-md">
              <input
                type="checkbox"
                onChange={handleCheckBox}
                checked={item.isCompleted}
                name={item.id}
                className="mx-3"
              />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              <div className="buttons mx-5 flex gap-2">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="bg-red-600 hover:bg-red-800 p-2 py-1 text-sm font-bold text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
