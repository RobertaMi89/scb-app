import { useTranslation } from "react-i18next";

interface SearchInputProps {
    type: string
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ placeholder, value, onChange, type }: SearchInputProps) => {
    const { t } = useTranslation();

    return (
        <div className="relative w-full">
            <input
                type={type}
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-200 rounded-e-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-400 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-950 dark:text-gray-950 dark:focus:border-blue-500"
                placeholder={t(placeholder)}
                aria-label={t('search_input_label')}
                value={value}
                onChange={onChange}
            />

        </div>
    );
}

export default SearchInput;
