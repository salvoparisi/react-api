import { useEffect, useState } from 'react';

function Forms({ addToList, url }) {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        description: "",
        category: "",
        tags: "",
    });
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
                .then((data) => {

                    addToList(data)

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
    return (
        <>
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
        </>
    )
}

export default Forms