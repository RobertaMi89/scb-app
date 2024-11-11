import { Route, Routes, useLocation } from 'react-router-dom';
import Header from "./components/template/Header";
import ContactList from "./components/organisms/ContactList";
import Footer from "./components/template/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import ContactDetailPage from './components/pages/ContactDetailPage';
import { FavoritesProvider } from './context/FavoritesContext';
import Favorites from './components/pages/FavoritesPage';

function App() {

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/contact/");
  console.log("Current location:", location);


  return (
    <div className="flex flex-col min-h-screen">
      <LanguageProvider>
        <FavoritesProvider>
          {!isDetailPage && <Header />}
          <Routes>
            <Route path="/contact/:id" element={<ContactDetailPage />} />
            <Route path="/" element={<ContactList />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          {!isDetailPage && <Footer />}
        </FavoritesProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
