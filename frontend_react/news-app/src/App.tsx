// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
<<<<<<< HEAD
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
import WriteCommunityPost from './components/community/WriteCommunityPost';
import UserProfileForm from './components/mypage/UserProfileForm';
import CommunityPostDetailPage from './pages/CommunityPostDetailPage';
import AddVehiclePage from './pages/AddVehiclePage';
import VehicleSpecPage from './pages/VehicleSpecPage';
import VehicleSpecDetail from './components/vehicle/VehicleSpecDetail';
import SignUpPage from './components/users/SignUpPage';
import SignInPage from './components/users/SignInPage';
import KakaoMapPage from './pages/KakakoMapPage';
import Game from './pages/GamePage';
import WindowPage from './pages/WindowPage'; // 추가된 부분
=======
import HomePage from '@/pages/HomePage';
import NewsPage from '@/pages/NewsPage';
import AnnouncementsPage from '@/pages/AnnouncementsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import NavigationBar from '@/components/NavigationBar';
import FooterBar from '@/components/FooterBar';
import SearchPage from '@/pages/SearchPage';
import MyPage from '@/pages/MyPage';
import BookmarksPage from '@/pages/BookmarksPage';
import CommunityPage from '@/pages/CommunityPage';
import WriteCommunityPost from '@/components/community/WriteCommunityPost';
import UserProfileForm from '@/components/mypage/UserProfileForm';
import CommunityPostDetailPage from '@/pages/CommunityPostDetailPage';
import AddVehiclePage from '@/pages/AddVehiclePage';
import VehicleSpecPage from '@/pages/VehicleSpecPage';
import VehicleSpecDetail from '@/components/vehicle/VehicleSpecDetail';
import SignUpPage from '@/components/users/SignUpPage';
import SignInPage from '@/components/users/SignInPage';
import KakaoMapPage from '@/pages/KakakoMapPage';
import Game from '@/pages/GamePage';
>>>>>>> main

const App: React.FC = () => {
    return (
        <Router>
            <NavigationAndFooter />
        </Router>
    );
};

const NavigationAndFooter = () => {
    const location = useLocation();  // Now used within the context of <Router>
    const isMapPage = location.pathname === '/map';

    return (
        <>
            {!isMapPage && <NavigationBar />}
            <AnimatePresence>
                <RoutesWrapper />
            </AnimatePresence>
            {!isMapPage && <FooterBar />}
        </>
    );
}

const RoutesWrapper = () => {
    const location = useLocation();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
        >
            <div className="relative w-full h-screen">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/announcements" element={<AnnouncementsPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/userprofileform" element={<UserProfileForm />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/community/write" element={<WriteCommunityPost />} />
                    <Route path="/community/:postId" element={<CommunityPostDetailPage />} />
                    <Route path="/add-vehicle" element={<AddVehiclePage />} />
                    <Route path="/vehiclespec" element={<VehicleSpecPage />} />
                    <Route path="/vehicle-spec-detail/:id" element={<VehicleSpecDetail />} />
                    <Route path="/map" element={<KakaoMapPage />} />                
                    <Route path="/game" element={<Game />} />
                    <Route path="/window" element={<WindowPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </motion.div>
    );
}

export default App;
