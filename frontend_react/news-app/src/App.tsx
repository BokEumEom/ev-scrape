// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from '@/pages/HomePage';
import NewsPage from '@/pages/NewsPage';
import AnnouncementsPage from '@/pages/AnnouncementsPage';
import NotFoundPage from '@/pages/NotFoundPage';
// import NavigationBar from '@/components/NavigationBar';
// import FooterBar from '@/components/FooterBar';
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
import EVRegistrationPage from '@/pages/EVRegistrationPage';
import Layout from '@/components/Layout';

// Router: 라우팅을 관리하며, AppLayout 컴포넌트를 렌더링합니다.
const App: React.FC = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
};
// AppLayout: 현재 경로를 확인하여 isMapPage 조건에 따라 NavigationBar와 FooterBar를 조건부로 렌더링합니다.
const AppLayout = () => {
    const location = useLocation();
    const isMapPage = location.pathname === '/map';

    return (
        <>
        {/* NavigationBar: isMapPage가 아닌 경우에만 렌더링됩니다. */}
            {!isMapPage}
            {/* isMapPage ? <RoutesWrapper /> : <Layout><RoutesWrapper /></Layout>: isMapPage가 true인 경우 RoutesWrapper만 렌더링하고, false인 경우 Layout 내에 RoutesWrapper를 포함하여 렌더링합니다. */}
            <div className={isMapPage ? '' : '100-dvh'}>
                {isMapPage ? (
                    <RoutesWrapper />
                ) : (
                    <Layout>
                        <RoutesWrapper />
                    </Layout>
                )}
            </div>
            {/* FooterBar: isMapPage가 아닌 경우에만 렌더링됩니다. */}
            {!isMapPage}
        </>
    );
};

const RoutesWrapper = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
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
                        <Route path="/ev-registration" element={<EVRegistrationPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default App;
