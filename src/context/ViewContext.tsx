import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export enum Views {
    FAVORITES = "FAVORITES",
    CONTACTS = "CONTACTS"
}

interface ViewContextType {
    view: Views | null;
    setView: (view: Views) => void
    setIsDetailPageOpen: (isOpen: boolean) => void
    isMobile: boolean;
    isDetailPageOpen: boolean;

}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const useView = (): ViewContextType => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useView must be used within a ViewProvider");
    }
    return context;
};

interface ViewProviderProps {
    children: ReactNode;
}

export const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
    const [view, setView] = useState<Views | null>(Views.CONTACTS);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isDetailPageOpen, setIsDetailPageOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <ViewContext.Provider value={{ view, setView, isMobile, isDetailPageOpen, setIsDetailPageOpen }}>
            {children}
        </ViewContext.Provider>
    );
};
