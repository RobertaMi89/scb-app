import { useContacts } from "../../context/ContactsContext";
import { Contact } from "../../types/Contact";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../atoms/LanguageSwitcher";
import SearchBar from "../molecules/SearchBar";


function Header({ className }: { className?: string }) {
    const { contacts, setFilteredContacts } = useContacts();
    const { t } = useTranslation();

    const handleSearch = (filtered: Contact[]) => {
        setFilteredContacts(filtered);
    };

    return (
        <>
            <div className={className}>
                <div className="flex items-center justify-between p-3 bg-gray-100 border border-b-gray-200  dark:bg-gray-800" role="banner">
                    <div></div>
                    <SearchBar
                        onSearch={handleSearch}
                        contacts={contacts}
                        aria-label={t("searchBar.search")} />
                    <LanguageSwitcher aria-label={t("change.language")} />
                </div>
            </div>
        </>
    )
}

export default Header


