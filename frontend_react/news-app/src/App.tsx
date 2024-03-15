// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Adjust path as needed
import NewsPage from './pages/NewsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import NotFoundPage from './pages/NotFoundPage'; // Adjust path as needed
import NavigationBar from './components/NavigationBar';
import FooterBar from'./components/FooterBar';

const App: React.FC = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <FooterBar />
        </Router>
    );
};

export default App;
