import { useReducer, useState } from "react";
import { initialState } from "./todos-data";
import TodoItem from "./components/TodoItem";
import "./styles.css";


//const reducer = (state, action) => {
function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "add_todo":
      return state.map((todo) => {

        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
  
      });

    case "delete_todo":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "edit_todo":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, title: action.payload.title };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

export default function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleComplete = (todo) => {
    dispatch({ type: "add_todo", id: todo.id });
  };

  const handleDelete = (id) => {
    dispatch({ type: "delete_todo", payload: { id } });
  };

  const handleEdit = (todo) => {
    setIsEdit(true);
    setEditText(todo.title);
    setEditId(todo.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // If editing existing todo
      dispatch({ type: "EDIT", payload: { id: editId, title: editText } });
      setIsEdit(false);
    } else {
      // If creating new todo
      dispatch({ type: "add_todo", payload: { title } });
    }

    setTitle("");
    setEditText(""); // reset edit text
  };

  return (
    <div className="App">
      <h1>Todo List App</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label id="todo">Add Todo</label>
        <br />
        <br />
        <input
          type="text"
          id="todo"
          placeholder="Add Todo"
          autoComplete="off"
          value={isEdit ? editText : title}
          onChange={(e) => (isEdit ? setEditText(e.target.value) : setTitle(e.target.value))}
        />
        <button type="submit">{isEdit ? "Save" : "Add"}</button>
      </form>
      <hr />
      <h2>Todo List</h2>
      <hr />
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
            <button onClick={() => handleEdit(todo)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </label>
        </div>
      ))}
    </div>
  );
}




