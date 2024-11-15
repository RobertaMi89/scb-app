import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import Italy from "../../assets/italy.svg";
import UK from "../../assets/uk.svg";
import Loading from "./Loading";

const LanguageSwitcher = () => {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [languageLoaded, setLanguageLoaded] = useState(false);

    useEffect(() => {
        setLanguageLoaded(true);
    }, [i18n.language]);

    const handleLanguageChange = (selectedOption: SingleValue<{ value: string; label: JSX.Element }>) => {
        if (selectedOption) {
            i18n.changeLanguage(selectedOption.value);
            setIsMenuOpen(false);
        }
    };

    const options = [
        { value: "it-IT", label: <img src={Italy} alt={t('italian_flag')} className="w-6 h-6 mr-2" /> },
        { value: "en-EN", label: <img src={UK} alt={t('british_flag')} className="w-6 h-6 mr-2" /> }
    ];

    if (!languageLoaded) {
        return <Loading />
    }

    return (
        <div className="relative me-2 focus:outline-none">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center focus:outline-none"
                aria-label={t(i18n.language === "it-IT" ? 'switch_to_english' : 'switch_to_italian')}
                aria-haspopup="listbox"
            >
                <img
                    src={i18n.language === "it-IT" ? Italy : UK}
                    alt={i18n.language === "it-IT" ? t('italian_flag') : t('british_flag')}
                    className="w-6 h-6"
                />
            </button>

            {isMenuOpen && (
                <div className="absolute top-full w-10 right-0 mt-2 z-10">
                    <Select
                        options={options}
                        onChange={handleLanguageChange}
                        className="custom-select"
                        menuIsOpen={true}
                        menuPlacement="bottom"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                border: 'none',
                                boxShadow: 'none',
                                backgroundColor: 'transparent',
                                minHeight: 'auto',
                                cursor: 'pointer',
                            }),
                            menu: (provided) => ({
                                ...provided,
                                right: 0,
                                left: 'auto',
                                transform: 'translateX(18%)',
                                width: 'auto',
                                margin: 0
                            }),
                            valueContainer: () => ({
                                display: 'none',
                            }),
                            indicatorsContainer: () => ({
                                display: 'none',
                            }),
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
