// Import the axios library
import axios from "axios";
// Define the base URL for the API
const baseURL = "https://imdb-api.com/en/API";
// Define the API key
const apiKey = "YOUR_API_KEY";

// Create a function to get the list of movies
const getMovies = async (query) => {
  // Make a GET request to the API
  const response = await axios.get(`${baseURL}/SearchMovie/${apiKey}/${query}`);
  // Return the list of movies
  return response.data.items;
};

// Create a function to filter the list of movies
const filterMovies = (movies, rating, genre, year) => {
  // Filter the movies by rating
  const filteredMovies = movies.filter((movie) => {
    return movie.imdb_rating >= rating;
  });

  // Filter the movies by genre
  if (genre) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.genres.includes(genre);
    });
  }

  // Filter the movies by year
  if (year) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.release_date === year;
    });
  }

  // Return the filtered list of movies
  return filteredMovies;
};

// Add an event listener to the search form
const searchForm = document.querySelector("form[action='search.php']");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the search query from the search form
  const query = searchForm.querySelector("input[name='q']").value;

  // Get the list of movies from the API
  const movies = await getMovies(query);

  // Filter the list of movies
  const filteredMovies = filterMovies(movies, 0, null, null);

  // Render the list of movies
  const resultsList = document.querySelector("#results ul");

  resultsList.innerHTML = "";

  filteredMovies.forEach((movie) => {
    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.href = `movie.php?id=${movie.id}`;
    link.textContent = movie.title;

    listItem.appendChild(link);

    resultsList.appendChild(listItem);
  });
});

// Add an event listener to the filter form
const filterForm = document.querySelector("form[action='filter.php']");

filterForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the filter values from the filter form
  const rating = filterForm.querySelector("select[name='rating']").value;
  const genre = filterForm.querySelector("select[name='genre']").value;
  const year = filterForm.querySelector("input[name='year']").value;

  // Get the list of movies from the API
  const movies = await getMovies("");

  // Filter the list of movies
  const filteredMovies = filterMovies(movies, rating, genre, year);

  // Render the list of movies
  const resultsList = document.querySelector("#results ul");

  resultsList.innerHTML = "";

  filteredMovies.forEach((movie) => {
    const listItem = document.createElement("li");

    const link = document.createElement("a");
    link.href = `movie.php?id=${movie.id}`;
    link.textContent = movie.title;

    listItem.appendChild(link);

    resultsList.appendChild(listItem);
  });
});
