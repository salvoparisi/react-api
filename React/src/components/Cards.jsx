import { useEffect, useState } from 'react';

function Cards({ addToList, url, list }) {

    const handleDelete = (indexToDelete) => {

        fetch(`${url}/${indexToDelete}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => addToList(data))
        console.log(indexToDelete);
    };
    return (
        <>
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
        </>
    )
}

export default Cards