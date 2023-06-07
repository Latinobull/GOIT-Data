const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=387a2500e741e87c896db50117c25d75';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok ? await response.json() : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies(page = 1) {
  const PATH_PARAMS = '/trending/movie/week';
  return fetchWithErrorHandling(`${BASE_URL}${PATH_PARAMS}${API_KEY}&page=${page}`);
}

export function fetchMovies(searchQuery, page = 1) {
  const PATH_PARAMS = '/search/movie';
  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${API_KEY}&query=${searchQuery}&page=${page}&language=en-US&include_adult=false`,
  );
}

export function fetchMovieDetails(movie_id) {
  const PATH_PARAMS = '/movie/';
  return fetchWithErrorHandling(`${BASE_URL}${PATH_PARAMS}${movie_id}${API_KEY}&language=en-US`);
}

export function fetchMovieCredits(movie_id) {
  const PATH_PARAMS = '/movie/';
  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${movie_id}/credits${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movie_id, page = 1) {
  const PATH_PARAMS = '/movie/';
  return fetchWithErrorHandling(
    `${BASE_URL}${PATH_PARAMS}${movie_id}/reviews${API_KEY}&language=en-US&page=${page}`,
  );
}
