import { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { fetchMovieDetails } from 'services/movies-api';
import s from './MovieDetailsPage.module.css';
import sprite from '../../images/icons.svg';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [from, setFrom] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    if (state?.from) {
      const { pathname, search } = state.from;
      setFrom(pathname);
    }
  }, [state?.from]);

  useEffect(() => {
    fetchMovieDetails(movieId).then(data => {
      setMovie(data);
      console.log(data);
    });
  }, [movieId]);

  function createGenres(arrayID, genresID) {
    return arrayID
      .map(element => {
        if (genresID.includes(element.id)) {
          return element.name;
        }
        return null;
      })
      .filter(Boolean);
  }

  function goBackHandle() {
    if (from === null) {
      navigate('/', { replace: true });
    } else {
      navigate(from);
    }
  }

  function timeConvert(time) {
    const duration = time;
    const hours = Math.floor(duration / 60);
    const roundedMinutes = Math.round((duration / 60 - hours) * 60);
    const hoursText = hours === 1 ? `${hours} hour ` : `${hours} hours `;
    const minutesText =
      roundedMinutes === 1 ? `${roundedMinutes} minute` : `${roundedMinutes} minutes`;
    return hoursText + minutesText;
  }

  return (
    <>
      {movie ? (
        <div className={s.details}>
          <div className={s.image_wrapper}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
              }
              alt={movie.original_title}
              className={s.image}
            />
            <button onClick={goBackHandle} className={s.go_back}>
              <svg className={s.go_back__icon} width="16" height="16" aria-label="logo">
                <use href={`${sprite}#arrow-back`}></use>
              </svg>
            </button>
          </div>

          <div className={s.description}>
            <div className={s.title_wrapper}>
              <h2 className={s.title}>{movie.original_title}</h2>
              {movie.tagline && <p className={s.tagline}>"{movie.tagline}"</p>}
            </div>
            <ul className={s.info}>
              <li className={s.info__item}>
                User Score:{' '}
                <span className={s.info__value}>
                  <span className={s.star}>
                    <i className="fa fa-star-o"></i>
                  </span>
                  &#160;{movie.vote_average || '--'}
                </span>
              </li>
              <li className={s.info__item}>
                Release date:{' '}
                <span className={s.info__value}>
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString('en-US', options)
                    : '--'}
                </span>
              </li>
              {movie.budget !== 0 && (
                <li className={s.info__item}>
                  Budget: <span className={s.info__value}>${movie.budget.toLocaleString()}</span>
                </li>
              )}
              {movie.revenue !== 0 && (
                <li className={s.info__item}>
                  Revenue: <span className={s.info__value}>${movie.revenue.toLocaleString()}</span>
                </li>
              )}
              {movie.runtime !== 0 && (
                <li className={s.info__item}>
                  Runtime: <span className={s.info__value}>{timeConvert(movie.runtime)}</span>
                </li>
              )}
              <li className={s.info__item}>
                Genres:{' '}
                {movie.genres.length > 0 ? (
                  <ul className={s.genres}>
                    {movie.genres.map(({ id, name }, index) => (
                      <li className={s.genres__item} key={id}>
                        {(index ? ', ' : '') + name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={s.genres__item}>Other</p>
                )}
              </li>
            </ul>

            <p className={s.overview}>{movie.overview}</p>

            <div className={s.additional}>
              <Link to={`/movies/${movieId}/cast`} className={s.additional__button}>
                Cast
              </Link>
              <Link to={`/movies/${movieId}/reviews`} className={s.additional__button}>
                Reviews
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h4>
          There is nothing here, go back to the beginning <Link to="/">Back</Link>
        </h4>
      )}

      <Outlet />
    </>
  );
}
