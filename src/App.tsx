
import { useState } from 'react'
import EncryptMessage from './components/EncryptMessage'
import KeyManager from './components/KeyManager'
import PublicKeyInput from './components/PublicKeyInput'
import DecryptMessage from './components/DecryptMessage';
import MessageBoard from './components/MessageBoard';

function App() {
  const [senderPublicKey, setSenderPublicKey] = useState<CryptoKey | null>(null);
  const [senderPrivateKey, setSenderPrivateKey] = useState<CryptoKey | null>(null);

  const [receiverPublicKey, setReceiverPublicKey] = useState<CryptoKey | null>(null);
  const [receiverPrivateKey, setReceiverPrivateKey] = useState<CryptoKey | null>(null);

  return (
    <>
      <KeyManager user="Sender" setPublicKey={setSenderPublicKey} setPrivateKey={setSenderPrivateKey}/>
      <KeyManager user="Receiver" setPublicKey={setReceiverPublicKey} setPrivateKey={setReceiverPrivateKey}/>

      {/* <PublicKeyInput/> */}
      {/* <EncryptMessage/>
      <DecryptMessage privateKey = {receiverPrivateKey}/> */}
       <MessageBoard
          senderPublicKey={senderPublicKey}
          senderPrivateKey={senderPrivateKey}
          receiverPublicKey={receiverPublicKey}
          receiverPrivateKey={receiverPrivateKey}
        />
    </>
  )
}

export default App
