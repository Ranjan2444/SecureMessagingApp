
import { useState } from 'react'
import EncryptMessage from './components/EncryptMessage'
import KeyManager from './components/KeyManager'
import PublicKeyInput from './components/PublicKeyInput'
import DecryptMessage from './components/DecryptMessage';

function App() {
  const [privateKey, setPrivateKey] = useState<CryptoKey | null>(null);

  return (
    <>
      <KeyManager setPrivateKey={setPrivateKey}/>
      <PublicKeyInput/>
      <EncryptMessage/>
      <DecryptMessage privateKey = {privateKey}/>
    </>
  )
}

export default App
