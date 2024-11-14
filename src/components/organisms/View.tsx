import { useView } from '../../context/ViewContext';
import ContactList from './ContactList';
import Favorites from './Favorites';
import { Views } from '../../context/ViewContext';


const View: React.FC = () => {
    const { view } = useView();
    return (
        <>
            <ContactList show={view === Views.CONTACTS} />
            <Favorites show={view === Views.FAVORITES} />
        </>
    );
};

export default View;
