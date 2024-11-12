import { useTranslation } from "react-i18next";

interface DropdownItemProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const DropdownItem = ({ label, onClick, disabled = false }: DropdownItemProps) => {
    const { t } = useTranslation();

    return (
        <li role="none">
            <button
                onClick={onClick}
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                disabled={disabled}
                aria-disabled={disabled}
                aria-label={disabled ? t('button_disabled') : undefined}
            >
                {label}
            </button>
        </li>
    );
};

export default DropdownItem;
