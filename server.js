import express from "express";
import postgres from "postgres";

const sql = postgres({ database: "movies_2022" });


const app = express();

app.use(express.json());

//Route to get all movies
app.get("/movies", (req, res) => {
    sql`SELECT * FROM movies`.then((result) => {
        res.json(result);
    });
});

//Route to get specific movie by id
app.get("/movies/:id", (req, res) => {
    const { id } = req.params;
     sql `SELECT * FROM movies WHERE id = ${id}`. then((result) => {
        if(result.length === 0){
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        } else {
        res.json(result);
        };
     });
});
        

app.post("/movies", (req, res) => {
    const { title, personal_rating, movie_rating, runtime_minutes, rewatch } = req.body;
    sql`INSERT INTO movies (title, personal_rating, movie_rating, runtime_minutes, rewatch) VALUES (${title}, ${personal_rating}, ${movie_rating}, ${runtime_minutes}, ${rewatch}) RETURNING *`.then(
        (result) => {
            res.send(result);
        });
});

app.listen(3000);
