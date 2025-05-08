import React, { useState } from 'react'
import { decryptMessage, encryptMessage } from '../crypto/cryptoUtils';

type Message ={
  from:"Sender" | "Receiver";
  encrypted: string;
  decrypted?: string;
}

type MessageBoardProps = {
    senderPublicKey: CryptoKey | null;
    senderPrivateKey: CryptoKey | null;
    receiverPublicKey: CryptoKey | null;
    receiverPrivateKey: CryptoKey | null;
}

const MessageBoard = ({senderPublicKey,senderPrivateKey,receiverPublicKey,receiverPrivateKey}: MessageBoardProps) => {
    const[messageInput,setMessageInput] = useState<string>("");
    const[messages,setMessages] = useState<Message[]>([]);
    const[error,setError] = useState<string>("");
    // const[encrypted,setEncrypted] = useState<string>("");
    // const[decrypted,setDecrypted] = useState<string>("");
    const [replies, setReplies] = useState<{ [index: number]: string }>({})

    const handleSend = async () =>{
        setError("");
        // setEncrypted("");
        // setDecrypted("");

        if(!receiverPublicKey){
            setError("Receiver Public Key not found")
            return;
        }

        try {
            const encryptedText = await encryptMessage(messageInput,receiverPublicKey)
            const decryptedText = receiverPrivateKey ? await decryptMessage(encryptedText, receiverPrivateKey) : undefined;
            setMessages((prev) => [
              ...prev,
              {
                from: "Sender",
                encrypted: encryptedText,
                decrypted: decryptedText,
              },
            ]);
        } catch (e) {
            setError("Encryption failed.");
        }
    }

    const handleReply = async (index: number) => {
      const replyText = replies[index];
      if (!replyText) return;
      if (!senderPublicKey) {
        setError('Sender Public Key not found');
        return;
      }

      try {
        const encryptedText = await encryptMessage(replyText, senderPublicKey)
        const decryptedText = senderPrivateKey
        ? await decryptMessage(encryptedText, senderPrivateKey)
        : undefined
      setMessages((prev) => [
        ...prev,
        {
          from: 'Receiver',
          encrypted: encryptedText,
          decrypted: decryptedText,
        },
      ])
      setReplies((prev) => ({ ...prev, [index]: '' }))
        
      } catch (e) {
          setError('Reply encryption failed.')
      }
    }




    return (
      <div className="p-4 border rounded shadow max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Encrypted Chat</h2>

      <div className="h-64 overflow-y-auto border p-2 mb-4 bg-gray-50 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-2 rounded ${
              msg.from === 'Sender'
                ? 'bg-blue-100 text-right ml-10'
                : 'bg-green-100 text-left mr-10'
            }`}
          >
            <div className="text-xs text-gray-600 italic mb-1">{msg.from}</div>
            <div className="text-sm break-words">🔒 {msg.encrypted.slice(0, 60)}...</div>
            {msg.decrypted && (
              <div className="mt-1 text-sm text-black">💬 {msg.decrypted}</div>
            )}

            {/* Add reply only to Sender messages */}
            {msg.from === 'Sender' && (
              <div className="mt-2">
                <textarea
                  className="w-full p-2 border text-sm"
                  rows={2}
                  placeholder="Reply..."
                  value={replies[index] || ''}
                  onChange={(e) =>
                    setReplies((prev) => ({ ...prev, [index]: e.target.value }))
                  }
                />
                <button
                  className="mt-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                  onClick={() => handleReply(index)}
                >
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <textarea
        className="w-full h-20 p-2 border mb-3 text-sm"
        placeholder="Type your message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded"
      >
        Send Message
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
    )
}

export default MessageBoard
