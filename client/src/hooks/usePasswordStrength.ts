import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";

interface PasswordStrength {
  score: number;
  strength: string;
  strengthText: string;
  strengthClass: string;
}

export default function usePasswordStrength(password: string): PasswordStrength {
  const [result, setResult] = useState<PasswordStrength>({
    score: 0,
    strength: "Weak",
    strengthText: "Weak",
    strengthClass: "strength-weak"
  });
  
  useEffect(() => {
    if (!password) {
      setResult({
        score: 0,
        strength: "Weak",
        strengthText: "Weak",
        strengthClass: "strength-weak"
      });
      return;
    }
    
    // Analyze password strength
    const analysis = zxcvbn(password);
    
    // Map the score (0-4) to a descriptive strength level
    let strength = "Weak";
    let strengthText = "Weak";
    let strengthClass = "strength-weak";
    
    switch (analysis.score) {
      case 0:
      case 1:
        strength = "weak";
        strengthText = "Weak";
        strengthClass = "strength-weak";
        break;
      case 2:
      case 3:
        strength = "medium";
        strengthText = "Medium";
        strengthClass = "strength-medium";
        break;
      case 4:
        strength = "strong";
        strengthText = "Strong";
        strengthClass = "strength-strong";
        break;
    }
    
    setResult({
      score: analysis.score,
      strength,
      strengthText,
      strengthClass
    });
  }, [password]);
  
  return result;
}
