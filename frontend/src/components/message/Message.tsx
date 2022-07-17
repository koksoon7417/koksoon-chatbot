import { useState, useMemo, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getMessageAsync,
  updateMessageAsync,
  addMessage,
  selectMessage,
} from './messageSlice';
import styles from './Message.module.css';

export const Message = () => {
  const message = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useMemo(async () => {
    await dispatch(getMessageAsync());
  }, [dispatch])

  const updateMessage = async () => {
    if (inputText) {
      dispatch(addMessage(inputText));
      await dispatch(updateMessageAsync(inputText));

      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setInputText('');
    }
  }

  return (
    <div className={styles.message}>
      {message.messages.length > 0
        && message.messages.map(message => {
          return (
            <div
              key={message.key}>
              {
                message.from === 0 ?
                  <div
                    className={styles.messageBot}
                  >
                    <b>BOT</b>
                    {
                      message.content.text &&
                      <div
                        dangerouslySetInnerHTML={{
                          __html: message.content.text
                        }}
                      />
                    }
                    {
                      message.content.type === 10
                        && message.content.cards ?
                        message.content.cards.map(card => {
                          return (
                            <div
                              className={styles.card}
                              key={card.key}>
                              <b>{card.title}</b>
                              <br />
                              {
                                card.desc &&
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: card.desc
                                  }}
                                />
                              }
                            </div>
                          )
                        })
                        :
                        <></>
                    }
                  </div>
                  : <div
                    className={styles.messageUser}
                  >
                    <b>User</b>
                    <br />
                    {message.content}
                  </div>
              }
            </div>
          )
        })}
      <div
        ref={messagesEndRef}
        className={styles.sendMessage}
      >
        <input
          className={styles.input}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') updateMessage();
          }}
        />
        <button
          className={styles.button}
          onClick={updateMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
