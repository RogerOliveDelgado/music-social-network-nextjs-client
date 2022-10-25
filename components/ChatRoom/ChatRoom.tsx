import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Message from '../Message/Message';

import styles from './styles.module.css';
import { useEffect, useRef } from 'react';
import { useI18N } from '../../context/i18';

type Props = {
  messages: string[],
  setMessages: Function
};

const ChatRoom = (props: Props) => {
  const chat = useRef(null);
  const { t } = useI18N();

  useEffect(() => {
    chat && chat.current.scrollTo(0, chat.current.scrollHeight, 'smooth');
    // chat && console.log(chat);
  }, []);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    if(messagesEndRef.current != null)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block:'end' });
    
      const field = document.getElementById("fieldset");
      field && (field.scrollTop = field.scrollHeight);
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={styles.chat_room_container}>
      <div className={styles.chat_room_header}>
        <IconButton aria-label="back">
          <ArrowBackIcon />
        </IconButton>
        <Image
          className={styles.chat_room_image}
          src="/Images/contact_default_male.png"
          alt="contact_default"
          height={50}
          width={50}
          layout="fixed"
        />
        <p className={styles.contact_name}>Roger Olivé</p>
      </div>
      <div className={styles.messages_container} ref={chat}>
        <Message
          image={'/Images/contact_default_male.png'}
          text={'Che ya hiciste el deploy? '}
        />
        <Message
          image={'/Images/contact_default.png'}
          text={'Nada, no me deja'}
          user={true}
        />
        <Message
          image={'/Images/contact_default.png'}
          text={'Nada, no me deja'}
          user={true}
        />
        <Message
          image={'/Images/contact_default.png'}
          text={'Nada, no me deja'}
          user={true}
        />
        <Message
          image={'/Images/contact_default_male.png'}
          text={'Pues ponte las pilas que ya es hora de irse'}
        />
        <Message
          image={'/Images/contact_default.png'}
          text={'No me toques los websites!'}
          user={true}
        />
        <Message image={'/Images/contact_default.png'} text={'🤯 🤯 🤯'} />
        <Message image={'/Images/contact_default.png'} text={'🤪'} />
      </div>
      <div className={styles.message_input}>
        <form className={styles.message_form}>
          <input
            className={styles.input_message}
            type="text"
            name=""
            id=""
            placeholder={`${t('additional').message} Roger Olvié`}
          />
          <Button variant="contained" size="small" endIcon={<SendIcon />}>
            {t('additional').send}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
