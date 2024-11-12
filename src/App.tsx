import { Route, Routes, useLocation } from 'react-router-dom';
import Header from "./components/template/Header";
import ContactList from "./components/organisms/ContactList";
import Footer from "./components/template/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import ContactDetailPage from './components/pages/ContactDetailPage';
import { ContactsProvider } from './context/ContactsContext';
import Favorites from './components/pages/FavoritesPage';

function App() {

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/contact/");

  return (
    <div className="flex flex-col min-h-screen">
      <LanguageProvider>
        <ContactsProvider>
          {!isDetailPage && <Header />}
          <Routes>
            <Route path="/contact/:id" element={<ContactDetailPage />} />
            <Route path="/" element={<ContactList />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          {!isDetailPage && <Footer />}
        </ContactsProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
