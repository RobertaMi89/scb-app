import { Outlet, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from "./context/LanguageContext";
import { ContactsProvider } from './context/ContactsContext';
import { useTranslation } from 'react-i18next';
import Header from "./components/template/Header";
import Footer from "./components/template/Footer";
import ContactDetailPage from './components/pages/ContactDetailPage';
import { ToastProvider } from './context/ToastContext';
import Toast from './components/atoms/Toast';
import View from './components/organisms/View';
import detailBg from './assets/bg.svg'
import { useView } from './context/ViewContext';

function App() {
  const { t } = useTranslation();
  const { isMobile, isDetailPageOpen } = useView();

  return (
    <div className="min-h-screen flex flex-col">
      <ToastProvider>
        <LanguageProvider>
          <ContactsProvider>
            <Toast />
            <div className="flex flex-col flex-1 basis-auto overflow-hidden">
              {((!isDetailPageOpen && isMobile) || !isMobile) &&
                <Header aria-label={t("header.navigation")} className="basis-[100%] md:basis-[16.6666%] flex-shrink-0" />
              }

              <div className="flex flex-1 flex-col md:flex-row">
                <View
                  className={`flex-grow overflow-auto md:max-w-fit  ${((!isDetailPageOpen && isMobile) || !isMobile) ? '' : 'hidden'}`}
                />
                <div
                  className={`flex-1 flex justify-center`}
                  style={{
                    backgroundImage: `url(${detailBg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Outlet />} />
                    <Route path="/contact/:id" element={<ContactDetailPage />} />
                  </Routes>
                </div>
              </div>
              {((!isDetailPageOpen && isMobile) || !isMobile) && (
                <Footer aria-label={t("footer.navigation")} className="basis-[100%] md:basis-[16.6666%] flex-shrink-0" />
              )}
            </div>
          </ContactsProvider>
        </LanguageProvider>
      </ToastProvider>
    </div>

  );
}

export default App;
