import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorHandlerProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ message, onRetry }) => {
    const { t } = useTranslation();

    return (
        <div
            role="alert"
            aria-live="assertive"
            className="p-4 mb-4 text-sm text-red-800 bg-red-100 border border-red-400 rounded-lg"
        >
            <p>{message || t('error.defaultMessage')}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-2 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label={t('error.retryAriaLabel')}
                >
                    {t('error.retryButton')}
                </button>
            )}
        </div>
    );
};

export default ErrorHandler;
