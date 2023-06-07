import { genresNames } from './genres-names';

function normalizedData(results) {
  return results.map(movie => {
    const genres = createGenres(genresNames, movie.genre_ids);
    let listOfGenres = genres[0];

    if (listOfGenres.length > 3) {
      listOfGenres = listOfGenres.slice(0, 3);

      const other = {
        id: 777,
        name: 'Other',
      };

      listOfGenres.push(other);
    }

    const objData = {
      ...movie,
      genres: listOfGenres,
    };

    return objData;
  });
}

function createGenres(arrayID, genresID) {
  const arrayOfGenres = arrayID.filter(element => genresID.includes(element.id));
  return [arrayOfGenres];
}

export default normalizedData;
