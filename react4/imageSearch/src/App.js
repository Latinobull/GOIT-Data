import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from 'react-scroll-up';

import Wrapper from './components/Wrapper';
import Section from './components/Section';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';

import styles from './services/styles';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const TOAST_MESSAGES = {
    emptyQuery: 'Input a search query.',
    sameQuery: 'Input new search query.',
  };
  const handleSubmit = query => {
    console.log(query);
    if (query === '') {
      return toast.info(TOAST_MESSAGES.emptyQuery);
    }

    if (query === searchQuery) {
      return toast.info(TOAST_MESSAGES.sameQuery);
    }

    setSearchQuery(query);
  };

  const toggleModal = data => {
    setShowModal(!showModal);

    if (!showModal) {
      const { largeImageURL, tags } = data;
      setSrc(largeImageURL);
      setAlt(tags);
    }
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit} />

      <Section>
        <ImageGallery searchQuery={searchQuery} onModalOpen={toggleModal} />
      </Section>

      {showModal && (
        <Modal onModalClose={toggleModal}>
          <img src={src} alt={alt} style={styles.modalImage} />
        </Modal>
      )}

      {/* Notifications */}
      <ToastContainer autoClose={3000} theme="colored" />

      {/* Scroll to top button */}
      <ScrollToTop showUnder={100} style={styles.upButton}>
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
      </ScrollToTop>
    </Wrapper>
  );
};

export default App;
