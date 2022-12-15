fetch("/api/movies").then(res => res.json()).then(data => {
    console.log(data);
});