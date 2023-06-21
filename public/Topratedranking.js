/* Fonction pour mapper les IDs de genre en noms de genre */
function mapGenreIDs(genreIDs) {
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animated',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  const genreColors = {
    Action: '#FFFFB5',
    Adventure: '#bad1b3',
    Animated: '#CA99FF',
    Comedy: '#EBFF9B',
    Crime: '#E5E5E5',
    Documentary: '#FFDBCC',
    Drama: '#FFC8A2',
    Family: '#D4F0F0',
    Fantasy: '#EEC9E8',
    History: '#8494FD',
    Horror: '#f88585',
    Music: '#55CBCD',
    Mystery: '#ADCCDE',
    Romance: '#FEE1E8',
    'Sci fi': '#D5EDB9',
    'TV Movie': '#C2C8E5',
    Thriller: '#C6DBDA',
    War: '#FF968A',
    Western: '#FFCCB6'
  };

  const genres = genreIDs.map(genreID => {
    const genreName = genreMap[genreID];
    const genreColor = genreColors[genreName];
    return `<span class="genre" style="background-color: ${genreColor}; border-radius: 5px; padding: 2px; margin-right: 2px; margin-bottom: 1%; display: inline-block;">${genreName}</span>`;
  });
  return genres.join('');
}

/* Fonction pour récupérer les films les mieux notés */
function getTopMovies() {
  const apiKey = 'api_key=4898aec2424aaa52b8e4e628ec9b9e04';
  const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?${apiKey}&language=en-US&page=1`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const movieResults = data.results.slice(0, 10);
      const movieData = movieResults.map((movie, index) => {
        return {
          title: movie.title,
          image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          summary: movie.overview,
          year: movie.release_date.split('-')[0],
          publicRating: movie.vote_average,
          pressRating: movie.vote_count,
          genres: mapGenreIDs(movie.genre_ids),
          index: index
        };
      });

      const movieSlider = document.getElementById('movieSlider');
      const html = movieData.map(movie => `
        <div class="slider-item swiper-slide">
          <div class="slider-image-wrapper">
            <img class="slider-image-wrapper image_wrapper2" src="${movie.image}" alt="${movie.title}">
          </div>
          <div class="slider-item-content">
          <h2 class="slider-item-title-top-title slider-ranking-rating"><br>${movie.title}</h2>

            <p class="slider-ranking-rating">${movie.index >= 0 && movie.index <= 9 ? `<span style="font-weight:600;">TOP #${movie.index + 1}</span>` : ''} Match of the week </p>
            <a class="slider-ranking-rating"><span>Rating: ${movie.publicRating}/10</span> ${movie.year}</a>
            <p>${movie.summary}<br></p>
            <p>${movie.genres}</p>
          </div>
        </div>
      `).join('');
      movieSlider.innerHTML = html;
    })
    .catch(error => {
      console.log('Error retrieving top movies:', error);
    });
}

getTopMovies();