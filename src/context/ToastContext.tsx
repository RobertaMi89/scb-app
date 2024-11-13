import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextType {
    showToast: (message: string, type: 'success' | 'error', duration?: number) => void;
    hideToast: () => void;
    toastMessage: string | null;
    toastType: 'success' | 'error' | null;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

    const showToast = (message: string, type: 'success' | 'error', duration = 3000) => {
        setToastMessage(message);
        setToastType(type);

        setTimeout(() => {
            setToastMessage(null);
            setToastType(null);
        }, duration);
    };

    const hideToast = () => {
        setToastMessage(null);
        setToastType(null);
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast, toastMessage, toastType }}>
            {children}
        </ToastContext.Provider>
    );
};
