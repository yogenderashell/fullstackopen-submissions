import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import phoneBookServices from "./services/phonebook";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="st">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState(null);
  console.log(persons);

  const addNote = (e) => {
    e.preventDefault();
    const isExist = persons.find((person) => person.name === newName);
    const phoneObject = {
      name: newName,
      number: newNumber,
    };
    if (isExist) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const id = isExist.id;
        phoneBookServices.update(id, phoneObject).then((res) => {
          setMessage(`Updated ${newName}`);
          setPersons(
            persons.map((person) => (person.id !== id ? person : res.data))
          );
        });
      }
      return;
    }
    phoneBookServices.create(phoneObject).then((response) => {
      console.log(response);
      setMessage(`Added ${newName}`);
      setNewName("");
      setNewNumber("");
      setPersons(persons.concat(response.data));
    });
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPersons(filtered);
  };

  useEffect(() => {
    phoneBookServices.getAll().then((res) => setPersons(res.data));
  }, []);

  const handleDelete = (id) => {
    phoneBookServices
      .deletePhone(id)
      .then((res) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((err) => {
        setMessage(
          `Information of ${
            persons.find((person) => person.id === id).name
          } has already been removed from server`
        );
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterText={filterText} handleFilter={handleFilter} />
      <h3>Add new person</h3>
      <PersonForm
        handleSubmit={addNote}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={persons} />
    </div>
  );
};

export default App;
