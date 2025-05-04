import { useState } from "react"
import { encryptMessage, importPublicKeyFromBase64 } from "../crypto/cryptoUtils";


const EncryptMessage = () => {

    const[base64Key, setBase64Key] = useState<string>("");
    const[message, setMessage] = useState<string>("");
    const[encrypted, setEncrypted] = useState<string>("");
    const[error, setError] = useState<string>("");


    const handleEncrypt = async () => {
        setBase64Key("");
        setEncrypted("");

        try {
            const publicKey = await importPublicKeyFromBase64(base64Key);
            const encryptedText = await encryptMessage(message,publicKey);
            setEncrypted(encryptedText);
                
        } catch (e) {
            setError("Encryption Failed")
        }
        
    }



    return (
        <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-3">🔐 Encrypt a Message</h2>

        <textarea
            className="w-full h-24 p-2 border mb-3 text-sm"
            placeholder="Paste Base64 Public Key"
            value={base64Key}
            onChange={(e) => setBase64Key(e.target.value)}
        />

        <textarea
            className="w-full h-20 p-2 border mb-3 text-sm"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />

        <button
            onClick={handleEncrypt}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded"
        >
            Encrypt Message
        </button>
        {encrypted && (
             <div className="mt-4">
             <p className="text-green-600 mb-1">Encrypted Output:</p>
             <textarea
               className="w-full h-32 p-2 border text-xs"
               readOnly
               value={encrypted}
             />
           </div>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
    )
}

export default EncryptMessage
