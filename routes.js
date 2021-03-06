"use strict";
const express = require("express");
const routes = express.Router();

const movies = [
    { id: 1, title: "Black Panther", year: 2018, animated: false },
    { id: 2, title: "The Lion King", year: 1994, animated: true },
    { id: 3, title: "The Godfather", year: 1972, animated: false },
    { id: 4, title: "2001: A Space Odyssey", year: 1968, animated: false },
];

let nextID = 5;

//  GET /movies - respons with a JSON array of movies
routes.get("/movies", (req, res) => {
    res.json(movies);
});

routes.get("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        res.send(`no movie with id ${id} exists`);
    }
    res.json(movie);
});

routes.post("/movies", (req, res) => {
    const movie = req.body;
    movie.id = nextID++;
    movies.push(movie);

    res.status(201);
    res.json(movie);
});

routes.delete("/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id ===id);
    if (index !== -1){
        movies.splice(index, 1);
    }
    res.status(204);
    res.send();
});



// export routes for use in server.js
module.exports = routes;