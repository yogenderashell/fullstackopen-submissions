const Persons = (props) => {
  return (
    <ul>
      {props.persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          {
            <button onClick={() => props.handleDelete(person.id)}>
              Delete
            </button>
          }
        </li>
      ))}
    </ul>
  );
};

export default Persons;
