import styles from "./style.module.scss";
import logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export function MessageList() {
  type Message = {
    id: number;
    text: string;
    user: {
      avatar_url: string;
      name: string;
    };
  };
  const messageQueue: Message[] = [];
  const socket = io('http://localhost:4000')

  socket.on('new_message',(message: Message) => {
    messageQueue.push(message)
  });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const time = setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages([
          messageQueue[0],
          messages[0],
          messages[1],
        ].filter(Boolean));
        messageQueue.length = 0;
      }
    },3000)
  });
  useEffect(() => {
    api.get<Message[]>("/messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="Do while" />
      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <li key={Math.random()} className={styles.message}>
              <p className={styles.messageContent}>
                {message.text}
              </p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={message.user.avatar_url}
                    alt={message.user.name}
                  />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
