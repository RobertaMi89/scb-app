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
    <div className="min-h-screen flex flex-col ">
      <ToastProvider>
        <LanguageProvider>
          <ContactsProvider>
            <Toast />
            <div className="flex flex-col flex-1 overflow-hidden">
              {((!isDetailPage && isMobile) || !isMobile) && <Header aria-label={t("header.navigation")} className="basis-[16.6666%] flex-shrink-0" />}

              <div className={`${isMobile ? '' : `flex flex-row`}`}>
                <View className={`flex-grow overflow-auto ${isMobile ? '' : 'max-w-fit'} ${((!isDetailPage && isMobile) || !isMobile) ? '' : 'hidden'}`} />
                <Routes>
                  <Route path="/" element={<Outlet />} />
                  <Route path="/contact/:id" element={<ContactDetailPage />} />
                </Routes>

                {!isDetailPage && !isMobile && <div className='w-[69%] min-h-[100%] flex justify-center items-center'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e5e7eb" stroke="" className="h-60">
                  <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clipRule="evenodd" />
                </svg>

                </div>}
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
