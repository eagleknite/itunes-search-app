import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import WelcomeMessage from './ui/WelcomeMessage';
import ToastNotification from './ui/ToastNotification';

import './App.css';

function App() {
  const loading = useSelector(state => state.ui.loading);
  const error = useSelector(state => state.ui.error);

  return (
    <Router className="App">
      <Header />
      {loading && <ToastNotification message="Loading..." type="loading" />}
      {error && <ToastNotification message={error} type="error" />}
      <Routes>
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<WelcomeAndRedirect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function WelcomeAndRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/search', { replace: true });
        }, 3000); // Redirect after 3 seconds

        return () => clearTimeout(timer); // Clean up the timer
    }, [navigate]);

    return <WelcomeMessage />;
}

export default App;
