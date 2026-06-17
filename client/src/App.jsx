import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tours from './pages/Tours';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./tailwind.css";
import DestinationDetail from './pages/DestinationDetail';
import TourDetail from './pages/TourDetail';
import ScrollToTop from './ScrollToTop';
import ScrollProgress from './ScrollProgress';
import BlogPost from './pages/BlogPost';
import BlogList from './pages/BlogList';
import Destinations from './pages/Destinations';
import BookingGuide from './pages/ BookingGuide';
import VisaInfo from './pages/VisaInfo';
import HealthSafety from './pages/HealthAndSafety';
import MediaShowcase from './pages/mediashowcase';
import DestinationAlbum from './pages/DestinationGallery';
import Chat from './pages/chat';



function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <ScrollProgress />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours/:slug" element={<TourDetail />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/booking-guide" element={<BookingGuide />} />
        <Route path="/gallery" element={<MediaShowcase />} />
        <Route path= "/gallery/:slug" element={<DestinationAlbum />}  />
        <Route path="/chat" element={<Chat />} />
        
<Route path="/visa-info" element={<VisaInfo />} />
<Route path="/healthandsafety" element={ <HealthSafety />} />

    
        <Route path="*" element={<NotFound />} />
     
  
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;