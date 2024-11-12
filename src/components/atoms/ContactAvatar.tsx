import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ContactAvatarProps {
    name: string;
    image: string | null;
    className?: string;
}

const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const ContactAvatar = ({ name, image, className }: ContactAvatarProps) => {
    const { t } = useTranslation();
    const [bgColor, setBgColor] = useState<string>("#fff");

    useEffect(() => {
        if (!image) {
            setBgColor(generateRandomColor());
        }
    }, [image]);

    const initial = name ? name.charAt(0).toUpperCase() : "";

    return image ? (
        <img
            src={image}
            alt={name ? `${t('avatar_placeholder', { name })}` : t('avatar_alt')}
            className={`w-12 h-12 rounded-full mt-2 object-cover ${className}`}
        />
    ) : (
        <div
            role="img"
            aria-label={name ? `${t('avatar_placeholder', { name })}` : t('avatar_alt')}
            style={{ backgroundColor: bgColor }}
            className={`w-12 h-12 rounded-full flex items-center justify-center mt-2 text-white font-semibold ${className}`}
        >
            {initial}
        </div>
    );
};

export default ContactAvatar;
