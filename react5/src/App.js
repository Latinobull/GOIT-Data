import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarLoader from 'react-spinners/BarLoader';
import ScrollToTop from 'react-scroll-up';

import Wrapper from 'components/Wrapper/';
import Section from 'components/Section';
import Container from 'components/Container';
import AppBar from 'components/AppBar';

import styles from './services/styles';
import sprite from './images/icons.svg';

// Lazy-loaded components
const HomePage = lazy(() => import('components/HomePage'));
const MoviesPage = lazy(() => import('components/MoviesPage'));
const MovieDetailsPage = lazy(() => import('components/MovieDetailsPage'));
const Cast = lazy(() => import('components/MovieDetailsPage/Cast'));
const Reviews = lazy(() => import('components/MovieDetailsPage/Reviews'));

export default function App() {
  // Color for Loader component
  let [color] = useState('#EF6401');

  return (
    <Wrapper>
      <AppBar />
      <Section>
        <Container>
          <Suspense fallback={<BarLoader color={color} />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<Cast />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </Container>
      </Section>


      <ScrollToTop showUnder={100} style={styles.upButton}>
        <svg style={{ fill: '#EF6401' }} width="16" height="16" aria-label="logo">
          <use href={`${sprite}#arrow-up`}></use>
        </svg>
      </ScrollToTop>
      <ToastContainer autoClose={3000} theme="colored" />
    </Wrapper>
  );
}
