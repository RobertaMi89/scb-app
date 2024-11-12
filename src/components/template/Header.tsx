import { useContacts } from "../../context/ContactsContext";
import { Contact } from "../../types/Contact";
import LanguageSwitcher from "../atoms/LanguageSwitcher";
import AddContact from "../molecules/AddContact";
import SearchBar from "../molecules/SearchBar";

function Header() {
    const { contacts, setFilteredContacts } = useContacts();

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
                <AddContact />
            </div>


        </>
    )
}

export default Header


