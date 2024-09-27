import "./TodoItem.css";

export default function TodoItem({ todo, todosDispatch }) {
  const { title, completed, id } = todo;

  return (
    <div className="container">
      <input type="checkbox" checked={completed} />
      <p>{title}</p>
      <button>Edit</button>
      <button
        onClick={() => todosDispatch({ type: "delete_todo", payload: { id } })}
      >
        Delete
      </button>
    </div>
  );
}
