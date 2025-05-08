import { useState } from "react";
import { exportKeyAsBase64, generateRSAKeyPair } from "../crypto/cryptoUtils"

type KeyManagerProps = {
  user: string;
  setPrivateKey: (key: CryptoKey) => void;
  setPublicKey: (key: CryptoKey) => void;
};

const KeyManager = ({user,setPrivateKey,setPublicKey}: KeyManagerProps) => {
    const [publicKeyBase64, setpublicKeyBase64] = useState<string | null>(null);

    const handleGenerateKeys = async () =>{
        const keyPair = await generateRSAKeyPair();

        // console.log(keyPair.privateKey)
        // console.log(keyPair.publicKey)

        const publicKeyStr = await exportKeyAsBase64(keyPair.publicKey)
        
        setpublicKeyBase64(publicKeyStr);
        setPrivateKey(keyPair.privateKey);
        setPublicKey(keyPair.publicKey);

    }

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-6">
         <h2 className="text-2xl font-bold mb-4">{user} Key Manager</h2>

        <button
        onClick={handleGenerateKeys}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
        Generate {user} Key Pair
        </button>

        {publicKeyBase64 && (
        <div className="mt-2 text-sm break-all">
          <strong>{user} Public Key:</strong>
          <div>{publicKeyBase64}</div>
        </div>
      )}
    </div>
  )
}

export default KeyManager

