// eslint-disalbe

import React,{useState} from'react';
import './App.css';

function App() {
  return(
  <div className="App">
    <Todolist/>
  </div>
  );
  
}

function Todolist(){
  const [todo,setTodo] = useState(''); 
  const [todos,setTodos] = useState([]);
  const [idvalue,setidvalue] = useState(1);
  var [count,setcount] = useState(0);
  const inputchanges = (e) => {
    setTodo(e.target.value);
  }

  const addlist =(e)=>{
    setcount(count+1);
    setidvalue(idvalue+1);
    e.preventDefault();
    if (todo === "") return; // 입력없이 추가 버튼을 클릭하였을 때
   setTodos(prevTodos => { // todos 에 새로운 원소 추가
    return [...prevTodos,
    { id: idvalue, text: todo, complete:false}
    ]})
    setTodo(""); // todo 를 클리어 시킴
  }

  const clearbutton = (e) => {
    const newTodos = todos.filter(todo => !todo.complete);
    setcount(newTodos.length);
    setTodos(newTodos);
  }

const toggleTodo = id => {
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}
return(
    <div className ="Todolist">
      <h3>할일</h3>
      <Todolists todos = {todos} toggleTodo={toggleTodo}/>
      <input  onChange={inputchanges} value={todo} ></input>
      <input type="button" value="추가" onClick={addlist}></input>
      <button onClick={clearbutton}>삭제 버튼</button>
      <ls><br></br>
        남은할일 개수 : {count}
      </ls>
    </div>
  )
}

function Todolists({todos,toggleTodo}) {
  return (
    todos.map(todo => {
        return <Todo
            key={todo.id}
            toggleTodo={toggleTodo}
            todo={todo} />
    })
)
}

function Todo({ todo, toggleTodo }) {
  const handleTodoClick = () => {
    console.log(todo.id);
      toggleTodo(todo.id)
  }
  return (
      <div >
          <li key= {todo.id}>
              <input type="checkbox"checked={todo.complete}onChange={handleTodoClick} />
              {todo.text}
          </li>
      </div>
  )
}

export default App;