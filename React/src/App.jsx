import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './components/Forms.jsx'
import Cards from './components/Cards.jsx'

function App() {
  const [list, setList] = useState([]);

  const url = "http://localhost:3000";

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error("Errore 404", error));
  };


  const addToList = (newItem) => {
    setList(newItem);
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <div className="container">
        <h1>To Do List</h1>
        <Forms addToList={addToList} url={url} />
        <Cards addToList={addToList} url={url} list={list} />
      </div>
    </>
  );
}

export default App;
