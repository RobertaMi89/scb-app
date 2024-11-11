import { useTranslation } from "react-i18next";
import Select, { SingleValue } from "react-select";
import Italy from "../../assets/italy.svg";
import UK from "../../assets/uk.svg";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (selectedOption: SingleValue<{ value: string; label: JSX.Element }>) => {
        if (selectedOption) {
            i18n.changeLanguage(selectedOption.value);
        }
    };

    const options = [
        { value: "it", label: <span><img src={Italy} alt="Italiano" className="w-6 h-6 mr-2" /> </span> },
        { value: "en", label: <span><img src={UK} alt="English" className="w-6 h-6 mr-2" /> </span> }
    ];

    return (
        <div className="relative">
            <Select
                options={options}
                defaultValue={options.find(option => option.value === i18n.language)}
                onChange={handleLanguageChange}
                className="custom-select w-10 bg-transparent"
                styles={{
                    control: (provided) => ({
                        ...provided,
                        border: 'none',
                        boxShadow: 'none',
                        backgroundColor: 'transparent',
                        minHeight: 'auto',
                        cursor: 'pointer',
                    }),
                    valueContainer: (provided) => ({
                        ...provided,
                        padding: '0',

                    }),
                    indicatorsContainer: () => ({
                        display: 'none',

                    }),
                }}
            />
        </div>
    );
};

export default LanguageSwitcher;
