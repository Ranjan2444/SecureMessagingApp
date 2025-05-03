import { generateRSAKeyPair } from "../crypto/cryptoUtils"


const KeyManager = () => {

    const handleGenerateKeys = async () =>{
        const keyPair = await generateRSAKeyPair();

        console.log(keyPair.privateKey)
        console.log(keyPair.publicKey)


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
    </div>
  )
}

export default KeyManager

