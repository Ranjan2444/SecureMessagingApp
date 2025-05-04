import { useState } from "react"
import { importPublicKeyFromBase64 } from "../crypto/cryptoUtils";


const PublicKeyInput = () => { 
    const [base64Key,setBase64Key] = useState("");
    const [imported, setImported] = useState(false);
    const [error, setError] = useState("");


    const handleImport = async () => {
        setError("")
        setImported(false)

        try {
            const publicKey = await importPublicKeyFromBase64(base64Key);
            console.log("Imported Public key:", publicKey);
            setImported(true);
            
        } catch (e) {
            setError("Invalid key.")
        }
    }

    return (
        <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-3">Import Public Key</h2>

        <textarea
        placeholder="Paste Base64 public key here"
        className="w-full h-32 p-2 border mb-3 text-sm"
        value={base64Key}
        onChange={(e) => setBase64Key(e.target.value)}
        />

        <button
        onClick={handleImport}
        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
        >
        Import Key
        </button>

        {imported && <p className="text-green-600 mt-3">Public key imported successfully!</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
    )
}

export default PublicKeyInput
