import { useEffect, useRef, useState } from 'react';
import socket from '@/lib/socket';
import axios from 'axios';
import { Message } from '@/models/messageModel';
import { ReceiverMessageCard, SenderMessageCard } from '../MessagesCard';
import { Search, Send } from 'lucide-react';

interface props {
  userId: string
  recipientId: string
}

export default function SocketChat({ userId, recipientId }: props) {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState<string>('')

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/message?sender=${userId}&reciever=${recipientId}`)
      setMessages(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [recipientId])

  useEffect(() => {
    socket.emit('register', { user_id: userId });
    socket.on('new_message', (data) => {
      fetchMessages()
    });
    return () => {
      socket.off('new_message');
    };
  }, []);

  const sendMessage = async () => {
    try {
      const messageData = {
        message: message,
        sender: userId,
        receiver: recipientId
      }
      await axios.post("/api/message", messageData)
      socket.emit('private_message', {
        sender_id: userId,
        recipient_id: recipientId,
        message: message,
      });
      await fetchMessages()
    } catch (error) {
      console.log(error)
    } finally {
      setMessage('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const searchMessage = async(searchKey: string) => {
    if(searchKey === '') {
      await fetchMessages()
      return
    }
    const searchedMessages = messages.filter((msg) => {
      const messageLower = msg.content.toLowerCase()
      const searchKeyLower = searchKey.toLowerCase()
      return messageLower.includes(searchKeyLower) || searchKeyLower.includes(messageLower)
    })
    setMessages(searchedMessages)
  }

  return (
    <div className="w-full h-full shadow-md p-4 bg-white dark:bg-gray-950  flex flex-col">
      <div className="mb-2 flex items-center gap-2 px-3 py-2 border rounded-full dark:border-gray-600">
        <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            searchMessage(e.target.value)
          }}
          placeholder="Search messages"
          className="flex-1 outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white"
        />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 bg-[url('/chat/chat-bg.avif')] bg-cover bg-center bg-no-repeat">
        {
          messages.map((msg: Message, idx) => (
            <div key={idx}>
              {
                msg.sender === userId ? (
                  <ReceiverMessageCard name={msg.sender} content={msg.content} time={msg.createdAt} />
                ) : (
                  <SenderMessageCard name={msg.receiver} content={msg.content} time={msg.createdAt} />
                )
              }
            </div>
          )
          )
        }
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center border rounded-full px-3 py-2 mt-2 dark:border-gray-600">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && message.trim()) {
              sendMessage();
            }
          }}
          placeholder="Type a message"
          className="flex-1 outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white"
        />
        <button onClick={sendMessage} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


