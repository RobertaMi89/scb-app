import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from "./context/LanguageContext";
import { ContactsProvider } from './context/ContactsContext';
import { useTranslation } from 'react-i18next';
import Header from "./components/template/Header";
import Footer from "./components/template/Footer";
import ContactDetailPage from './components/pages/ContactDetailPage';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/atoms/Toast';
import { useView } from './context/ViewContext';
import View from './components/organisms/View';
import { useEffect, useState } from 'react';
function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isMobile } = useView();
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);

  useEffect(() => {
    setIsDetailPage(location.pathname.startsWith("/contact/"));
  }, [location.pathname]);


  return (
    <div className="flex flex-col min-h-screen">
      <ToastProvider>
        <LanguageProvider>
          <ContactsProvider>
            <Toast />
            {((!isDetailPage && isMobile) || !isMobile) && <Header aria-label={t("header.navigation")} />}
            <div className={isMobile ? '' : 'flex flex-row'}>
              <View />
              <Routes>
                <Route path="/" element={<Outlet />} />
                <Route path="/contact/:id" element={<ContactDetailPage />} />
              </Routes>
            </div>
            {((!isDetailPage && isMobile) || !isMobile) && <Footer aria-label={t("footer.navigation")} />}
          </ContactsProvider>
        </LanguageProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
