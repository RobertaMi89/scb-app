import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { useTranslation } from "react-i18next";
import { Contact } from "../../types/Contact";

const ContactDetailPage = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [contact, setContact] = useState<Contact | null>(null);

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

    if (!contact) {
        return <div>{t("loading")}</div>;
    }

    return (
        <div className="contact-detail">
            <img
                src={contact.image || "/default-avatar.png"}
                alt={t("contactDetail.imageAlt")}
                className="contact-image"
            />
            <p>{t("contact.name")}: {contact.name}</p>
            <p>{t("contact.surname")}: {contact.surname}</p>
            <p>{t("contact.phone")}: {contact.phone}</p>
            <p>{t("contact.email")}: {contact.email}</p>
        </div>
    );
};

export default ContactDetailPage;
