import React, { useState, useEffect } from 'react';

export default function AddFilm() {
    const [filmes, setFilmes] = useState([]);
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseyear, setReleaseyear] = useState('')
    const url = 'http://localhost:3000/filmes';

    const insereFilme = async (e) => {
        e.preventDefault();
        
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    genre: genre,
                    release_year: releaseyear
                })
            });

            if(!response.ok) {
                throw new Error("Error to added Film.")
            }

            console.log(`${title} added with successfully.`)
            setTitle('');
            setGenre('');
            setReleaseyear('');
        }
        catch(error){
            console.error(`Erro when searching Film: ${title}`, error)
        }
    }

    return(
        <>
        
        </>
    )
}