import { useView } from '../../context/ViewContext';
import ContactList from './ContactList';
import Favorites from './Favorites';
import { Views } from '../../context/ViewContext';
interface ViewProps {
    className?: string;
}
const View: React.FC<ViewProps> = ({ className }) => {
    const { view } = useView();

    return (
        <>
            <div className={`${className}`}>
                <div className={`${className} flex flex-col flex-grow min-w-0 max-h-[calc(100vh-9.4rem)] h-[calc(100vh-9.4rem)] dark:bg-gray-700 bg-gray-50 overflow-auto border border-e-gray-200 scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:flex md:min-w-[calc(100vw-60rem)]`}>
                    <ContactList show={view === Views.CONTACTS} />
                    <Favorites show={view === Views.FAVORITES} />
                </div>
            </div>
        </>
    );
};

export default View;
