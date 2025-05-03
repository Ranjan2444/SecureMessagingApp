// Generates an RSA key pair using the Web Crypto API
export async function generateRSAKeyPair(): Promise<CryptoKeyPair> {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",              // Encryption algorithm
        modulusLength: 2048,           // Key size (2048 bits is standard)
        publicExponent: new Uint8Array([1, 0, 1]), // Common public exponent (65537)
        hash: "SHA-256",               // Hashing algorithm for padding
      },
      true,                            // Allow keys to be exported
      ["encrypt", "decrypt"]          // Define what the keys can do
    );
  
    return keyPair; // Returns an object with publicKey and privateKey
  }
  