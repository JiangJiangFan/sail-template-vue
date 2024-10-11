import { createI18n } from 'vue-i18n';
import zh from './zh-CN';
import en from './en-US';
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // 导入ELement-Plus中文语言包
import enUs from 'element-plus/es/locale/lang/en';

const messages = {
  zh: { ...zh, ...zhCn },
  en: { ...en, ...enUs }
};

export const i18n = createI18n({
  locale: 'zh',
  silentFallbackWarn: true,
  messages
});
