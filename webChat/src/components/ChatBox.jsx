import React, { useEffect, useRef, useState } from 'react';
import '../styles/chatBox.css';
import { Message } from './Message';

export const ChatBox = () => {
  const colorOdd = "#4C3BCF";
  const colorEven = "#3B9797";

  const [msg, setMsg] = useState('');
  const [displayMsg, setDisplayMsg] = useState([]);
  const lastMessage = useRef(null);
  
  const handleInputChange = (e) => {
    setMsg(e.target.value);
  };
  
  const handleSetMsg = () => {
    if (msg.trim() !== '') {
      setDisplayMsg([...displayMsg, msg]);
      setMsg('');
    }
  };

  /**
   * Scroll to the bottom of the chat box when a new message is added
   */
  const scrollToBottom = () => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  const isEven = (num) => num % 2 === 0;
  
  const getBgColor = (index) => {
    return isEven(index + 1) ? colorEven : colorOdd;
  }

  /**
   * Do scroll to bottom when a new message is added
   */
  useEffect(() => {
    scrollToBottom();
  }, [displayMsg]);

  return (
    <>
      <div className='container-fluid bg-dark text-white rounded shadow-lg'>
        <div className="row">
          <div className="col d-flex flex-column msgBox text-wrap text-break bg-dark">
            {
              displayMsg.map((message, index) => (
                <Message key={index} from={`user ${index + 1}`} msg={message} bgColor={getBgColor(index)}/>
              ))
            }
            <div ref={lastMessage} />
          </div>
        </div>
        <div className="row">
          <div className="col d-flex m-2 p-2">
            <input
              type="text"
              name="msg"
              id="msg"
              className='form-control mx-2'
              placeholder='Message....'
              value={msg}
              onChange={handleInputChange}
            />
            <button type='button' className='btn btn-primary' onClick={handleSetMsg}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
