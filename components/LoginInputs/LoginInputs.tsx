import React, { useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCookies } from 'react-cookie';

import styles from './styles.module.css';

type Props = {};

const LoginInputs = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const [seePassword, setSeePassword] = useState<boolean>();

  const [cookies, setCookie] = useCookies(['userToken', 'username', 'userID']);

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const showPassword = () => {
    seePassword ? setSeePassword(false) : setSeePassword(true);
  };

  const logIn = async (
    email: String,
    password: String,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND}/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.status === 400) {
        const result = await response.json();
        toast.error('Oops, something went wrong!');
      }

      if (response.ok) {
        const result = await response.json();

        setCookie('userToken', result.data.token, { path: '/' });
        setCookie('username', result.data.username, { path: '/' });
        setCookie('userID', result.data.id, { path: '/' });

        toast.promise(router.push('/es'), {
          loading: 'Goooing...',
          success: <b>Here we are!</b>,
          error: <b>Oops, something went wrong!</b>,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.loginForm}>
      <input
        type="email"
        onChange={getEmail}
        placeholder="Introduce your email"
        className={styles.loginInput}
      />
      <div className={` ${styles.loginDivInput}`}>
        <input
          type={seePassword ? 'text' : 'password'}
          onChange={getPassword}
          placeholder="Introduce your password"
          className={`${styles.loginInput} ${styles.noBorder}`}
        />

        {seePassword ? (
          <VisibilityOffIcon onClick={showPassword} />
        ) : (
          <VisibilityIcon onClick={showPassword} />
        )}
      </div>

      <Toaster />

      <button
        className={styles.loginButton}
        onClick={(e) => {
          logIn(email, password, e);
        }}
      >
        Log In
      </button>
    </form>
  );
};

export default LoginInputs;
