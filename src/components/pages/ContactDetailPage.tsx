import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Contact } from "../../types/Contact";
import Modal from "../molecules/Modal";
import Button from "../atoms/Button";
import ContactAvatar from "../atoms/ContactAvatar";
import arrowBackToHome from "../../assets/arrow.svg";

const ContactDetailPage = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [contact, setContact] = useState<Contact | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            const db = getDatabase();
            const contactRef = ref(db, "contacts/" + id);
            get(contactRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const contactData = snapshot.val();
                        setContact(contactData);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error("Error getting contact data:", error);
                });
        }
    }, [id]);

    const handleDeleteContact = () => {
        if (id) {
            const db = getDatabase();
            const contactRef = ref(db, "contacts/" + id);
            remove(contactRef)
                .then(() => {
                    navigate("/contacts");
                })
                .catch((error) => {
                    console.error("Error deleting contact:", error);
                });
        }
    };

    const handleEditContact = (updatedContact: Contact) => {
        setContact(updatedContact);
    };

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
    };

    if (!contact) {
        return <div className="text-center text-xl">{t("loading")}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
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
                    onClick={handleDeleteContact}
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
                    onConfirm={handleEditContact}
                    title={t("contactDetailPage.edit")}
                    message={{
                        close: t("contact.close"),
                        save: t("addContact.save"),
                    }}
                    contact={contact}
                />
            )}
        </div>
    );
};

export default ContactDetailPage;
