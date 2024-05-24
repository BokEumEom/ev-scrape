//
import React, { useState, useEffect  } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Divide as Hamburger } from 'hamburger-react';
import { 
IoPeopleSharp, IoCarSportSharp, IoDice, IoSearch, 
  IoHomeOutline, IoHomeSharp,
  IoBookmarkOutline, IoBookmark,
  IoPersonOutline, IoPersonSharp,
  IoNewspaper, IoNewspaperOutline,
  IoToday, IoTodayOutline
} from 'react-icons/io5';
import { FaChargingStation } from 'react-icons/fa6';
import '../styles/WindowPage.css';

//main
import { Link } from 'react-router-dom';
import {  FaMap } from 'react-icons/fa6';
import { 
  IoRocketSharp, 
  IoCalendarNumberSharp, 
  IoMegaphone, 
  IoCarSport, 
  IoGiftSharp, 
  IoRibbonSharp, 
  IoPerson,
  IoSettings,
  IoQrCodeOutline,
  IoFlashSharp,
  IoBatteryChargingSharp 
} from 'react-icons/io5';




const WindowPage: React.FC = () => {
  // head area Start
  const [isOpen, setIsOpen] = useState(false); 
  // head area End
  

  // foot area Start
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the active icon based on the current route
  const determineActiveIcon = (pathname: string) => {
    if (pathname === '/') return 'home';
    if (pathname.includes('news')) return 'news';
    if (pathname.includes('announcements')) return 'announcements';
    if (pathname.includes('bookmarks')) return 'bookmarks';
    if (pathname.includes('my-page')) return 'my-page';
    return '';
  };

  const [activeIcon, setActiveIcon] = useState(determineActiveIcon(location.pathname));

  useEffect(() => {
    // Update the active icon based on the current route whenever it changes
    const currentActiveIcon = determineActiveIcon(location.pathname);
    setActiveIcon(currentActiveIcon);
  }, [location.pathname]);

  const handleIconClick = (iconName: string, path: string) => {
    setActiveIcon(iconName); // Set the clicked icon as active
    navigate(path); // Navigate to the corresponding page
  };
  // foot area End

  useEffect(() => {
    const addEventListeners = (selectors: string[], event: string, handler: EventListener) => {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          element.addEventListener(event, handler);
        });
      });
    };

    const removeEventListeners = (selectors: string[], event: string, handler: EventListener) => {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          element.removeEventListener(event, handler);
        });
      });
    };

    const handleOpenModal = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const windowId = target.getAttribute('data-openModal');
      if (windowId) {
        document.querySelectorAll('.modal_area_container').forEach(modal => {
          modal.classList.remove('active');
        });
        const modal = document.querySelector(`.modal_area_container[data-openWindow="${windowId}"]`);
        if (modal) {
          document.querySelector('.modal_area')?.classList.add('active');
          modal.classList.add('active');
        }
      }
    };

    const handleCloseModal = () => {
      document.querySelector('.modal_area')?.classList.remove('active');
      document.querySelectorAll('.modal_area_container').forEach(modal => {
        modal.classList.remove('active');
      });
    };

    const handleOpenGnb = () => {
      document.querySelector('.head_area_gnb')?.classList.add('active');
    };

    const handleCloseGnb = () => {
      document.querySelector('.head_area_gnb')?.classList.remove('active');
    };

    const handleButtonSparkle = (e: Event) => {
      const button = e.currentTarget as HTMLElement;
      button.classList.add('sparkling');
      setTimeout(() => button.classList.remove('sparkling'), 1000);
    };

    const modalSelectors = ['[data-openModal]', '[data-closeModal]', '.dim'];
    const gnbSelectors = ['[data-openGnb]', '.head_area_gnb a'];
    const sparkleSelector = ['.btn_open_modal'];

    addEventListeners(modalSelectors, 'click', handleOpenModal);
    addEventListeners(['[data-closeModal]', '.dim'], 'click', handleCloseModal);
    addEventListeners(gnbSelectors, 'click', handleOpenGnb);
    addEventListeners(['.head_area_gnb a'], 'click', handleCloseGnb);
    addEventListeners(sparkleSelector, 'click', handleButtonSparkle);

    return () => {
      removeEventListeners(modalSelectors, 'click', handleOpenModal);
      removeEventListeners(['[data-closeModal]', '.dim'], 'click', handleCloseModal);
      removeEventListeners(gnbSelectors, 'click', handleOpenGnb);
      removeEventListeners(['.head_area_gnb a'], 'click', handleCloseGnb);
      removeEventListeners(sparkleSelector, 'click', handleButtonSparkle);
    };
  }, []);

  return (
     <div className="window_page">
       <h1 className="sr-only">EV Trend</h1>
       <div className="wrap">
         <div className="head_area">
           <div className="head_area_controler">
             <h2 className="logo"><img src="/src/assets/images/logo_black_bg.png" alt="" /></h2>
             <div data-srch>
              {/*뉴스검색*/}
                <NavLink to="/search" className={({ isActive }) => isActive ? 'text-gray-700' : 'text-white'} title="Search">
                  <IoSearch className="text-gray-700 text-2xl" aria-label="Search" />
                </NavLink>
              </div>
             <button data-openGnb>
                {/*gnb열기*/}
                <Hamburger toggled={isOpen} toggle={setIsOpen} color="#4B5563" size={24} aria-label="Toggle Menu" />
              </button>
           </div>
           <ul className="head_area_gnb">
            <li>
              <NavLink to="/community" className="block px-4 py-2 text-black hover:bg-gray-100" title="Community">
                <IoPeopleSharp className="inline-block mr-2" aria-label="Community" />
                커뮤니티
              </NavLink>
            </li>
            <li>
              <NavLink to="/vehiclespec" className="block px-4 py-2 text-black hover:bg-gray-100" title="Vehicle Specifications">
                <IoCarSportSharp className="inline-block mr-2" aria-label="Vehicle Specifications" />
                차량제원
              </NavLink>
            </li>
            <li>
              <NavLink to="/map" className="block px-4 py-2 text-black hover:bg-gray-100" title="Charging Stations">
                <FaChargingStation className="inline-block mr-2" aria-label="Charging Stations" />
                충전소
              </NavLink>
            </li>
            <li>
              <NavLink to="/game" className="block px-4 py-2 text-black hover:bg-gray-100" title="Charging Stations">
                <IoDice className="inline-block mr-2" aria-label="Play Game" />
                게임
              </NavLink>
            </li>
           </ul>
         </div>
         <div className="cover_area">
           {/*<button className="btn_open_modal" data-openModal="1">팝업오픈</button>
           <button className="btn_open_modal" data-openModal="2">팝업오픈</button>
           <button className="btn_open_modal" data-openModal="3">팝업오픈</button>*/}
          <div className="px-4">
            {/* Top Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Link to="/news" className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">
                <h2 className="text-lg font-semibold">뉴스</h2>
                <p className="text-sm">Stay updated with the latest EV news</p>
                <IoNewspaper className="text-3xl" />
              </Link>
              <Link to="/announcements" className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">         
                <h2 className="text-lg font-semibold">공고</h2>
                <p className="text-sm">Important updates and announcements</p>
                <IoMegaphone className="text-3xl" />
              </Link>
              <Link to="/community" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">
                <h2 className="text-lg font-semibold">커뮤니티</h2>
                <p className="text-sm">Join the discussion with other EV enthusiasts</p>
                <IoPeopleSharp className="text-3xl" />
              </Link>
              <Link to="/vehicle-specs" className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-2 transition transform hover:scale-105">        
                <h2 className="text-lg font-semibold">전기차 제원</h2>
                <p className="text-sm">Detailed specs of various EVs</p>
                <IoCarSport className="text-3xl" />
              </Link>
            </div>
            
            {/* Middle Cards */}
            <div className="bg-white p-6 rounded-lg shadow-md px-4 my-4">
              <h2 className="text-lg font-semibold mb-4">More Features</h2>
              <div className="grid grid-cols-4 gap-6">
                <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <FaChargingStation className="text-4xl text-purple-500" />
                  <p className="text-sm">충전소</p>
                </Link>
                <Link to="/map" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <FaMap className="text-4xl text-indigo-500" />
                  <p className="text-sm">지도</p>
                </Link>
                <Link to="/add-vehicle" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoFlashSharp className="text-4xl text-blue-500" />
                  <p className="text-sm">차량추가</p>
                </Link>
                <Link to="/mypage" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoPerson className="text-4xl text-green-500" />
                  <p className="text-sm">마이페이지</p>
                </Link>
                <Link to="/search" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoSearch className="text-4xl text-yellow-500" />
                  <p className="text-sm">검색</p>
                </Link>
                <Link to="/gift" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoGiftSharp className="text-4xl text-gray-500" />
                  <p className="text-sm">선물하기</p>
                </Link>
                <Link to="/events" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoRibbonSharp className="text-4xl text-red-500" />
                  <p className="text-sm">이벤트</p>
                </Link>
                <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoCalendarNumberSharp className="text-4xl text-sky-500" />
                  <p className="text-sm">출석체크</p>
                </Link>
                <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoBatteryChargingSharp className="text-4xl text-rose-500" />
                  <p className="text-sm">요금정보</p>
                </Link>
                <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoQrCodeOutline className="text-4xl text-lime-500" />
                  <p className="text-sm">QR</p>
                </Link>
                <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoRocketSharp className="text-4xl text-emerald-500" />
                  <p className="text-sm">게임</p>
                </Link>
                <Link to="/attendance" className="flex flex-col items-center text-center space-y-2 transition transform hover:scale-105">
                  <IoSettings className="text-4xl text-cyan-500" />
                  <p className="text-sm">설정</p>
                </Link>
              </div>
            </div>
          </div>
         </div>
         <div className="foot_area">
            <button
              aria-label="Home"
              className="flex-1"
              onClick={() => handleIconClick('home', '/')}
            >
              <div className="flex flex-col items-center justify-center">
                {activeIcon === 'home' ? <IoHomeSharp className="text-indigo-500 text-xl" /> : <IoHomeOutline className="text-white text-xl" />}
                {/*<span className="text-white text-[12px]">홈</span>*/}
              </div>
            </button>
            <button
              aria-label="News"
              className="flex-1"
              onClick={() => handleIconClick('news', '/news')}
            >
              <div className="flex flex-col items-center justify-center">
                {activeIcon === 'news' ? <IoNewspaper className="text-indigo-500 text-xl" /> : <IoNewspaperOutline className="text-white text-xl" />}
                {/*<span className="text-white text-[12px]">뉴스</span>*/}
              </div>
            </button>
            <button
              aria-label="Announcements"
              className="flex-1"
              onClick={() => handleIconClick('announcements', '/announcements')}
            >
              <div className="flex flex-col items-center justify-center">
                {activeIcon === 'announcements' ? <IoToday className="text-indigo-500 text-xl" /> : <IoTodayOutline className="text-white text-xl" />}
                {/*<span className="text-white text-[12px]">공고</span>*/}
              </div>
            </button>
            <button
              aria-label="Bookmark"
              className="flex-1"
              onClick={() => handleIconClick('bookmarks', '/bookmarks')}
            >
              <div className="flex flex-col items-center justify-center">
                {activeIcon === 'bookmarks' ? <IoBookmark className="text-indigo-500 text-xl" /> : <IoBookmarkOutline className="text-white text-xl" />}
                {/*<span className="text-white text-[12px]">북마크</span>*/}
              </div>
            </button>
            <button
              aria-label="Profile"
              className="flex-1"
              onClick={() => handleIconClick('my-page', '/my-page')}
            >
              <div className="flex flex-col items-center justify-center">
                {activeIcon === 'my-page' ? <IoPersonSharp className="text-indigo-500 text-xl" /> : <IoPersonOutline className="text-white text-xl" />}
                {/*<span className="text-white text-[12px]">내 정보</span>*/}
              </div>
            </button>
        </div>
       </div>
       <div className="modal_area">
         <div className="dim"></div>
         <div className="modal_area_container sm" data-openWindow="1">
           <button className="btn_c" data-closeModal>모달닫기</button>
         </div>
         <div className="modal_area_container md" data-openWindow="2">
           <button className="btn_c" data-closeModal>모달닫기</button>
         </div>
         <div className="modal_area_container full" data-openWindow="3">
           <button className="btn_c" data-closeModal>모달닫기</button>
         </div>
       </div>
     </div>

    // 풀화면인 경우 공통레이아웃 
//    <div className="window_page">
//    <h1 className="sr-only">EV Trend</h1>
//    <div className="wrap">
//      
//      {/* headcomponent */}
//      {/* <div className="head_area">
//        <div className="head_area_controler">
//          <h2 className="logo"><img src="/src/assets/images/logo_black_bg.png" alt="" /></h2>
//          <button data-srch>뉴스검색</button>
//          <button data-openGnb>gnb열기</button>
//        </div>
//        <ul className="head_area_gnb">
//          <li><a href="#none">menu1</a></li>
//          <li><a href="#none">menu2</a></li>
//          <li><a href="#none">menu3</a></li>
//        </ul>
//      </div> */}
//
//      <div className="cover_area stage">
//        <button className="btn_open_modal" data-openModal="1">팝업오픈</button>
//        <button className="btn_open_modal" data-openModal="2">팝업오픈</button>
//        <button className="btn_open_modal" data-openModal="3">팝업오픈</button>
//        길다길다길어길다길
//      </div>
//      {/* footcomponent */}
//      {/* <div className="foot_area"></div> */}
//    </div>
//    <div className="modal_area">
//      <div className="dim"></div>
//      <div className="modal_area_container sm" data-openWindow="1">
//        <button className="btn_c" data-closeModal>모달닫기</button>
//      </div>
//      <div className="modal_area_container md" data-openWindow="2">
//        <button className="btn_c" data-closeModal>모달닫기</button>
//      </div>
//      <div className="modal_area_container full" data-openWindow="3">
//        <button className="btn_c" data-closeModal>모달닫기</button>
//      </div>
//    </div>
//  </div>
  );
};

export default WindowPage;
