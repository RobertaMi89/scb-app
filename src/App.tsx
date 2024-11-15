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
import detailBg from './assets/bg.svg'

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isMobile } = useView();
  const [isDetailPage, setIsDetailPage] = useState<boolean>(false);

  useEffect(() => {
    setIsDetailPage(location.pathname.startsWith("/contact/"));
  }, [location.pathname]);


  return (
    <div className="min-h-screen flex flex-col ">
      <ToastProvider>
        <LanguageProvider>
          <ContactsProvider>
            <Toast />
            <div className="flex flex-col flex-1 overflow-hidden">
              {((!isDetailPage && isMobile) || !isMobile) && <Header aria-label={t("header.navigation")} className="basis-[16.6666%] flex-shrink-0" />}

              <div className={`${isMobile ? '' : `flex flex-row`}`}>
                <View className={`flex-grow overflow-auto ${isMobile ? '' : 'max-w-fit'} ${((!isDetailPage && isMobile) || !isMobile) ? '' : 'hidden'}`} />

                <div className={`${isMobile ? '' : 'w-[69%] min-h-[100%] flex justify-center'}`} style={{ backgroundImage: `url(${detailBg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                  <Routes>
                    <Route path="/" element={<Outlet />} />
                    <Route path="/contact/:id" element={<ContactDetailPage />} />
                  </Routes>
                </div>

              </div>
              {((!isDetailPage && isMobile) || !isMobile) && <Footer aria-label={t("footer.navigation")} className="basis-[16.6666%]  flex-shrink-0" />}
            </div>
          </ContactsProvider>
        </LanguageProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
