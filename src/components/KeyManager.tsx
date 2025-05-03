import { useState } from "react";
import { exportKeyAsBase64, generateRSAKeyPair } from "../crypto/cryptoUtils"


const KeyManager = () => {
    const [publicKeyBase64, setpublicKeyBase64] = useState<string | null>(null);

    const handleGenerateKeys = async () =>{
        const keyPair = await generateRSAKeyPair();

        // console.log(keyPair.privateKey)
        // console.log(keyPair.publicKey)

        const publicKeyStr = await exportKeyAsBase64(keyPair.publicKey)
        
        setpublicKeyBase64(publicKeyStr);

    }

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
         <h2 className="text-2xl font-bold mb-4">Key Manager</h2>

        <button
        onClick={handleGenerateKeys}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
        Generate Key Pair
        </button>

        {publicKeyBase64 && (
        <div className="mt-4">
          <p className="text-green-600 mb-2">Key pair generated successfully!</p>
          <textarea
            className="w-full h-40 p-2 border text-sm"
            readOnly
            value={publicKeyBase64}
          />
        </div>
      )}
    </div>
  )
}

export default KeyManager

