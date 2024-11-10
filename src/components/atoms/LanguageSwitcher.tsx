import { useTranslation } from "react-i18next";
import Italy from "../../assets/italy.svg"
import UK from "../../assets/uk.svg"

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="relative">
            {t("footer.languages")}
            <select
                onChange={(e) => handleLanguageChange(e.target.value)}
                value={i18n.language}
                className=" bg-transparent border-0 p-0 pr-2 focus:outline-none text-lg text-gray-900 dark:text-white"
            >
                <option value="it" className="flex items-center">
                    <button>
                        <img src={Italy} alt="Italiano" className="w-30 h-30" />
                    </button>
                </option>
                <option value="en" className="flex items-center">
                    <button aria-label="English">
                        <img src={UK} alt="English" className="w-30 h-30" />
                    </button>
                </option>
            </select>
        </div >
    );
};

export default LanguageSwitcher;
