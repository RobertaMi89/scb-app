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
            <Button className="flex flex-row my-5" onClick={handleAddContact}>
                <img
                    src={AddBtn}
                    className="w-8 h-8"
                    alt={t("addContact.iconAlt")}
                    aria-hidden="true" />
                <span>{t("addContact.create")}</span>
            </Button>

            {isModalOpen && (
                <Modal
                    onClose={handleCloseModal}
                    isOpen={isModalOpen}
                    title={t("addContact.create")}
                    message={{
                        close: t("modal.close"),
                        save: t("addContact.save")
                    }}
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

export default AddContact;
