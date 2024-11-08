import { useTranslation } from "react-i18next"
function Footer() {
    const { t } = useTranslation();
    return (
        <>
            <footer className="bg-white dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl  p-4 md:flex md:items-center md:justify-between">
                    <div className="justify-around">
                        <span>{t("favorites")}</span>
                        <span>{t("languages")}</span>

                        <span>{t("contacts")}</span>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
