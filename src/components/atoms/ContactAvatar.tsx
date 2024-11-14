import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ContactAvatarProps {
    name: string;
    image: string | null;
    className?: string;
}

const generateRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#";
    const generateLetter = (firstLetter: boolean) => {
        let letter = letters[Math.floor(Math.random() * 16)]
        if (firstLetter && letter == '0' || letter == '1' || letter == '2' || letter == '3') {
            letter = generateLetter(firstLetter)
        }
        return letter;
    }

    for (let i = 0; i < 6; i++) {
        const randomLetter = generateLetter(i == 0)
        color += randomLetter;
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
            className={`w-12 h-12 rounded-full object-cover ${className}`}
        />
    ) : (
        <div
            role="img"
            aria-label={name ? `${t('avatar_placeholder', { name })}` : t('avatar_alt')}
            style={{ backgroundColor: bgColor }}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${className}`}
        >
            {initial}
        </div>
    );
};

export default ContactAvatar;
