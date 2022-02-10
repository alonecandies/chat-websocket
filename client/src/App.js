/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const host = "http://localhost:3000";

function App() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();

  const socketRef = useRef();

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
      };
      socketRef.current.emit("sendDataClient", msg);

      /*Khi emit('sendDataClient') bên phía server sẽ nhận được sự kiện có tên 'sendDataClient' và handle như câu lệnh trong file index.js
          socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
            socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
          })
    */
      setMessage("");
    }
  };

  const renderMess = mess.map((m, index) => (
    <div
      key={index}
      className={`${m.id === id ? "your-message" : "other-people"} chat-item`}
    >
      {m.content}
    </div>
  ));

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("getId", (data) => {
      setId(data);
    }); // phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat.

    socketRef.current.on("sendDataServer", (dataGot) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
    }); // mỗi khi có tin nhắn thì mess sẽ được render thêm

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="box-chat">
      <div className="box-chat_message">{renderMess}</div>

      <div className="send-box">
        <textarea
          value={message}
          placeholder="Nhập tin nhắn ..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
