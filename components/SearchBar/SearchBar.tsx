import * as React from "react";
import { useRouter } from "next/router";
import { useI18N } from "../../context/i18";
import styles from "./styles.module.css";
import useDebounce from "../../hook/useDebounce";
import { ChangeEvent, useEffect, useState } from "react";
import searchCharacters from "../../services/search";
import Link from "next/link";

export default function SearchAppBar() {
  const router = useRouter();

  const { t } = useI18N();

  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const debouncedValue = useDebounce<string>(
    value,
    router.pathname === "/search" ? 750 : 50
  );

  useEffect(() => {
    // Triggers when "debouncedValue" changes

    if (debouncedValue) {
      // searchCharacters(debouncedValue).then((results) => {
      router.replace(`/search/${debouncedValue}`);
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbar_wrapper}>
        <div className={styles.searchbar_left}>
          <div className={styles.search_icon_wrapper}>
            <span className={`${styles.search_icon} ${styles.searchbar_icon}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </span>
          </div>
        </div>

        <div className={styles.searchbar_center}>
          <div className={styles.searchbar_input_spacer}></div>
          {router.pathname === "/search" ||
          router.pathname === "/search/[search]" ? (
            <input
              onChange={handleChange}
              autoFocus
              type="text"
              className={styles.searchbar_input}
              name="q"
              autoCapitalize="off"
              autoComplete="off"
              title="Search"
              role="combobox"
              aria-controls="search-suggestions"
              aria-expanded="false"
              placeholder={t("additional").search}
            />
          ) : (
            <Link href={"/search"}>
              <input
                onChange={handleChange}
                type="text"
                className={styles.searchbar_input}
                name="q"
                autoCapitalize="off"
                autoComplete="off"
                title="Search"
                role="combobox"
                aria-controls="search-suggestions"
                aria-expanded="false"
                placeholder={t("additional").search}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
