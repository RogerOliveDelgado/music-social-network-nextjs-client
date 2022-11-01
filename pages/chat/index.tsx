import Layout from "../../components/Layout/Layout";
import ContactsContainer from "../../components/ContactsContainer/ContactsContainer";
import ChatRoom from "../../components/ChatRoom/ChatRoom";

import styles from "./styles.module.css";
import Head from "next/head";
import { useI18N } from "../../context/i18";

import {
  ReactEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { Playlist } from "../../interfaces/playlistResponse";
import { Album, Artist } from "../../interfaces/ServerResponse";
import { Track } from "../../interfaces/tracks";

import { socketService } from "../../socket/socket";
import { useCookies } from "react-cookie";
import { countContext } from "../../context/countContext";
import { CollectionsOutlined } from "@mui/icons-material";
import { socketContext } from "../../context/socketContext";

type Props = {
  setUserMessage: React.Dispatch<React.SetStateAction<number>>;
};

let socketId;
//Array wich contains the connected users, each time a user make login into chat app, this array will be updated
let usuarios: { id: string; socketId: string; usuario: string }[] = [];
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_USERS_BACKEND || ""

const Chat = (props: Props) => {
  const { t } = useI18N();
  const [cookies, setCookie, removeCookie] = useCookies([
    "userID",
    "userToken",
    "username",
  ]);
  const token = cookies.userToken;
  //States to manage the renders of each component
  const { socket, typing, setTyping, connectedUsers, setConnectedUsers } =
    useContext(socketContext);
  const {
    currentRoom,
    setCurrentRoom,
    messages,
    setMessages,
    userMessage,
    setUserMessage,
    dataMessages,
    setDataMessages,
    previousPath,
    id2,
    setid2,
    pendingMessages,
    setPendingMessages,
  } = useContext(countContext);
  const [input, setInput] = useState<string>("");
  const [socketUp, setSocketUp] = useState<Socket>(socket);
  const [users, setUsers] = useState<
    {
      _id: string;
      username: string;
      email: string;
      password: string;
      image: string;
      genres: string[];
      phone: string;
      playlists: Partial<Playlist>[];
      albums: Partial<Album>[];
      artists: Partial<Artist>[];
      likedSongs: Partial<Track>[];
    }[]
  >([]);
  const [id1, setid1] = useState<string | undefined>();
  const [userName, setUserName] = useState<string>("");
  const [room, setRoom] = useState<{ ok: boolean; data: { _id: string } }>();
  const [widthWindow, setWidthWindow] = useState<number>(0);
  const [user, setUser] = useState<{
    _id: string;
    username: string;
    email: string;
    password: string;
    image: string;
    genres: string[];
    phone: string;
    chats?: {}[];
    playlists: Partial<Playlist>[];
    albums: Partial<Album>[];
    artists: Partial<Artist>[];
    likedSongs: Partial<Track>[];
  }>();
  //Take all the exists users on dataBase
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.window.innerWidth);
    }
    const getUsers = async () => {
      const response = await fetch(
        `${BASE_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data1 = await response.json();
      setUsers(data1.data);
      setUserName(cookies.username); //Here we will set the name of user account
      setid1(cookies.userID); //Here we set the id of user account
    };
    getUsers();
  }, []);

  //Take the lastest open room, as current room
  useEffect(() => {
    const userName = users.find(
      (user: { _id: string | undefined }) => user._id == id1
    );
    setUserName(cookies.username);
    const currentRoom = async () => {
      const responseCurrentRoom = await fetch(
        `${BASE_URL}/chat/currentRoom`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const room = await responseCurrentRoom.json();
      if (room != undefined && room.msg != "No current chat") {
        setRoom(room);
        setCurrentRoom(room.data.username);
        setid2(room.data._id);
      }
      const response1 = await fetch(
        `${BASE_URL}/chat/pendingMessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const pending = await response1.json();
      let arrayPendingMessages: { id: string; numberMessages: number }[] = [];
      let arrayPendingMessagesPrime: { id: string; numberMessages: number }[] =
        [];
      pending.data.map((chat: any) => {
        chat.pendingMessages != 0 &&
          arrayPendingMessages.push({
            id: chat.toUser,
            numberMessages: chat.pendingMessages,
          });
        arrayPendingMessagesPrime.push({
          id: chat.toUser,
          numberMessages: chat.pendingMessages,
        });
      });
      if (pendingMessages == arrayPendingMessages)
        setPendingMessages(arrayPendingMessages);
      if (pendingMessages != arrayPendingMessages) {
        if (pendingMessages.length > arrayPendingMessages.length) {
          setPendingMessages(pendingMessages);
        } else {
          setPendingMessages(arrayPendingMessages);
        }
      }
    };
    currentRoom();
  }, [cookies.userID, socketUp]); //socketUp

  //Charge the messages of the current room, after set de id2 and current room
  useEffect(() => {
    const getMessagesOfCurrentRoom = async (idCurrentRoom: any) => {
      if (currentRoom != undefined) {
        const responseOfCurrentRoom = await fetch(
          `${BASE_URL}/chat/getMessages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ toUserId: id2 }),
          }
        );
        const dataMessages = await responseOfCurrentRoom.json();
        setMessages(dataMessages.data);
      }
      if (room != undefined && room.msg != "No current chat") {
        getMessagesOfCurrentRoom(room?.data._id);
      }
    };
  }, [room]);

  //Set the typing event
  useEffect(() => {
    socket.on("typing", (data: any) => {
      setTyping(data);
    });
    return () => {
      socket.off("typing");
    };
  }, [cookies.userID]);

  // Update the message for the currentRoom or update the pendingMessage if the user is disconnected
  useEffect(() => {
    if (dataMessages.from == id2 || dataMessages.from == id1) {
      //If message comes from one of the actual talkers
      setUserMessage(userMessage); //Comprobar si vale
      setMessages((prevMessages) => {
        return [...prevMessages, dataMessages.msg];
      });
    }
    if (
      dataMessages.from == id2 &&
      id2 != undefined &&
      dataMessages.from != cookies.userID
    ) {
      id2 == dataMessages.from && id2 != undefined && deletePendingMessage(id2);
    }
  }, [dataMessages]);

  //Delete messages no read when the user goes to that room
  const deletePendingMessage = (userId: string | undefined) => {
    const messagesAllreadyPending = pendingMessages.filter(
      (chat) => chat.id != userId
    );
    let count: number = 0;
    messagesAllreadyPending.map((chat) => {
      count += chat.numberMessages;
    });
    previousPath == "chat" && setUserMessage(count);
    setPendingMessages(messagesAllreadyPending);
    //Should call to the function in dataBase to put to 0 the pendingMessages of the chat
    const deleteInDataBasePendingMessages = async () => {
      const response = await fetch(
        `${BASE_URL}/chat/deletePendingMessages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ toUserId: id2 }),
        }
      );
      const data = await response.json();
    };
    deleteInDataBasePendingMessages();
  };
  const [contacts, setContacts] = useState<boolean>(true);

  //Get the screen size on dynamic way
  useEffect(() => {
    setWidthWindow(window.window.innerWidth);
    window.addEventListener("resize", resizeWindow);
  }, [widthWindow]);

  const resizeWindow = () => {
    setWidthWindow(window.window.innerWidth);
  };

  return (
    <>
      <Head>
        <title>
          {`${t("additional").app_name} - ${t("headers").headerChat} ${
            userMessage === 0 ? "" : `(${userMessage})`
          }`}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className={styles.chat_container}>
          <h1> {t("additional").messages}</h1>
          <div className={styles.main_content}>
            {contacts == true && widthWindow < 901 && (
              <ChatRoom
                setContacts={setContacts}
                messages={messages}
                setMessages={setMessages}
                deletePendingMessage={deletePendingMessage}
                currentRoom={currentRoom}
                id1={id1}
                id2={id2}
                socket={socket}
                input={input}
                setInput={setInput}
                usersConnected={connectedUsers}
                pendingMessages={pendingMessages}
                userName={userName}
                typing={typing}
                users={users}
              />
            )}
            {contacts == false && widthWindow < 901 && (
              <ContactsContainer
                setContacts={setContacts}
                users={users}
                usersConnected={connectedUsers}
                deletePendingMessage={deletePendingMessage}
                socket={socket}
                id1={id1}
                id2={id2}
                setid2={setid2}
                setCurrentRoom={setCurrentRoom}
                setMessages={setMessages}
                pendingMessages={pendingMessages}
              />
            )}
            {widthWindow >= 901 && (
              <>
                <ChatRoom
                  setContacts={setContacts}
                  messages={messages}
                  setMessages={setMessages}
                  deletePendingMessage={deletePendingMessage}
                  currentRoom={currentRoom}
                  id1={id1}
                  id2={id2}
                  socket={socket}
                  input={input}
                  setInput={setInput}
                  usersConnected={connectedUsers}
                  pendingMessages={pendingMessages}
                  userName={userName}
                  typing={typing}
                  users={users}
                />
                <ContactsContainer
                  setContacts={setContacts}
                  users={users}
                  usersConnected={connectedUsers}
                  deletePendingMessage={deletePendingMessage}
                  socket={socket}
                  id1={id1}
                  id2={id2}
                  setid2={setid2}
                  setCurrentRoom={setCurrentRoom}
                  setMessages={setMessages}
                  pendingMessages={pendingMessages}
                />
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Chat;
