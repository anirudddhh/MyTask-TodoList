import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = (e, id) => {
    const t = todos.find(i => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl bg-violet-200 p-2 min-h-[88vh] w-[35%]">
      <h1 className='font-bold text-center text-2xl'>MyTask - Manage your todos at one place</h1>
        <div className='addTodo my-5 flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type='text' className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-purple-800 hover:bg-violet-950 disabled:bg-violet-700 p-4 py-2 text-sm font-semibold text-white rounded-full mx-2'>Save</button>
          </div>
        </div>
        <div className='showFinished my-5'>
          <input className='my-2' type="checkbox" checked={showFinished} onChange={toggleFinished} /> Show Finished
        </div>
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='m-5 '>No Todos to display</div>}
          {todos.filter(item => showFinished || !item.isCompleted).map(item => (
            <div key={item.id} className='todo flex justify-between w-full my-3'>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className='buttons flex h-full'>
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-purple-800 hover:bg-violet-950 p-2 py-1 text-sm font-semibold text-white rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-purple-800 hover:bg-violet-950 p-2 py-1 text-sm font-semibold text-white rounded-md mx-2'><MdDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
