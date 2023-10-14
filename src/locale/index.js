import { createI18n } from "vue-i18n";

import uz from "./messages/uz.json";
import oz from "./messages/oz.json";
import ru from "./messages/ru.json";
import en from "./messages/en.json";

const messages = {
  uz,
  oz,
  ru,
  en,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  globalInjection: true,
  messages: messages,
});

export default i18n;
