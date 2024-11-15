import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import Dropdown from "../atoms/DropDown";
import DropdownItem from "../atoms/DropdownItem";
import SearchInput from "../atoms/SearchInput";
import { Contact } from "../../types/Contact";
import Loading from "../atoms/Loading";
import { useToast } from "../../context/ToastContext";
import { useView, Views } from "../../context/ViewContext";

interface SearchBarProps {
    onSearch: (filteredContacts: Contact[]) => void;
    contacts: Contact[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, contacts }) => {
    const { t } = useTranslation();
    const { setView, isMobile } = useView();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "surname" | "email">("name");
    const [ascending, setAscending] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownLabel, setDropdownLabel] = useState<string>(t("searchBar.sort"));
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const orderButtonRef = useRef<HTMLButtonElement | null>(null);
    const { showToast } = useToast()

    useEffect(() => {
        sortContacts(sortBy, ascending);
    }, [contacts]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value === "") {
            sortContacts(sortBy, ascending);
            onSearch(contacts);
        } else {
            setView(Views.CONTACTS)
            const filteredContacts = contacts.filter(contact =>
                contact.name.toLowerCase().includes(value.toLowerCase()) || contact.email.toLowerCase().includes(value.toLowerCase()) || contact.phone.toLowerCase().includes(value.toLowerCase())
            );
            onSearch(filteredContacts);
        }
    };

    const handleSortChange = (criteria: "name" | "surname" | "email") => {
        setSortBy(criteria);
        sortContacts(criteria, ascending);
        setDropdownLabel(t(`searchBar.sortBy${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`));
        setIsDropdownOpen(false);
    };

    const toggleAscending = () => {
        setAscending(!ascending);
        sortContacts(sortBy, !ascending);
    };

    const sortContacts = (criteria: "name" | "surname" | "email", isAscending: boolean) => {
        try {
            setIsLoading(true);
            const sortedContacts = [...contacts].sort((a, b) => {
                const fieldA = a[criteria].toLowerCase();
                const fieldB = b[criteria].toLowerCase();
                if (fieldA < fieldB) return isAscending ? -1 : 1;
                if (fieldA > fieldB) return isAscending ? 1 : -1;
                return 0;
            });
            onSearch(sortedContacts);

        } catch (err) {
            console.error(err)
            showToast(t("searchBar.sortError"), "error");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && orderButtonRef.current && !orderButtonRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    return (
        <form className="max-w-sm w-96 " onSubmit={(e) => e.preventDefault()}>
            <div className={`flex relative bg-gray-200 border rounded-full px-3 mx-2 ${isMobile ? '' : '-left-10 w-[70vh]'}`}>
                <Button ref={orderButtonRef}
                    onClick={toggleDropdown}
                    className="flex-shrink-0 border-gray-300 border-e-2 z-2 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    aria-label={t('searchBar.sort')}
                    aria-haspopup="listbox"
                >
                    {dropdownLabel}

                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </Button>

                <Dropdown isOpen={isDropdownOpen} ref={dropdownRef}>
                    <DropdownItem label={t("searchBar.sortByName")} onClick={() => handleSortChange("name")} />
                    <DropdownItem label={t("searchBar.sortBySurname")} onClick={() => handleSortChange("surname")} />
                    <DropdownItem label={t("searchBar.sortByEmail")} onClick={() => handleSortChange("email")} />
                </Dropdown>

                <SearchInput
                    type="text"
                    placeholder={t('searchBar.search')}
                    value={query}
                    onChange={handleSearch}
                    aria-label={t('searchBar.search')}
                />
                <Button
                    onClick={toggleAscending}
                    className=" m-1 py-1 rounded-md hover:bg-gray-200 flex focus:outline-none focus:ring-3 focus:ring-gray-300"
                    aria-label={ascending ? t('searchBar.ascending') : t('searchBar.descending')}
                >
                    {ascending ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={t('searchBar.ascending')} fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M2.25 4.5A.75.75 0 0 1 3 3.75h14.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm0 4.5A.75.75 0 0 1 3 8.25h9.75a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 9Zm15-.75A.75.75 0 0 1 18 9v10.19l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 1 1 1.06-1.06l2.47 2.47V9a.75.75 0 0 1 .75-.75Zm-15 5.25a.75.75 0 0 1 .75-.75h9.75a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label={t('searchBar.descending')} fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M2.25 4.5A.75.75 0 0 1 3 3.75h14.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Zm14.47 3.97a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 1 1-1.06 1.06L18 10.81V21a.75.75 0 0 1-1.5 0V10.81l-2.47 2.47a.75.75 0 1 1-1.06-1.06l3.75-3.75ZM2.25 9A.75.75 0 0 1 3 8.25h9.75a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 9Zm0 4.5a.75.75 0 0 1 .75-.75h5.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    )}
                </Button>

            </div>
            {isLoading && <Loading />}
        </form>
    );
};

export default SearchBar;
