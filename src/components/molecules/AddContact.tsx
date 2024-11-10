import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../atoms/Button";
import AddBtn from "../../assets/addUsers.svg";
import Modal from "./Modal";

function AddContact() {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddContact = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);

    };

    return (
        <>
            <Button className="flex flex-row" onClick={handleAddContact}>
                <img src={AddBtn} className="w-8 h-8" alt={t("addContact.create")} />
                <span>{t("addContact.create")}</span>
            </Button>

            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t("addContact.create")}
                    </h2>
                </Modal>
            )}
        </>
    );
}

export default AddContact;
