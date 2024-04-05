// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import NotFoundPage from './pages/NotFoundPage';
import NavigationBar from './components/NavigationBar';
import FooterBar from './components/FooterBar';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';
import BookmarksPage from './pages/BookmarksPage';
import CommunityPage from './pages/CommunityPage';
import WriteCommunityPost from './components/WriteCommunityPost';
import UserProfileForm from './components/UserProfileForm';

const App: React.FC = () => {
    return (
        <Router>
            <NavigationBar />
            <AnimatePresence>
                <RoutesWrapper />
            </AnimatePresence>
            <FooterBar />
        </Router>
    );
};

const RoutesWrapper = () => {
    const location = useLocation();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
        >
            {/* Add top padding equivalent to the height of the NavigationBar */}
            <div> {/* Example height, adjust as needed */}
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/announcements" element={<AnnouncementsPage />} />
                    <Route path="/my-page" element={<MyPage />} />
                    <Route path="/userprofileform" element={<UserProfileForm />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/community/write" element={<WriteCommunityPost />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </motion.div>
    );
}

export default App;

