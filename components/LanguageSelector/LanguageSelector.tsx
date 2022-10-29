import React from "react";
import Box from "@mui/material/Box";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import en from "../../locales/en";
import es from "../../locales/es";
import fr from "../../locales/fr";

import { useRouter } from "next/router";

import styles from "./styles.module.css";
import { border } from "@mui/system";

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
    <Box sx={{
      display: "flex",
      alignItems: "center",
    }}>
      <FormControl
        fullWidth
        variant="standard"
        sx={{
          " & .MuiSelect-select": {
            display: "flex",
          },
        }}
      >
        <Select
          value={language}
          className={styles.form_control}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={"es"}>
            <span className={styles.flag}>ES</span>
            <picture className={styles.flag}>
              <img src="/Images/spain_flag.png" alt="es flag" />
            </picture>
          </MenuItem>
          <MenuItem value={"en"}>
            <span className={styles.flag}>US</span>
            <picture className={styles.flag}>
              <img src="/Images/usa_flag.png" alt="us flag" />
            </picture>
          </MenuItem>
          <MenuItem value={"fr"}>
            <span className={styles.flag}>FR</span>
            <picture className={styles.flag}>
              <img src="/Images/france_flag.png" alt="fr flag" />
            </picture>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
