import express from "express";
import postgres from "postgres";
// import cors from "cors";

//node.js
//postgresql
//install all npm libraries

const sql = postgres({ database: "movies_2022" });

const app = express();

app.use(express.json());
// app.use(cors());
app.use(express.static("client"));

//localhost:3000/client/app.js...

//Route to get movies by name or all movies
app.get("/api/movies", (req, res, next) => {

    const { q } = req.query;

    if(q){
        sql`SELECT * FROM movies WHERE title ILIKE ${q + "%"}`.then(
            (result) => {
                res.json(result);
            }).catch((err) => {
                next(err);
            });
    }else{
    sql`SELECT * FROM movies`.then((result) => {
        res.json(result);
    }).catch((err) => {
        next(err);
    });
    };
});

//Route to get specific movie by id
app.get("/api/movies/:id", (req, res, next) => {
    const { id } = req.params;
     sql `SELECT * FROM movies WHERE id = ${id}`. then((result) => {
        if(result.length === 0){
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        } else {
        res.json(result[0]);
        };
     }).catch((err) => {
        next(err);
    });
});
      
//Route to allow new movies to be added
app.post("/api/movies", (req, res, next) => {
    const movie = req.body;
    const requiredFields = ["title", "personal_rating", "movie_rating", "runtime_minutes", "rewatch"];
    const errors = [];
    for(let field of requiredFields) {
        if(movie[field] === undefined) {
            errors.push(`Missing movie '${field}'.`);
        }
    }
    const { title, personal_rating, movie_rating, runtime_minutes, rewatch } = req.body;
    sql`INSERT INTO movies (title, personal_rating, movie_rating, runtime_minutes, rewatch) VALUES (${title}, ${personal_rating}, ${movie_rating}, ${runtime_minutes}, ${rewatch}) RETURNING *`.then(
        (result) => {
            res.status(201);
            res.send(result[0]);
        }).catch((err) => {
            next(err);
        });
});

//Handle errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});

app.listen(3000);
