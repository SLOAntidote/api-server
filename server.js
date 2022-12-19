import express from "express";
import postgres from "postgres";
import dotenv from "dotenv";

console.log(process.env.DATABASE_URL, "before");

dotenv.config();

console.log(process.env.DATABASE_URL, "after");

const sql = postgres(process.env.DATABASE_URL);

const app = express();

app.use(express.json());
app.use(express.static("client"));

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
    console.log(req.body);
    const requiredFields = ["title", "genre", "movie_rating", "runtime_minutes", "user_name", "user_rating"];
    const errors = [];
    for(let field of requiredFields) {
        if(movie[field] === undefined) {
            errors.push(`Missing movie '${field}'.`);
        }
    }
    const { title, genre, movie_rating, runtime_minutes, user_name, user_rating } = req.body;
    sql`INSERT INTO movies (title, genre, movie_rating, runtime_minutes, user_name, user_rating) VALUES (${title}, ${genre}, ${movie_rating}, ${runtime_minutes}, ${user_name}, ${user_rating}) RETURNING *`.then(
        (result) => {
            res.status(201);
            res.send(result[0]);
        }).catch((err) => {
            next(err);
        });
});

//Route to get users by name or all users
app.get("/api/users", (req, res, next) => {

    const { q } = req.query;

    if(q){
        sql`SELECT * FROM users WHERE user_name ILIKE ${q + "%"}`.then(
            (result) => {
                res.json(result);
            }).catch((err) => {
                next(err);
            });
    }else{
    sql`SELECT * FROM users`.then((result) => {
        res.json(result);
    }).catch((err) => {
        next(err);
    });
    };
});

//Handle errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});

app.listen(3000);
