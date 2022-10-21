import Contact from '../Contact/Contact';
import { useState } from 'react';
import styles from './styles.module.css';
import { useI18N } from '../../context/i18';

type Props = {};

const ContactsContainer = (props: Props) => {
  const [activeContact, setActiveContact] = useState(0);
  const { t } = useI18N();

  const actvateRoom = (id: number) => {
    setActiveContact(id);
  };

  return (
    <div className={styles.contacts_container}>
      <h2>{t('additional').contacts}</h2>
      <div className={styles.contacts_wrapper}>
        <Contact
          name="Roger Olivé"
          active={true}
          image="/Images/contact_default_male.png"
        />
        <Contact
          name="Alicia Cembranos"
          active={false}
          image="/Images/contact_default_female.png"
        />
        <Contact
          name="Roger Olivé"
          active={false}
          image="/Images/contact_default_male.png"
        />
        <Contact
          name="Alicia Cembranos"
          active={false}
          image="/Images/contact_default_female.png"
        />
        <Contact
          name="Roger Olivé"
          active={false}
          image="/Images/contact_default_male.png"
        />
        <Contact
          name="Alicia Cembranos"
          active={false}
          image="/Images/contact_default_female.png"
        />
        <Contact
          name="Roger Olivé"
          active={false}
          image="/Images/contact_default_male.png"
        />
        <Contact
          name="Alicia Cembranos"
          active={false}
          image="/Images/contact_default_female.png"
        />
        <Contact
          name="Roger Olivé"
          active={false}
          image="/Images/contact_default_male.png"
        />
        <Contact
          name="Alicia Cembranos"
          active={false}
          image="/Images/contact_default_female.png"
        />
        <Contact
          name="Roger Olivé"
          active={false}
          image="/Images/contact_default_male.png"
        />
        <Contact
          name="Alicia Cembranos"
          active={false}
          image="/Images/contact_default_female.png"
        />
      </div>
    </div>
  );
};

export default ContactsContainer;
