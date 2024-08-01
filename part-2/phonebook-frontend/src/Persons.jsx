const Persons = (props) => {
  return (
    <ul>
      {props.persons.map((person) => (
        <li key={person._id}>
          {person.name} {person.number}{" "}
          <button onClick={() => props.handleDelete(person._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
