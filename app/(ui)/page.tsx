import Footer from '@/components/home/Footer';
import Hero from '@/components/home/Hero';
import ProductItems from '@/components/product/ProductItems';
import CategoriesItem from '@/components/product/CategoriesItems';
import ClientSection from '@/components/home/ClientSection';
import ChatBox from '@/components/ChatBox';
// import NewsLetterSection from '@/components/home/NewsLetterSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <CategoriesItem />
      <ProductItems />
      <ClientSection />
      <ChatBox />
      {/* <NewsLetterSection /> */}
      <Footer />
    </>
  );
};

export default HomePage;
