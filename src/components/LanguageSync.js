import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function LanguageSync() {
  const { i18n } = useTranslation();
  const languageFadeSkipFirst = useRef(true);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("site-language");
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    const lang = i18n.language?.split("-")[0] || "en";
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle("lang-ta", lang === "ta");
    window.localStorage.setItem("site-language", lang);
  }, [i18n.language]);

  useEffect(() => {
    if (languageFadeSkipFirst.current) {
      languageFadeSkipFirst.current = false;
      return;
    }
    document.body.classList.add("i18n-content-fade");
    const timer = window.setTimeout(() => {
      document.body.classList.remove("i18n-content-fade");
    }, 350);
    return () => window.clearTimeout(timer);
  }, [i18n.language]);

  return null;
}

export default LanguageSync;
