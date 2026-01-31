import { useEffect, useState } from 'react';
import './HomeCarousel.css';

const mockData = [
  {
    name: 'HRS Korea',
    img: null,
    companySize: 'mid-sized company',
    numberOfEmployees: '822명',
  },
  {
    name: 'SPC 삼립',
    img: null,
    companySize: 'mid-sized company',
    numberOfEmployees: 'null',
  },
];

const HomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mockData.length <= 1) return;

    const intervalId = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % mockData.length);
    }, 3000); // 3초마다 자동 전환

    return () => clearInterval(intervalId);
  }, []);

  const item = mockData[activeIndex];

  return (
    <section className="home-carousel">
      <div className="home-carousel_inner">
        <div className="home-carouse_badge">추천 기업</div>
        <div
          key={item.name}
          className="home-carousel_card home-carousel_card--slide"
        >
          <div className="home-carousel_image">
            {item.img ? (
              <img src={item.img} alt={item.name} />
            ) : (
              <div className="home-carousel_image--placeholder">
                {item.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="home-carousel_content">
            <h2 className="home-carousel_name">{item.name}</h2>
            <p className="home-carousel_meta">
              <span>{item.companySize}</span>
              <span className="home-carousel_dot">•</span>
              <span>{item.numberOfEmployees}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCarousel;


