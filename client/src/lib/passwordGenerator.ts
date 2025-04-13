import { PasswordOptions } from "@/types";

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const SIMILAR_CHARS = "iIlL1oO0";

export function generatePassword(options: PasswordOptions): string {
  let charset = "";
  let password = "";
  
  // Build charset based on selected options
  if (options.includeUppercase) charset += UPPERCASE_CHARS;
  if (options.includeLowercase) charset += LOWERCASE_CHARS;
  if (options.includeNumbers) charset += NUMBER_CHARS;
  if (options.includeSymbols) charset += SYMBOL_CHARS;
  
  // Remove similar characters if that option is selected
  if (options.excludeSimilar) {
    for (const char of SIMILAR_CHARS) {
      charset = charset.replace(char, "");
    }
  }
  
  // Handle edge case where no character set is selected
  if (charset.length === 0) {
    charset = LOWERCASE_CHARS; // Fallback to lowercase
  }
  
  // Generate the password
  const getRandomChar = () => charset.charAt(Math.floor(Math.random() * charset.length));
  
  for (let i = 0; i < options.length; i++) {
    password += getRandomChar();
  }
  
  // Ensure at least one character from each selected set is included
  let missingChars = [];
  
  if (options.includeUppercase && !/[A-Z]/.test(password)) {
    missingChars.push(UPPERCASE_CHARS.charAt(Math.floor(Math.random() * UPPERCASE_CHARS.length)));
  }
  
  if (options.includeLowercase && !/[a-z]/.test(password)) {
    missingChars.push(LOWERCASE_CHARS.charAt(Math.floor(Math.random() * LOWERCASE_CHARS.length)));
  }
  
  if (options.includeNumbers && !/[0-9]/.test(password)) {
    missingChars.push(NUMBER_CHARS.charAt(Math.floor(Math.random() * NUMBER_CHARS.length)));
  }
  
  if (options.includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    missingChars.push(SYMBOL_CHARS.charAt(Math.floor(Math.random() * SYMBOL_CHARS.length)));
  }
  
  // Replace random characters in the password with the missing characters
  for (let i = 0; i < missingChars.length; i++) {
    const position = Math.floor(Math.random() * options.length);
    password = password.substring(0, position) + missingChars[i] + password.substring(position + 1);
  }
  
  return password;
}

// Function to check if a password meets the criteria
export function passwordMeetsCriteria(password: string, options: PasswordOptions): boolean {
  if (password.length < options.length) return false;
  
  if (options.includeUppercase && !/[A-Z]/.test(password)) return false;
  if (options.includeLowercase && !/[a-z]/.test(password)) return false;
  if (options.includeNumbers && !/[0-9]/.test(password)) return false;
  if (options.includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) return false;
  
  if (options.excludeSimilar) {
    for (const char of SIMILAR_CHARS) {
      if (password.includes(char)) return false;
    }
  }
  
  return true;
}
