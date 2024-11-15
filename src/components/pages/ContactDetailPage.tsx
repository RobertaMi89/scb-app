import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Contact } from "../../types/Contact";
import { useToast } from "../../context/ToastContext";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import ContactAvatar from "../atoms/ContactAvatar";
import Loading from "../atoms/Loading";
import { useContacts } from "../../context/ContactsContext";
import { useView } from "../../context/ViewContext";
import { useNavigate } from "react-router-dom";

const ContactDetailPage = () => {
    const navigate = useNavigate()
    const { contacts, deleteContact } = useContacts();
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [contact, setContact] = useState<Contact | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { isMobile } = useView();
    const { showToast } = useToast();

    useEffect(() => {
        if (id) {
            const contactData = contacts.find((contact) => contact.id.toString() === id);
            if (!contactData) return;
            setContact(contactData);
        }
    }, [contacts, id]);

    const handleDeleteContact = () => {
        if (id) {
            deleteContact(id).then((isDeleted) => {
                if (isDeleted) {
                    handleCloseConfirmModal()
                    handleCloseEditModal()
                    navigate('/')
                    showToast(t("contactDetailPage.deleteSuccess"), "success");
                } else {
                    setError(t("contactDetailPage.deleteError"));
                    console.error("Error deleting contact:", error);
                    showToast(t("contactDetailPage.deleteError"), "error");
                }
                setIsConfirmModalOpen(false);
            });
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                showToast(t('contactDetailPage.copy'), 'success')
                console.log("Testo copiato negli appunti!");
            })
            .catch((err) => console.error("Errore nel copiare il testo: ", err));
    };

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleOpenConfirmDeleteModal = () => {
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    if (!contact) {
        return <Loading />;
    }

    return (
        <>
            <div className={`mx-auto ${isMobile ? '' : 'max-w-[75%] w-96'} rounded-lg  overflow-y-auto`}>
                <div className="flex items-center justify-start">
                    <Link
                        to="/"
                        className="absolute top-4 left-4 z-10 text-gray-600 hover:text-gray-800"
                        aria-label={t("backToHome")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className={`w-8 h-8 ${isMobile ? '' : 'hidden'}`} aria-label={t("backToHomeAlt")}>
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    <ContactAvatar name={`${contact.name} ${contact.surname}`} image={contact.image} className={`w-full h-52 text-6xl ${isMobile ? 'rounded-none' : 'rounded-none rounded-b-lg'}`} />
                </div>
                <div className={`space-y-4  flex justify-center ${isMobile ? 'h-[calc(100vh-18rem)] w-[100%] p-2' : ' max-w-96 max-h-80'}`}>
                    <ul className={`space-y-2 bg-gray-100 rounded-lg h-fit mt-10 p-10 shadow-md shadow-gray-300 2xl:w-[70%] ${isMobile ? 'w-[90%]' : 'w-[100%]'}`}>
                        <li className="flex justify-between">
                            <div className="text-lg font-semibold  max-w-[85%]">
                                {t("contact.name")}: <div className="text-gray-700 font-normal">{contact.name}</div>
                            </div>
                        </li>
                        <li className="flex justify-between">
                            <div className="text-lg font-semibold  max-w-[85%]">
                                {t("contact.surname")}: <div className="text-gray-700 font-normal">{contact.surname}</div>
                            </div>
                        </li>
                        <li className="flex justify-between items-center">
                            <div className="text-lg font-semibold  max-w-[85%]">
                                {t("contact.tel")}: <div className="text-gray-700 break-words font-normal">{contact.phone}</div>
                            </div>
                            <button
                                onClick={() => handleCopy(contact.phone)}
                                className="px-2 py-2 text-black rounded-full hover:bg-gray-200 transition duration-200 h-10"
                                aria-label={t("copyPhone")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                </svg>
                            </button>
                        </li>
                        <li className="flex justify-between items-center">
                            <div className="text-lg font-semibold max-w-[85%]">
                                {t("contact.email")}: <div className="text-gray-700 break-words font-normal">{contact.email}</div>
                            </div>
                            <button
                                onClick={() => handleCopy(contact.email)}
                                className="px-2 py-2 text-black rounded-full hover:bg-gray-200 transition duration-200 h-10"
                                aria-label={t("copyEmail")}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <div className={`flex justify-center items-center space-x-4 ${isMobile ? 'hidden bg-gray-50 border border-t-gray-200 h-20' : 'mt-5'}`}>
                                <Button
                                    onClick={handleOpenEditModal}
                                    className="px-6 py-2 flex flex-col items-center text-black rounded-full hover:bg-gray-200 transition duration-200"
                                    aria-label={t("contactDetailPage.edit")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: "#3b82f6" }} strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>

                                    {t("contactDetailPage.edit")}
                                </Button>
                                <Button
                                    onClick={handleOpenConfirmDeleteModal}
                                    className="px-6 py-2 flex flex-col items-center text-black rounded-full hover:bg-gray-200 transition duration-200"
                                    aria-label={t("contactDetailPage.delete")}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: "#dc2626" }} strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                    {t("contactDetailPage.delete")}
                                </Button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={`flex justify-center items-center space-x-4 ${isMobile ? 'bg-gray-50 border border-t-gray-200 h-20' : 'mt-5 hidden'}`}>
                    <Button
                        onClick={handleOpenEditModal}
                        className="px-6 py-2 flex flex-col items-center text-black rounded-full hover:bg-gray-100 transition duration-200"
                        aria-label={t("contactDetailPage.edit")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: "#3b82f6" }} strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        {t("contactDetailPage.edit")}
                    </Button>
                    <Button
                        onClick={handleOpenConfirmDeleteModal}
                        className="px-6 py-2 flex flex-col items-center text-black rounded-full hover:bg-gray-100 transition duration-200"
                        aria-label={t("contactDetailPage.delete")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: "#dc2626" }} strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>

                        {t("contactDetailPage.delete")}
                    </Button>
                </div>
                {isEditModalOpen && (
                    <Modal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        title={t("contactDetailPage.edit")}
                        contact={contact}
                    />
                )}
            </div>

            {/*modale per conferma di eliminazione contatto*/}
            {isConfirmModalOpen && (
                <div
                    id="popup-modal"
                    role="dialog"
                    aria-labelledby="confirmDeleteTitle"
                    aria-describedby="confirmDeleteDescription"
                    className="fixed top-0 left-0 z-40 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
                >
                    <div className={`relative p-4 w-full max-w-md bg-white shadow dark:bg-gray-700 ${isMobile ? '' : 'rounded-lg'}`}>
                        <button
                            type="button"
                            onClick={handleCloseConfirmModal}
                            aria-label={t("contactDetailPage.closeModal")}
                            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <span aria-hidden="true" className="text-2xl">&times;</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <h3
                                id="confirmDeleteTitle"
                                className="mb-5 text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                {t("contactDetailPage.confirmDeleteTitle")}
                            </h3>
                            <p
                                id="confirmDeleteDescription"
                                className="mb-5 text-base text-gray-500 dark:text-gray-400"
                            >
                                {t("contactDetailPage.confirmDeleteMessage")}
                            </p>
                            <button
                                onClick={handleDeleteContact}
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
                                aria-label={t("contactDetailPage.confirmYes")}
                            >
                                {t("contactDetailPage.confirmYes")}
                            </button>
                            <button
                                onClick={handleCloseConfirmModal}
                                type="button"
                                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                                aria-label={t("contactDetailPage.confirmNo")}
                            >
                                {t("contactDetailPage.confirmNo")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ContactDetailPage;
