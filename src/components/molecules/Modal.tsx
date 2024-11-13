/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "../../context/ToastContext";
import { Contact } from "../../types/Contact";
import NoAvatar from "../../assets/img-box.svg";
import Edit from "../../assets/edit.svg"
import PlusIcon from "../../assets/plus.svg"
import Loading from "../atoms/Loading";
import ErrorHandler from "../atoms/ErrorHandler";
import { useContacts } from "../../context/ContactsContext";

interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    children?: React.ReactNode;
    contact?: Contact | null;
    title: string;
    message: {
        close: string;
        save: string;
    };
}

const Modal = ({ onClose, isOpen, contact, message }: ModalProps) => {

    const [error, setError] = useState<string | null>(null);
    const { showToast } = useToast();
    const { createContact, updateContact } = useContacts()
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | null>(contact?.image || null);
    const [description, setDescription] = useState<string>(contact?.description || "");
    const [name, setName] = useState<string>(contact?.name || "");
    const [surname, setSurname] = useState<string>(contact?.surname || "");
    const [phone, setPhone] = useState<string>(contact?.phone || "");
    const [email, setEmail] = useState<string>(contact?.email || "");
    const [favorite, setFavorite] = useState<boolean>(contact?.favorite || false);
    const [isLoading, setIsLoading] = useState(false);
    const isAddMode = !contact;

    useEffect(() => {
        if (contact) {
            setImage(contact.image);
            setDescription(contact.description || "");
            setName(contact.name);
            setSurname(contact.surname);
            setPhone(contact.phone);
            setEmail(contact.email);
            setFavorite(contact.favorite);
        }
    }, [contact]);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String);
            };
        }
    };

    const handleSave = () => {
        if (contact) return updateContactFn(contact);

        const contactToCreate: Contact = {
            id: crypto.randomUUID(),
            name,
            surname,
            phone,
            email,
            description,
            favorite,
            image
        }

        createContact(contactToCreate).then((isCreated) => {
            if (isCreated) { showToast(t("addContact.success"), "success"); }
            else {
                showToast(t("addContact.error"), 'error');
                console.error(t("addContact.error"));
            }
            setIsLoading(false);
        })
        onClose();
    };

    const updateContactFn = (contactToUpdate: Contact) => {
        const updatedFields: Partial<Contact> = {};

        if (name !== contactToUpdate.name) updatedFields.name = name;
        if (surname !== contactToUpdate.surname) updatedFields.surname = surname;
        if (phone !== contactToUpdate.phone) updatedFields.phone = phone;
        if (email !== contactToUpdate.email) updatedFields.email = email;
        if (image !== contactToUpdate.image) updatedFields.image = image;
        if (favorite !== contactToUpdate.favorite) updatedFields.favorite = favorite;
        if (description !== (contactToUpdate.description || "")) updatedFields.description = description;

        if (Object.keys(updatedFields).length === 0) {
            console.log("Nessuna modifica rilevata.");
            return;
        }
        setIsLoading(true);
        updateContact({ ...contactToUpdate, ...updatedFields })
        onClose();
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setDescription(event.target.value);
    };


    function handleOpenEditModal(_event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error("Function not implemented.");
    }

    return isOpen ? (
        <div
            role="dialog"
            aria-labelledby="modal-title"
            aria-hidden={!isOpen}
            className="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center"
        >
            <div
                aria-describedby="modal-description"
                className="modal-content relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-xl"
            >
                <div className="flex items-center justify-between border-b p-4">
                    <div className="flex items-center w-full justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label={t("modal.close")}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center my-5">
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className="flex items-center space-x-2 rounded-full p-5"
                        aria-label={t("addContact.addImage")}
                    >
                        <img
                            src={image || NoAvatar}
                            alt={t("addContact.addImage")}
                            className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-lg" />
                    </button>
                    <button
                        onClick={handleOpenEditModal}
                        className="absolute left-64 transform -translate-x-1/2 top-24 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
                        aria-label={isAddMode ? t("addContact.create") : t("contactDetailPage.edit")}
                    >
                        <img src={isAddMode ? PlusIcon : Edit} alt={isAddMode ? t("addContact.create") : t("contactDetailPage.edit")} className="w-6 h-6" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                </div>

                {error && <ErrorHandler message={error} />}
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="p-4 md:p-5 space-y-4">
                        <form className="space-y-4" action="#" aria-labelledby="modal-form">
                            <label htmlFor="name" className="sr-only">{t("modal.name")}</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t("modal.name")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                                aria-required="true"
                                aria-labelledby="name"
                            />
                            <label htmlFor="surname" className="sr-only">{t("modal.surname")}</label>
                            <input
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder={t("modal.surname")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                aria-label={t("contact.surname")}
                            />
                            <label htmlFor="telephone" className="sr-only">{t("modal.tel")}</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder={t("contact.tel")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                                aria-required="true"
                                aria-labelledby="telephone"
                            />
                            <label htmlFor="email" className="sr-only">{t("modal.email")}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("modal.email")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                aria-labelledby="email"
                            />
                            <label htmlFor="notes" className="sr-only">{t("modal.notes")}</label>
                            <textarea
                                className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-600 dark:text-white"
                                placeholder={t("modal.notes")}
                                value={description}
                                onChange={handleDescriptionChange}
                                aria-labelledby="notes"
                            ></textarea>
                        </form>
                    </div>
                )}
                <div className="p-4 md:p-5 border-t space-y-4 flex justify-center">
                    <button
                        onClick={handleSave}
                        className="text-white bg-blue-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                        aria-live="polite">
                        {t("modal.save")}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;
