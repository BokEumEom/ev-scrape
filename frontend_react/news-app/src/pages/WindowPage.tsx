import React, { useEffect } from 'react';
import '../styles/WindowPage.css';

const WindowPage: React.FC = () => {
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
    // <div className="window_page">
    //   <h1 className="sr-only">EV Trend</h1>
    //   <div className="wrap">
    //     <div className="head_area">
    //       <div className="head_area_controler">
    //         <h2 className="logo"><img src="/src/assets/images/logo_black_bg.png" alt="" /></h2>
    //         <button data-srch>뉴스검색</button>
    //         <button data-openGnb>gnb열기</button>
    //       </div>
    //       <ul className="head_area_gnb">
    //         <li><a href="#none">menu1</a></li>
    //         <li><a href="#none">menu2</a></li>
    //         <li><a href="#none">menu3</a></li>
    //       </ul>
    //     </div>
    //     <div className="cover_area">
    //       <button className="btn_open_modal" data-openModal="1">팝업오픈</button>
    //       <button className="btn_open_modal" data-openModal="2">팝업오픈</button>
    //       <button className="btn_open_modal" data-openModal="3">팝업오픈</button>
    //       길다길다길어길다길
    //     </div>
    //     <div className="foot_area"></div>
    //   </div>
    //   <div className="modal_area">
    //     <div className="dim"></div>
    //     <div className="modal_area_container sm" data-openWindow="1">
    //       <button className="btn_c" data-closeModal>모달닫기</button>
    //     </div>
    //     <div className="modal_area_container md" data-openWindow="2">
    //       <button className="btn_c" data-closeModal>모달닫기</button>
    //     </div>
    //     <div className="modal_area_container full" data-openWindow="3">
    //       <button className="btn_c" data-closeModal>모달닫기</button>
    //     </div>
    //   </div>
    // </div>

    // 풀화면인 경우 공통레이아웃 
    <div className="window_page">
    <h1 className="sr-only">EV Trend</h1>
    <div className="wrap">
      
      {/* headcomponent */}
      {/* <div className="head_area">
        <div className="head_area_controler">
          <h2 className="logo"><img src="/src/assets/images/logo_black_bg.png" alt="" /></h2>
          <button data-srch>뉴스검색</button>
          <button data-openGnb>gnb열기</button>
        </div>
        <ul className="head_area_gnb">
          <li><a href="#none">menu1</a></li>
          <li><a href="#none">menu2</a></li>
          <li><a href="#none">menu3</a></li>
        </ul>
      </div> */}

      <div className="cover_area stage">
        <button className="btn_open_modal" data-openModal="1">팝업오픈</button>
        <button className="btn_open_modal" data-openModal="2">팝업오픈</button>
        <button className="btn_open_modal" data-openModal="3">팝업오픈</button>
        길다길다길어길다길
      </div>
      {/* footcomponent */}
      {/* <div className="foot_area"></div> */}
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
  );
};

export default WindowPage;
