import { useLocation } from "react-router-dom";
import { useContacts } from "../../context/ContactsContext";
import { Contact } from "../../types/Contact";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../atoms/LanguageSwitcher";
import AddContact from "../molecules/AddContact";
import SearchBar from "../molecules/SearchBar";

function Header() {
    const { contacts, setFilteredContacts } = useContacts();
    const location = useLocation();
    const { t } = useTranslation();

    const shouldHideAddContact = location.pathname === "/favorites";

    const handleSearch = (filtered: Contact[]) => {
        setFilteredContacts(filtered);
    };

    return (
        <>
            <div className="flex items-center mt-3" role="banner">
                <SearchBar
                    onSearch={handleSearch}
                    contacts={contacts}
                    aria-label={t("searchBar.search")} />
                <LanguageSwitcher aria-label={t("change.language")} />
            </div>
            <div className="flex items-center justify-center m-2">
                {!shouldHideAddContact && <AddContact aria-label={t("addContact.create")} />}
            </div>
        </>
    )
}

export default Header


