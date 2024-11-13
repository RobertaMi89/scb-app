import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Contact } from "../../types/Contact";
import { useToast } from "../../context/ToastContext";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import ContactAvatar from "../atoms/ContactAvatar";
import arrowBackToHome from "../../assets/arrow.svg";
import Loading from "../atoms/Loading";
import ErrorHandler from "../atoms/ErrorHandler";
import { useContacts } from "../../context/ContactsContext";

const ContactDetailPage = () => {
    const { contacts, deleteContact } = useContacts();
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contact, setContact] = useState<Contact | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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
                    navigate("/contacts");
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

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleOpenConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    if (error) {
        return <ErrorHandler message={error} />;
    }

    if (!contact) {
        return <Loading />;
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg space-y-6">
                <div className="flex items-center justify-start p-2">
                    <Link
                        to="/"
                        className="text-gray-600 hover:text-gray-800"
                        aria-label={t("backToHome")}>
                        <img src={arrowBackToHome} alt={t("backToHomeAlt")} className="w-6 h-6" />
                    </Link>
                </div>
                <div className="relative flex justify-center">
                    <ContactAvatar name={`${contact.name} ${contact.surname}`} image={contact.image} className="w-36 h-36 text-6xl " />
                </div>
                <div className="space-y-4 text-center">
                    <p className="text-lg font-semibold">{t("contact.name")}: <span className="text-gray-700">{contact.name}</span></p>
                    <p className="text-lg font-semibold">{t("contact.surname")}: <span className="text-gray-700">{contact.surname}</span></p>
                    <p className="text-lg font-semibold">{t("contact.tel")}: <span className="text-gray-700">{contact.phone}</span></p>
                    <p className="text-lg font-semibold">{t("contact.email")}: <span className="text-gray-700">{contact.email}</span></p>
                </div>
                <div className="flex justify-center space-x-4">
                    <Button
                        onClick={handleOpenEditModal}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                        aria-label={t("contactDetailPage.edit")}
                    >
                        {t("contactDetailPage.edit")}
                    </Button>
                    <Button
                        onClick={handleOpenConfirmModal}
                        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                        aria-label={t("contactDetailPage.delete")}
                    >
                        {t("contactDetailPage.delete")}
                    </Button>
                </div>
                {isEditModalOpen && (
                    <Modal
                        isOpen={isEditModalOpen}
                        onClose={handleCloseEditModal}
                        title={t("contactDetailPage.edit")}
                        message={{
                            close: t("contact.close"),
                            save: t("addContact.save"),
                        }}
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
                    className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            onClick={handleCloseConfirmModal}
                            aria-label={t("contactDetailPage.closeModal")}
                            className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <span aria-hidden="true">&times;</span>
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
