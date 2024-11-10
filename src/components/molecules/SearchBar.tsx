import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import Dropdown from "../atoms/DropDown";
import DropdownItem from "../atoms/DropdownItem";
import SearchInput from "../atoms/SearchInput";

function SearchBar() {
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <>
            <form className="max-w-lg mx-auto">
                <div className="flex relative">

                    <Button
                        onClick={toggleDropdown}
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                    >
                        {t("searchBar.filter")}
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </Button>


                    <Dropdown isOpen={isDropdownOpen}>
                        <DropdownItem label="Mockups" onClick={() => alert('Mockups clicked')} />
                        <DropdownItem label="Templates" onClick={() => alert('Templates clicked')} />
                        <DropdownItem label="Design" onClick={() => alert('Design clicked')} />
                        <DropdownItem label="Logos" onClick={() => alert('Logos clicked')} />
                    </Dropdown>


                    <SearchInput placeholder={t("searchBar.search")} />
                </div>
            </form>


        </>
    );
}

export default SearchBar;
