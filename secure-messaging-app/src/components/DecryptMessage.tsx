import { useState } from "react"
import { decryptMessage } from "../crypto/cryptoUtils"

type DecryptMessageProps = {
    privateKey: CryptoKey | null;
};

const DecryptMessage = ({privateKey}: DecryptMessageProps) => {

    const[encrypted,setEncrypted] = useState<string>("")
    const[decrypted,setDecrypted] = useState<string>("")
    const[error,setError] = useState<string>("")


    const handleDecrypt = async () =>{
        setDecrypted("");
        setError("");

        if (!privateKey) {
            setError("Private key not available. Generate keys first.");
            return;
          }

        try {
            const result = await decryptMessage(encrypted,privateKey);
            setDecrypted(result);
            
        } catch (e) {
            setError("Decryption Failed")  
        }
        
    }



    return (
        <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-3">Decrypt Message</h2>

        <textarea
        placeholder="Paste Base64 Encrypted Message"
        className="w-full h-32 p-2 border mb-3 text-sm"
        value={encrypted}
        onChange={(e) => setEncrypted(e.target.value)}
        />

        <button
        onClick={handleDecrypt}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
        Decrypt Message
        </button>
        {decrypted && (
             <div className="mt-4">
             <p className="text-green-600 mb-1">Decrypted Message:</p>
             <textarea
               className="w-full h-24 p-2 border text-sm"
               readOnly
               value={decrypted}
             />
           </div>
        )}

        {error && <p className="text-red-600 mt-2">{error}</p>}

        </div>
    )
}

export default DecryptMessage
