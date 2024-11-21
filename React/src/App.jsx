import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './components/Forms.jsx'

function App() {
  const [list, setList] = useState([]);

  const url = "http://localhost:3000";

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error("Errore 404", error));
  };

  const handleDelete = (indexToDelete) => {

    fetch(`${url}/${indexToDelete}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setList(data))
    console.log(indexToDelete);

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

        <div className="d-flex flex-wrap justify-content-between">
          {list.map((obj, index) => (
            <div key={index} className="max-w position-relative border p-3">
              <button
                className="btn btn-danger position-absolute end-0 top-0 m-1"
                onClick={() => handleDelete(obj.id)}
              >
                Delete
              </button>
              <img src={obj.image} alt="" className="img-fluid" />
              <h3>{obj.title}</h3>
              <p className="min-h">{obj.description}</p>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="tags">
                  {obj.tags.map((tag, index) => (
                    <span key={index} className="me-2 badge bg-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="badge bg-warning text-dark">{obj.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
