import MainLayout from '../layouts/MainLayout';
import HomeCarousel from '../components/HomeCarousel';
import ServiceGuide from '../components/ServiceGuide';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <MainLayout>
        <HomeCarousel />
        <ServiceGuide />
      </MainLayout>
      <Footer />
    </>
  );
};

export default Home;