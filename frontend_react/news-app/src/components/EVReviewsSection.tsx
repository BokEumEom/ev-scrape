// src/components/EVReviewsSection.tsx
import React from 'react';
import Slider from 'react-slick';

const EVReviewsSection = () => {
  const settings = {
    dots: true,        // Shows dot indicators at the bottom of the slider
    infinite: true,    // Infinite looping
    speed: 3000,        // Animation speed
    slidesToShow: 3,   // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true,    // Auto-play the slides
    autoplaySpeed: 2000, // Speed at which auto-play proceeds
    responsive: [      // Making the slider responsive
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Placeholder data
  const reviews = [
    {
      id: 1,
      model: "Tesla Model Y",
      review: "The Tesla Model Y is an all-around fantastic electric vehicle.",
      imageUrl: "https://www.tesla.com/ownersmanual/images/GUID-1F2D8746-336F-4CF9-9A04-F35E960F31FE-online-en-US.png",
      link: "https://www.tesla.com/modely"
    },
    {
      id: 2,
      model: "Hyundai IONIQ 5",
      review: "아이오닉 5만의 특별한 외관 디자인은 날렵하고 세련된 룩을 완성해 주는 깔끔하고 예리한 라인이 특징입니다.",
      imagUrl: "https://www.hyundai.com/contents/vr360/NE04/exterior/SAW/001.png",
      link: "https://www.hyundai.com/worldwide/ko/brand-journal/ioniq/ioniq5"
    },
    {
      id: 3,
      model: "BYD ATTO 3",
      review: "User-friendly functions and a playful interior give a unique and distinctive style",
      imageUrl: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130183/atto-3-exterior-right-rear-three-quarter-2.jpeg?isig=0&q=80",
      link: "https://www.byd.com/eu/car/atto3"
    },
    {
      id: 4,
      model: "Volvo EX30",
      review: "지금까지 볼보자동차 중 탄소 배출량이 가장 적은 EX30은 재생 가능한 소재와 재활용 소재를 사용하여 새로운 방식으로 제작되었습니다.",
      imageUrl: "https://www.volvocars.com/images/v/-/media/applications/pdpspecificationpage/my24/ex30-electric/reveal/ex30-electric-og.jpg?h=2520&iar=0&w=4478",
      link: "https://www.volvocars.com/kr/cars/ex30-electric/"
    },
    {
      id: 5,
      model: "Polestar 4",
      review: "쿠페의 공기역학 디자인과 SUV를 닮은 넉넉한 공간, 첨단 전기 구동 기술을 결합한 새로운 유형의 전기차.",
      imageUrl: "https://www.polestar.com/dato-assets/11286/1681978160-og-polestar-4.jpg?auto=format&w=1200&h=630&fit=crop&q=35",
      link: "https://www.polestar.com/kr/polestar-4/"
    },
  ];  

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">EV Reviews</h2>
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-4">
              <img src={review.imageUrl} alt={review.model} className="mx-auto h-48 w-auto object-cover rounded-lg" />
              <a href={review.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold hover:text-blue-600">
                {review.model}
              </a>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default EVReviewsSection;