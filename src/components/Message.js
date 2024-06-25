import React, { useState, useEffect } from 'react';
import getContract from '../contract';

const Message = () => {
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    const { contract } = await getContract();
    if (contract) {
      await contract.sendMessage(recipient, content);
      setContent('');
      setRecipient('');
      loadMessages();
    }
  };

  const loadMessages = async () => {
    const { contract, signer } = await getContract();
    if (contract && signer) {
      const signerAddress = await signer.getAddress();
      const receivedMessages = await contract.getMessages(signerAddress);
      setMessages(receivedMessages.map(message => ({
        ...message,
        id: Number(message.id),
        from: message.from,
        to: message.to,
        content: message.content,
        createdAt: Number(message.createdAt),
      })));
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient Address"
        className="border p-2 w-full mb-4"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Message Content"
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSendMessage} className="bg-lime-400 text-gray-100 px-4 py-2 rounded">
        Send Message
      </button>

      <h2 className="text-xl font-semibold mb-4 mt-8">Received Messages</h2>
      <div className="mt-8 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="border p-4 rounded shadow-sm">
            <p className="text-lg">{message.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              <span>From: {message.from}</span><br />
              <span>To: {message.to}</span><br />
              <span>Created At: {new Date(message.createdAt * 1000).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
