import { useLocation } from "react-router-dom";
import { useContacts } from "../../context/ContactsContext";
import { Contact } from "../../types/Contact";
import LanguageSwitcher from "../atoms/LanguageSwitcher";
import AddContact from "../molecules/AddContact";
import SearchBar from "../molecules/SearchBar";

function Header() {
    const { contacts, setFilteredContacts } = useContacts();
    const location = useLocation();

    const shouldHideAddContact = location.pathname === "/favorites";

    const handleSearch = (filtered: Contact[]) => {
        setFilteredContacts(filtered);
    };

    return (
        <>
            <div className="flex items-center mt-3">
                <SearchBar onSearch={handleSearch} contacts={contacts} />
                <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-center m-2">
                {!shouldHideAddContact && <AddContact />}
            </div>
        </>
    )
}

export default Header


