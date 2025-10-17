import React from 'react'
import '../styles/message.css';
export const Message = ({from, msg, color}) => {

  return (
    <>
    <div className='row box w-50 flex-column rounded m-1 p-2 text-white gap-2' style={{backgroundColor: color}}>
        <div className="col border-bottom border-info text-start fs-5 fst-italic text-capitalize">{from}:</div>
        <div className="msg col fs-6 fst-italic fw-bold text-start">{msg}</div>
    </div>
    </>
  )
}
