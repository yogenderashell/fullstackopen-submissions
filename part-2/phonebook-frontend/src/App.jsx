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
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState(null);
  console.log(persons);

  const addPerson = (e) => {
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
        const id = isExist._id;
        phoneBookServices.update(id, phoneObject).then((res) => {
          setMessage(`Updated ${newName}`);
          setFilteredPersons(
            persons.map((person) => (person._id !== id ? person : res.data))
          );
        });
      }
      return;
    }
    phoneBookServices
      .create(phoneObject)
      .then((response) => {
        console.log(response);
        setMessage(`Added ${newName}`);
        setNewName("");
        setNewNumber("");
        setPersons(persons.concat(response.data));
      })
      .catch((err) => {
        setMessage(`validation Error: ${err.response.data.error}`);
        console.log(err);
      });
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
    if (e.target.value === "") {
      setFilteredPersons(persons);
    } else {
      const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredPersons(filteredPersons);
    }
  };

  useEffect(() => {
    phoneBookServices.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  useEffect(() => {
    setFilteredPersons(persons);
  }, [persons]);

  const handleDelete = (id) => {
    phoneBookServices
      .deletePhone(id)
      .then((res) => {
        setMessage("item deleted Successfully")
        setPersons(persons.filter((person) => person._id !== id));
      })
      .catch((err) => {
        setMessage(
          `Information of ${
            persons.find((person) => person._id === id).name
          } has already been removed from server`
        );
        setPersons(persons.filter((person) => person._id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterText={filterText} handleFilter={handleFilter} />
      <h3>Add new person - use the format 000-0000000</h3>
      <PersonForm
        handleSubmit={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={filteredPersons} />
    </div>
  );
};

export default App;
