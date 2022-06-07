import i18n from "i18next";
import {useState} from "react";

const LanguageButton = (props) => {
    const [languageName, setLanguageName] = useState(
        localStorage.getItem('resource-lang') === 'ukr'
            ? "УКР"
            : "EN"
    );

    return (
        <div id='lang-btn' onClick={
            _ => {
                let lang = localStorage.getItem('resource-lang');
                if (lang === 'eng') {
                    localStorage.setItem('resource-lang', 'ukr');
                    i18n.changeLanguage("ukr");
                    setLanguageName("УКР");
                } else {
                    localStorage.setItem('resource-lang', 'eng');
                    i18n.changeLanguage("eng");
                    setLanguageName("EN");
                }
            }
        }>
            {
                languageName
            }
        </div>
    )
}

export default LanguageButton;