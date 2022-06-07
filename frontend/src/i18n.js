import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from 'moment';

import ENG_LANGUAGE_FILE from "./translations/eng";
import UKR_LANGUAGE_FILE from "./translations/ukr";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            eng: {
                translation: ENG_LANGUAGE_FILE
            },
            ukr: {
                translation: UKR_LANGUAGE_FILE
            }
        },
        interpolation: {
            format: function(value, format, lng) {
                if (format === 'uppercase') return value.toUpperCase();
                if(value instanceof Date) return moment(value).format(format);
                return value;
            }
        }
    });

i18n.changeLanguage('eng');