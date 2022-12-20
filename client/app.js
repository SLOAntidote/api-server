const movieList = document.querySelector(".movie-list")
const userList = document.querySelector(".user-list");

//display all rated movies for this year
fetch("/api/movies").then(res => res.json()).then((movies) => {
    for(let movie of movies) {
        const div = document.createElement("div");
        div.textContent = `"${movie.title}" : This ${movie.genre} movie is rated ${movie.movie_rating} with a run-time of ${movie.runtime_minutes} minutes. User ${movie.user_name} gave it a rating of ${movie.user_rating} out of 10`;
        movieList.prepend(div);
    }
});

//display current users
fetch("/api/users").then(res => res.json()).then((users) => {
    for(let user of users) {
        const div2 = document.createElement("div");
        div2.textContent = `Username: ${user.user_name} - Favorite Genre: ${user.favorite_genre}`;
        userList.prepend(div2);
    }
});

//Add a user
const createUserForm = document.querySelector(".create-user-form");
createUserForm.addEventListener("submit", (event) => {
    const data = new FormData(event.target);
    console.log(data);
    debugger
    const newUser = {
        first_name: data.get('First Name'),
        user_name: data.get('Username'),
        favorite_genre: data.get('Favorite Genre')
    };
    console.log(newUser);
    fetch("/api/users", {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST', 
        body: JSON.stringify(newUser),
    }).then((res) => res.json()).then((user) => {
        const div2 = document.createElement("div");
        div2.textContent = `Username: ${user.user_name} - Favorite Genre: ${user.favorite_genre}`;
        userList.prepend(div2);
    });
});

//Add feature for user to add movies
const createMovieForm = document.querySelector(".create-movie-form");
createMovieForm.addEventListener("submit", (event) => {
    const data = new FormData(event.target);
    
    const newMovie = {
        title: data.get('Title'),
        genre: data.get('Genre'),
        movie_rating: data.get('Rated'),
        runtime_minutes: data.get('Length (minutes)'),
        user_name: data.get('Username'),
        user_rating: data.get('Score (1-10)')
    };

    fetch("/api/movies", {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST', 
        body: JSON.stringify(newMovie),
    }).then((res) => res.json()).then((movie) => {
        const div = document.createElement("div");
        div.textContent = `"${movie.title}" : This ${movie.genre} movie is rated ${movie.movie_rating} with a run-time of ${movie.runtime_minutes} minutes. User ${movie.user_name} gave it a rating of ${movie.user_rating} out of 10`;
        movieList.prepend(div);
    });
});

//fetch("/api/movies/?name=${}")