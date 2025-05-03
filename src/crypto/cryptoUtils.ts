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

// Export a CryptoKey (public or private) to a Base64 string
export async function exportKeyAsBase64(key: CryptoKey): Promise<string> {
    const exported = await window.crypto.subtle.exportKey("spki",key) //spki is a format to which key will be changed
    const exportedAsString = String.fromCharCode(...new Uint8Array(exported)); //convert binary to string
    return btoa(exportedAsString); //Encode as Base64
} 

// Import a public key from a Base64 string
export async function importPublicKeyFromBase64(base64: string): Promise<CryptoKey>{
    const binary = atob(base64); // Decode base64 to bianry
    const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0))); // Convert to Uint8Array

    // Use Web Crypto API to import the key
    return await window.crypto.subtle.importKey(
        "spki",         // Format matches what we used to export
        bytes.buffer,   // The binary key data
        {
        name: "RSA-OAEP",
        hash: "SHA-256"
        },
        true,           // Extractable
        ["encrypt"]     // Key usage: here it is used to encrypt
    );
    }
  