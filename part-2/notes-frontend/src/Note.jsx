const Note = ({ note, toggleImportance }) => {
  let label = note.important;
  label = label.toString() || "null value";
  console.log("Label is : ", label);
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
