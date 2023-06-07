const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25716133-5af1cc1f28b9664f0c877d305';
const searchParams = 'image_type=photo&orientation=horizontal&per_page=20';
export default function fetchImages(query, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&${searchParams}`;
  return fetch(url).then(response => response.json());
}
