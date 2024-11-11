import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDatabase, ref, set } from "firebase/database";

import addImg from "../../assets/img-box.svg";

interface ModalProps {
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [textAreaValue, setTextAreaValue] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

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
                console.log("Immagine convertita in base64:", base64String);
            };
        }
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(event.target.value);
    };

    const handleSave = () => {
        const db = getDatabase();
        const id = crypto.randomUUID();
        const contactRef = ref(db, "contacts/" + id);

        set(contactRef, {
            id,
            image,
            name,
            surname,
            telephone,
            email,
            description: textAreaValue,
        })
            .then(() => {
                console.log("Dati salvati con successo!");
                onClose();
            })
            .catch((error) => {
                console.error("Errore durante il salvataggio:", error);
            });
    };

    return (
        <div className="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="modal-content relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 w-full max-w-xl">
                <div className="flex items-center justify-between border-b p-4">
                    {children}
                    <div className="flex items-center justify-end">
                        <button type="button" onClick={onClose}>
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
                        className="flex items-center space-x-2 bg-yellow-200 rounded-full p-5"
                    >
                        <img src={image || addImg} alt={t("addContact.addImage")} className="w-12 h-12" />
                    </button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: "none" }}
                    />

                </div>
                <div className="p-4 md:p-5 space-y-4">
                    <form className="space-y-4" action="#">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t("contact.name")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder={t("contact.surname")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                            <input
                                type="tel"
                                name="telephone"
                                id="telephone"
                                onChange={(e) => setTelephone(e.target.value)}
                                placeholder={t("contact.tel")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("contact.email")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <textarea
                            className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-600 dark:text-white"
                            placeholder={t("contact.notes")}
                            value={textAreaValue}
                            onChange={handleTextAreaChange}
                        ></textarea>
                        <div className="p-4 md:p-5 border-t space-y-4 flex justify-center">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="text-white bg-blue-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                            >
                                {t("addContact.save")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
