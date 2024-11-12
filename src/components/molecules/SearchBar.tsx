import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import Dropdown from "../atoms/DropDown";
import DropdownItem from "../atoms/DropdownItem";
import SearchInput from "../atoms/SearchInput";
import { Contact } from "../../types/Contact";
import sortAsc from "../../assets/sort-az.png";
import sortDisc from "../../assets/sort-za.png";

interface SearchBarProps {
    onSearch: (filteredContacts: Contact[]) => void;
    contacts: Contact[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, contacts }) => {
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "surname" | "email">("name");
    const [ascending, setAscending] = useState(true);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

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
            const filteredContacts = contacts.filter(contact =>
                contact.name.toLowerCase().includes(value.toLowerCase())
            );
            onSearch(filteredContacts);
        }
    };

    const handleSortChange = (criteria: "name" | "surname" | "email") => {
        setSortBy(criteria);
        sortContacts(criteria, ascending);
        setIsDropdownOpen(false);
    };

    const toggleAscending = () => {
        setAscending(!ascending);
        sortContacts(sortBy, !ascending);
    };

    const sortContacts = (criteria: "name" | "surname" | "email", isAscending: boolean) => {
        const sortedContacts = [...contacts].sort((a, b) => {
            const fieldA = a[criteria].toLowerCase();
            const fieldB = b[criteria].toLowerCase();
            if (fieldA < fieldB) return isAscending ? -1 : 1;
            if (fieldA > fieldB) return isAscending ? 1 : -1;
            return 0;
        });
        onSearch(sortedContacts);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <form className="mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex relative">
                <Button
                    onClick={toggleDropdown}
                    className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                    {t("searchBar.sort")}
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
                />
                <Button
                    onClick={toggleAscending}
                    className="ml-2 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                    <img
                        src={ascending ? sortDisc : sortAsc}
                        alt={ascending ? t('searchBar.descending') : t('searchBar.ascending')}
                        className="w-5 h-5"
                    />
                </Button>
            </div>
        </form>
    );
};

export default SearchBar;
