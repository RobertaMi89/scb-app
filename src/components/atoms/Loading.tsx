import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div
            role="status"
            aria-live="polite"
            className="flex w-full h-full items-center justify-center my-4"
        >
            <div
                className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
                aria-hidden="true"
            ></div>
            <span className="sr-only">{t('loading')}</span>
        </div>
    );
};

export default Loading;
