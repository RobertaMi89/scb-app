import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "../../context/ToastContext";
import { Contact } from "../../types/Contact";
import Loading from "../atoms/Loading";
import { useContacts } from "../../context/ContactsContext";
import { useView } from "../../context/ViewContext";
import Button from "../atoms/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    children?: React.ReactNode;
    contact?: Contact | null;
    title: string;
}

const Modal = ({ onClose, isOpen, contact }: ModalProps) => {
    const { isMobile } = useView();
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
    const [isEmailValid, setIsEmailValid] = useState(true);

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

    const handleRemoveImage = () => {
        if (image) {
            setImage(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }

    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImage(base64String);
            };
            event.target.value = ''
        }
    };

    const handleSave = () => {
        if (!name.trim()) {
            showToast(t("validation.nameRequired"), 'error');
            return;
        }

        if (!email.trim() && !phone.trim()) {
            showToast(t("validation.emailOrPhoneRequired"), 'error');
            return;
        }

        if (email && !isEmailValid) {
            showToast(t("validation.invalidEmail"), 'error');
            return;
        }

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
            onClose();
            return;
        }
        setIsLoading(true);
        updateContact({ ...contactToUpdate, ...updatedFields })
        onClose();
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(emailValue));
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setDescription(event.target.value);
    };

    return isOpen ? (
        <div
            role="dialog"
            aria-labelledby="modal-title"
            aria-hidden={!isOpen}
            className={`modal-overlay fixed top-0 left-0  right-0 bottom-0 bg-gray-800 bg-opacity-50 z-40 flex justify-center items-center`}
        >
            <div
                aria-describedby="modal-description"
                className={`modal-content relative bg-white shadow dark:bg-gray-700 w-full max-w-xl  ${isMobile ? 'min-h-[100%]' : 'rounded-lg p-4'}`}
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
                    <div className="relative flex items-center justify-center">
                        {/* Avatar*/}
                        <button
                            type="button"
                            className="flex items-center space-x-2 rounded-full p-5"
                            aria-label={t("addContact.addImage")}
                        >

                            {image ? (<img
                                src={image}
                                alt={t("addContact.addImage")}
                                className="w-40 h-40 object-cover rounded-full border-4 border-gray-200 shadow-lg"
                            />) : (<div
                                className="w-40 h-40 flex justify-center items-center object-cover rounded-full border-4 border-gray-200 shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#9ca3af" className="h-14">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg></div>
                            )}


                        </button>

                        <button
                            onClick={handleButtonClick}
                            className="absolute top-0 right-0 transform translate-x-[-16px] -translate-y-[-16px] bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
                            aria-label={isAddMode ? t("addContact.create") : t("contactDetailPage.edit")}
                        >

                            {isAddMode ? (<svg xmlns="http://www.w3.org/2000/svg" style={{ color: '#22c55e' }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" style={{ color: "#3b82f6" }} strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>)}

                        </button>

                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 transform translate-x-[-16px] -translate-y-[-128px] bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
                            aria-label={isAddMode ? t("addContact.create") : t("contactDetailPage.edit")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444" className="h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>


                        </button>
                    </div>


                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />
                </div>

                {isLoading ? (
                    <Loading />
                ) : (
                    <div className={`p-4 md:p-5 space-y-4 ${isMobile ? 'h-[calc(100vh-23rem)] ' : ''}`}>
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
                            <div className="phone-input-container">
                                <label htmlFor="telephone" id="telephone" className="block text-sm font-medium text-gray-700">
                                    {t("contact.tel")}
                                </label>
                                <PhoneInput
                                    country={"it"}
                                    value={phone}
                                    onChange={(value) => setPhone(value)}
                                    inputProps={{
                                        required: true,
                                        "aria-required": "true",
                                        className:
                                            "before: bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-12 py-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",
                                    }}
                                />
                            </div>
                            <label htmlFor="email" className="sr-only">{t("modal.email")}</label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder={t("modal.email")}
                                className={`bg-gray-50 border ${isEmailValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
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

                <div className={`flex justify-center items-center space-x-4 ${isMobile ? 'bg-gray-50 border border-t-gray-200 h-20' : ''}`}>
                    <Button
                        onClick={handleSave}
                        className="px-6 py-2 flex flex-col items-center text-black rounded-full hover:bg-gray-100 transition duration-200"
                        aria-label={t("contactDetailPage.edit")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke='#22c55e' className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        {t("modal.save")}
                    </Button>

                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;
