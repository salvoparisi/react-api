import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [list, setList] = useState([]);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    category: "",
    tags: "",
  });

  const url = "http://localhost:3000";

  const fetchData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error("Errore 404", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.image && formData.title && formData.description && formData.category && formData.tags) {
      const dataToSend = {
        image: formData.image,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.split(",")
      };

      console.log('Dati inviati:', dataToSend);

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Errore nel POST: " + resp.statusText);
          }
          return resp.json();
        })
        .then((newItem) => {

          setList(newItem)

          setFormData({
            image: "",
            title: "",
            description: "",
            category: "",
            tags: "",
          });
        })
        .catch((error) => {
          console.error("Errore durante il POST:", error);
          alert("Errore durante l'aggiunta dell'elemento.");
        });
    } else {
      alert('Compila tutti i campi per aggiungere un oggetto');
    }
  };


  const handleDelete = (indexToDelete) => {

    fetch(`${url}/${indexToDelete}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => setList(data))
    console.log(indexToDelete);

  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <div className="container">
        <h1>To Do List</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="image"
              placeholder="URL Immagine"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Titolo"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              name="description"
              placeholder="Descrizione"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="category"
              placeholder="Categoria"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="tags"
              placeholder="Tag (separati da virgola)"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Aggiungi</button>
        </form>

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
