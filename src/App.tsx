import { Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from "./context/LanguageContext";
import { ContactsProvider } from './context/ContactsContext';
import { useTranslation } from 'react-i18next';
import Header from "./components/template/Header";
import ContactList from "./components/organisms/ContactList";
import Footer from "./components/template/Footer";
import ContactDetailPage from './components/pages/ContactDetailPage';
import Favorites from './components/pages/FavoritesPage';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/atoms/Toast';

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/contact/");

  return (
    <div className="flex flex-col min-h-screen">
      <ToastProvider>
        <LanguageProvider>
          <ContactsProvider>
            {!isDetailPage && <Header aria-label={t("header.navigation")} />}
            <Toast />
            <Routes>
              <Route path="/contact/:id" element={<ContactDetailPage />} />
              <Route path="/" element={<ContactList />} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
            {!isDetailPage && <Footer aria-label={t("footer.navigation")} />}
          </ContactsProvider>
        </LanguageProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
