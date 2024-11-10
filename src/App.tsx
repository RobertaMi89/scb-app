import { Route, Routes, useLocation } from 'react-router-dom';
import Header from "./components/template/Header";
import ContactList from "./components/organisms/ContactList";
import Footer from "./components/template/Footer";
import { LanguageProvider } from "./components/LanguageContext";
import ContactDetailPage from './components/pages/ContactDetailPage';

function App() {

  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/contact/");
  console.log("Current location:", location);


  return (
    <div className="flex flex-col min-h-screen">
      <LanguageProvider>

        {!isDetailPage && <Header />}
        <Routes>
          <Route path="/contact/:id" element={<ContactDetailPage />} />
          <Route path="/" element={<ContactList />} />
        </Routes>
        {!isDetailPage && <Footer />}

      </LanguageProvider>
    </div>
  );
}

export default App;
