import LanguageSwitcher from "../atoms/LanguageSwitcher";
import AddContact from "../molecules/AddContact";
import SearchBar from "../molecules/SearchBar";

function Header() {
    return (
        <>
            <div className="flex items-center mt-3">
                <SearchBar />
                <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-center m-2">
                <AddContact />
            </div>
        </>
    )
}

export default Header
