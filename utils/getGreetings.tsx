import { useI18N } from '../context/i18';

export const getGreetings = () => {
  const { t } = useI18N();

  const hours = new Date().getHours();
  if (hours < 12) {
    return t('greetings').morning;
  } else if (hours >= 12 && hours <= 17) {
    return t('greetings').afternoon;
  } else {
    return t('greetings').night;
  }
};
