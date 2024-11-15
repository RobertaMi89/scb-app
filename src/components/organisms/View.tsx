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
            <div className={className}>
                <div className="md:hidden flex flex-col max-h-[calc(100vh-9.5rem)] h-[calc(100vh-9.5rem)]">

                    <ContactList show={view === Views.CONTACTS} />
                    <Favorites show={view === Views.FAVORITES} />
                </div>

                <div className="hidden md:flex flex-col min-w-96 max-w-md max-h-[calc(100vh-9.4rem)] h-[calc(100vh-9.4rem)] bg-gray-50 border border-e-gray-200 scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    <ContactList show={view === Views.CONTACTS} />
                    <Favorites show={view === Views.FAVORITES} />
                </div>
            </div>
        </>
    );
};

export default View;
