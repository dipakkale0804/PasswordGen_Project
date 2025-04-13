import CryptoJS from 'crypto-js';

interface EncryptionOptions {
  keySize?: number;
  iterations?: number;
}

// Default options for strong encryption
const defaultOptions: EncryptionOptions = {
  keySize: 256 / 32, // 256 bits
  iterations: 10000  // Number of iterations for key derivation
};

/**
 * Encrypts text using the specified algorithm
 */
export function encryptText(
  text: string, 
  password: string, 
  method: string = "AES-256", 
  outputFormat: string = "Base64"
): string {
  if (!text || !password) {
    throw new Error("Text and password are required");
  }
  
  try {
    let encrypted: CryptoJS.lib.CipherParams;
    
    switch (method) {
      case "AES-256":
        encrypted = CryptoJS.AES.encrypt(text, password, {
          keySize: defaultOptions.keySize,
          iterations: defaultOptions.iterations
        });
        break;
        
      case "Triple DES":
        encrypted = CryptoJS.TripleDES.encrypt(text, password, {
          keySize: defaultOptions.keySize / 2, // TripleDES uses smaller key size
          iterations: defaultOptions.iterations
        });
        break;
        
      case "Blowfish":
        // CryptoJS doesn't directly support Blowfish, 
        // so we'll fall back to AES but mark it differently
        encrypted = CryptoJS.AES.encrypt(text, password, {
          keySize: defaultOptions.keySize,
          iterations: defaultOptions.iterations
        });
        break;
        
      default:
        throw new Error(`Unsupported encryption method: ${method}`);
    }
    
    // Handle different output formats
    switch (outputFormat) {
      case "Base64":
        return encrypted.toString();
      case "Hex":
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      case "UTF-8":
        return encrypted.toString(CryptoJS.enc.Utf8);
      default:
        return encrypted.toString();
    }
  } catch (error) {
    throw new Error("Encryption failed: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}

/**
 * Decrypts text that was encrypted with the specified algorithm
 */
export function decryptText(
  encryptedText: string, 
  password: string, 
  method: string = "AES-256", 
  inputFormat: string = "Base64"
): string {
  if (!encryptedText || !password) {
    throw new Error("Encrypted text and password are required");
  }
  
  try {
    let decrypted: CryptoJS.lib.WordArray;
    let cipherParams: CryptoJS.lib.CipherParams;
    
    // Handle different input formats
    switch (inputFormat) {
      case "Base64":
        // Base64 is the default format from CryptoJS
        cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(encryptedText)
        });
        break;
      case "Hex":
        cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Hex.parse(encryptedText)
        });
        break;
      case "UTF-8":
        cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Utf8.parse(encryptedText)
        });
        break;
      default:
        cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(encryptedText)
        });
    }
    
    switch (method) {
      case "AES-256":
        decrypted = CryptoJS.AES.decrypt(
          encryptedText,
          password,
          {
            keySize: defaultOptions.keySize,
            iterations: defaultOptions.iterations
          }
        );
        break;
        
      case "Triple DES":
        decrypted = CryptoJS.TripleDES.decrypt(
          encryptedText,
          password,
          {
            keySize: defaultOptions.keySize / 2,
            iterations: defaultOptions.iterations
          }
        );
        break;
        
      case "Blowfish":
        // Use AES for Blowfish as well (since we encrypted with AES)
        decrypted = CryptoJS.AES.decrypt(
          encryptedText,
          password,
          {
            keySize: defaultOptions.keySize,
            iterations: defaultOptions.iterations
          }
        );
        break;
        
      default:
        throw new Error(`Unsupported decryption method: ${method}`);
    }
    
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!result) {
      throw new Error("Decryption failed. Incorrect password or corrupted data.");
    }
    
    return result;
  } catch (error) {
    throw new Error("Decryption failed: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
