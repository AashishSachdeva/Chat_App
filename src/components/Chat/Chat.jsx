import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase'
import './Chat.css'
import { useStateValue } from '../../StateProvider';



function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("")
    const {roomId} =useParams();
    const [roomName, setRoomName] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] = useStateValue();

    useEffect (()=>{
        if (roomId){
            db.collection('Rooms').doc(roomId).onSnapshot(snapshot =>(
                setRoomName(snapshot.data().name)));
            db.collection("Rooms").doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=> (
                    setMessages(snapshot.docs.map(doc=>doc.data()))
                )
                )

        }
    },[roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed  ', input);
        db.collection('Rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }
    const typed = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(
                        messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton><SearchOutlined /></IconButton>
                    <IconButton><AttachFile /></IconButton>
                    <IconButton><MoreVert /></IconButton>
                </div>

            </div>
            <div className="chat_body">
                {messages.map(message => (
                
            
                <p className={`chat_message ${message.name===user.displayName &&
                    `chat_reciever`}`}>
                    <span className="chat_name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="chat_timeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                
                ))}


            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value={input} 
                    onChange={typed} 
                    type="text" 
                    placeholder="Type a message" />
                    <button type="submit" onClick={sendMessage}>Send A message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
