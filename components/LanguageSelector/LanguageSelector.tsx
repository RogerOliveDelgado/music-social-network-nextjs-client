import React from 'react';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import en from '../../locales/en';
import es from '../../locales/es';
import fr from '../../locales/fr';

import { useRouter } from 'next/router';

import styles from './styles.module.css';

type Props = {};

const LanguageSelector = (props: Props) => {
  const router = useRouter();
  const { locale } = router;

  const t = locale;
  const [language, setLanguage] = React.useState(locale);

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    const locale = event.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <Box>
      <FormControl fullWidth variant="standard">
        <Select
          value={language}
          className={styles.form_control}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={'es'}>ES 🇪🇸</MenuItem>
          <MenuItem value={'en'}>US 🇺🇸</MenuItem>
          <MenuItem value={'fr'}>FR 🇫🇷</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
