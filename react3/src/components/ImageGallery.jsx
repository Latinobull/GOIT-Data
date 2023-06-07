import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Container from './Container';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import fetchImages from '../services/image-api';
import styles from '../styles/ImageGallery.module.css';

const ImageGallery = ({ searchQuery, onModalOpen }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(1);
  const [imagesPerPage] = useState(12);
  const [status, setStatus] = useState('idle');

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  useEffect(() => {
    const fetchImagesData = async () => {
      setStatus('pending');

      try {
        const response = await fetchImages(searchQuery, page === 1);
        const { totalHits, hits } = response;

        if (totalHits > 0) {
          toast.success(
            `Hooray! We found ${totalHits} images of ${searchQuery}.`
          );
          setTotalHits(totalHits);
          setImages(prevImages => [...prevImages, ...hits]);
          setStatus('resolved');
        } else {
          setStatus('rejected');
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setStatus('rejected');
        toast.error(
          'Sorry, there was an error fetching the images. Please try again.'
        );
      }
    };

    if (searchQuery !== '') {
      setTotalHits(1);
      setPage(1);
      setImages([]);
      fetchImagesData();
    }
  }, [searchQuery, page]);

  return (
    <Container>
      <ul className={styles.gallery}>
        <ImageGalleryItem data={images} openModal={onModalOpen} />
      </ul>
      {status === 'resolved' && (
        <Button text={'Load more'} buttonClick={handleLoadMore} />
      )}
      {status === 'pending' && <Loader />}
    </Container>
  );
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default ImageGallery;
