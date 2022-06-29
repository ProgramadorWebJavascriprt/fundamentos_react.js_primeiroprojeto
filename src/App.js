
import './App.css';
import{useState, useEffect} from 'react';
import {Bstrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react';

const API ="http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, settime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setloading] = useState(false);
  // {Quarta-feira(Feriado Municipal),29/06/22 as 10:30:00 h+|- }
  // Load todos on page load
  useEffect(() => {
    const loadData = async() => {
      setloading(true)
      const res = await fetch(API + "./todos")
         .then((res)=> res.json())
         .then((data) => data)
         .catch((err) => console.log(err) );
      setloading(false);
       setTodos(res);
    };
    loadData();
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = {
      id:Math.random(),
      title,
      time,
      done: false,
       }
    //   // Enviou para api;
    // console.log(todo)
    await fetch(API + "/todos", {
      method: "POST",
      body:JSON.stringify(todo),
      headers : {
        "Content Type": "application/json",
      }
    });
    setTodos((prevState)=> [...prevState, todo]);

     setTitle("");
     setTime("");
  };
  const handleDelete =async(todo) => {
    todo.done = !todo.done;
    await fetch(API + "/todos" +  todo.id,  {
     method: "Delete",  });
    setTodos((prevState)=> prevState.filter((todo) => todo.id !== id))};
    const handleEdit = async(todo) =>{
      await fetch(API + "/todos" + id,{
        method: "Put",
        body:JSON.stringify(todo),
        headers : {
          "Content Type": "application/json",},
      });
      setTodos((prevState)=> prevState.filter((todo) => todo.id !== id))};
    }
  if(loading){
    return <p> Carregando,eita internet nenêeeeeeeeeeê....</p>
  }

  return (
     <div className="App">
       <h1>todo </h1>
      <div className="todo-header">
        <h1> Todos de Bike </h1>
      </div>
      <div className="form-todo">
        {/* <p> Formulario</p> */}
         <h2> Inseria a sua próxima tarefa:</h2>
         <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer? </label>
            <input type="text" name="title" placeholder="Titulo a tarefas" 
            onChange={((e)=> setTitle(e.target.value))} value={title || ""} required
            />
          </div>
         <input type="submit" value="Enviar"/>
         </form>
      </div>
      <div className="form-control">
            <label htmlFor="time">Duração: </label>
            <input type="text" name="time" placeholder="Tempo estimado em horas" 
            onChange={((e)=> setTime(e.target.value))} value={time || ""} required
            />
          </div>
       <div className="list-todo">
          {/* <p>Listas de tarefas</p> */}
          <h2>Listas de tarefas:</h2> 
          {todos.length === 0 && <p> não há tarefas!</p>}
          {todos.map((todo) => {
            <div className="todo" key={todo.id}>  
            <h3 className={todo.done ? "todo.done": ""}>{todo.title}</h3>
            <p> Duração: {todo.time} </p>
            <div className="actions">
             <span onClick={() => handleEdit(todo)}> 
              {!todo.done ? <BsBookmarkCheck/> :<BsBookmarkCheckFill/> } 
               </span>
               <Bstrash onClick={()=>handleDelete(todo.id) }/>
              </div>
            </div>
          })}
       </div>
     </div>
  );
 

export default App;