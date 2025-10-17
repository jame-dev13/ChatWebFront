import React, { useEffect, useRef, useState } from 'react';
import '../styles/chatBox.css';
import { Message } from './Message';

export const ChatBox = () => {
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const msgEndRef = useRef(null);
  const inputMsgRef = useRef(null);

  //utils
  const enterOrClick = (e) => e.key === 'Enter' || e.type === 'click';
  const isEmpty = (str) => str.trim() === '';
  let isNameSet = inputName.trim() !== '';

  //handlers
  const handleSetNameOnChange = (e) => setName(e.target.value);

  const hanldeOnKeyDown = (e, callback) => {
    if(e.key === 'Enter'){
      callback(e);
    }
  }

  const handleSetNameOnClick = (e) => {
    if (isEmpty(name)) return;
    if (enterOrClick(e)) {
      setInputName(name);
      setName('');
      inputMsgRef.current.focus();
    }
  }

  const handleSetMsgOnChange = (e) => setInputMsg(e.target.value);

  const handleSetMsgOnClick = (e) => {
    if (isEmpty(inputMsg)) return;
    if(enterOrClick(e)) {
      const newMsg = {
        from: inputName,
        msg: inputMsg,
        color: "#4C3BCF"
      }
      setMessages(prev => [...prev, newMsg]);
      setInputMsg('');
      inputMsgRef.current.value = '';
      inputMsgRef.current.focus();
    }
  }

  const scrollToBottom = () => msgEndRef.current?.scrollIntoView({behavior: 'smooth'});
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className='container w-50 h-50 bg-dark text-white rounded shadow-lg'>
        <div className='row py-2 my-2 justify-content-center align-content-center'>
          <div className="form-floating mb-3 text-black d-flex">
            <input type="text"
              className='form-control mx-2'
              placeholder="Your name...."
              name="name"
              id="name"
              value={name}
              onChange={handleSetNameOnChange}
              onKeyDown={(e) => hanldeOnKeyDown(e, handleSetNameOnClick)}
              disabled={isNameSet}
            />
            <label htmlFor="name" className='mx-4'>Your name</label>
            <button type='button' className='btn btn-primary'
            onClick={handleSetNameOnClick}
            disabled={isNameSet}
            >Set</button>
          </div>
        </div>
        <div className="row">
          <div className="msgBox col d-flex flex-column text-wrap text-break bg-dark">
            {/* Component Message pending... */}
            {messages.map((message, index) => (
              <Message key={index} from={message.from} msg={message.msg} color={inputName === message.from ? "#4C3BCF": "#3B9797"} />
            ))
            }
            <div ref={msgEndRef}/>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex m-2 p-2">
            <input
              type="text"
              name="msg"
              id="msg"
              className='form-control mx-2 p-3'
              placeholder='Message....'
              value={inputMsg}
              onChange={handleSetMsgOnChange}
              onKeyDown={e => hanldeOnKeyDown(e, handleSetMsgOnClick)}
              ref={inputMsgRef}
            />
            <button type='button' className='btn btn-primary'>
              <i className="fa-solid fa-square-arrow-up-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
