import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import Modal from "./Modal";

function AddContactButton() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddContact = async () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button className="btnAdd flex flex-row items-center shadow-sm shadow-slate-500 rounded-full dark:bg-gray-400" onClick={handleAddContact}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" aria-labelledby={t("addContact.iconAlt")} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mx-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
            </Button>

            {isModalOpen && (
                <Modal
                    onClose={handleCloseModal}
                    isOpen={isModalOpen}
                    title={t("addContact.create")}
                >
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white"
                        id="modal-title">
                        {t("addContact.create")}
                    </h2>
                </Modal>
            )}
        </>
    );
}

export default AddContactButton;
