import React from "react";
import { useToast } from "../../context/ToastContext";

const Toast: React.FC = () => {
    const { toastMessage, toastType } = useToast();

    if (!toastMessage) return null;

    return (
        <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg text-white 
            ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            role="alert"
            aria-live="assertive"
        >
            <span>{toastMessage}</span>
        </div>
    );
};

export default Toast;
