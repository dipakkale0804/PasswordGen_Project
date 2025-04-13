import { useState, useRef, useEffect } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generatePassword } from "@/lib/passwordGenerator";
import { PasswordOptions, HistoryItem } from "@/types";
import usePasswordStrength from "@/hooks/usePasswordStrength";

interface PasswordGeneratorProps {
  addHistoryItem: (item: HistoryItem) => void;
}

export default function PasswordGenerator({ addHistoryItem }: PasswordGeneratorProps) {
  const { toast } = useToast();
  const [password, setPassword] = useState<string>("");
  const [showCopied, setShowCopied] = useState<boolean>(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 20,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    saveToHistory: true
  });
  
  const { strength, strengthText, strengthClass } = usePasswordStrength(password);
  
  // Generate password on initial render
  useEffect(() => {
    generateNewPassword();
  }, []);
  
  const generateNewPassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
        duration: 2000,
      });
      
      if (options.saveToHistory) {
        addHistoryItem({
          content: password,
          type: "password",
          timestamp: new Date(),
        });
      }
    });
  };
  
  const handleOptionChange = (key: keyof PasswordOptions, value: boolean | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
      {/* Password Output Card */}
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Generated Password</h2>
            
            {/* Password Display */}
            <div className="relative">
              <div className="flex items-center mb-2">
                <div className="flex-grow">
                  <div className="bg-slate-900 p-4 rounded-lg font-mono font-medium tracking-wider text-lg text-emerald-400 overflow-x-auto whitespace-nowrap">
                    {password}
                  </div>
                </div>
                <div className="flex-shrink-0 ml-3 relative">
                  <Button variant="default" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-5 w-5" />
                  </Button>
                  {showCopied && (
                    <div className="absolute bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg transition-opacity duration-200" style={{ top: '-30px', right: '0' }}>
                      Copied!
                    </div>
                  )}
                </div>
              </div>
              
              {/* Password Strength */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Password Strength</span>
                  <span className={
                    strengthClass === "strength-weak" ? "text-destructive" :
                    strengthClass === "strength-medium" ? "text-orange-400" :
                    "text-emerald-400"
                  }>
                    {strengthText}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full overflow-hidden h-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      strengthClass === "strength-weak" ? "bg-destructive w-1/3" :
                      strengthClass === "strength-medium" ? "bg-orange-400 w-2/3" :
                      "bg-emerald-400 w-full"
                    }`}
                  ></div>
                </div>
              </div>
              
              {/* Generate Button */}
              <Button
                className="w-full py-3 px-4 flex items-center justify-center"
                onClick={generateNewPassword}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Generate New Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Password Options */}
      <div>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Password Options</h2>
            
            {/* Length Slider */}
            <div className="mb-5">
              <div className="flex justify-between mb-1">
                <label htmlFor="password-length" className="text-sm font-medium text-slate-300">
                  Length
                </label>
                <span className="text-sm text-slate-300">{options.length} characters</span>
              </div>
              <Slider 
                id="password-length"
                min={8}
                max={64}
                step={1}
                value={[options.length]}
                onValueChange={(value) => handleOptionChange("length", value[0])}
                className="my-4"
              />
            </div>
            
            {/* Checkboxes */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-uppercase" 
                  checked={options.includeUppercase}
                  onCheckedChange={(checked) => 
                    handleOptionChange("includeUppercase", Boolean(checked))
                  }
                />
                <label htmlFor="include-uppercase" className="text-sm font-medium text-slate-300">
                  Include Uppercase
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-lowercase" 
                  checked={options.includeLowercase}
                  onCheckedChange={(checked) => 
                    handleOptionChange("includeLowercase", Boolean(checked))
                  }
                />
                <label htmlFor="include-lowercase" className="text-sm font-medium text-slate-300">
                  Include Lowercase
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-numbers" 
                  checked={options.includeNumbers}
                  onCheckedChange={(checked) => 
                    handleOptionChange("includeNumbers", Boolean(checked))
                  }
                />
                <label htmlFor="include-numbers" className="text-sm font-medium text-slate-300">
                  Include Numbers
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-symbols" 
                  checked={options.includeSymbols}
                  onCheckedChange={(checked) => 
                    handleOptionChange("includeSymbols", Boolean(checked))
                  }
                />
                <label htmlFor="include-symbols" className="text-sm font-medium text-slate-300">
                  Include Symbols
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exclude-similar" 
                  checked={options.excludeSimilar}
                  onCheckedChange={(checked) => 
                    handleOptionChange("excludeSimilar", Boolean(checked))
                  }
                />
                <label htmlFor="exclude-similar" className="text-sm font-medium text-slate-300">
                  Exclude Similar Characters (i, l, 1, o, 0)
                </label>
              </div>
            </div>
            
            {/* Save to History */}
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="save-to-history" 
                checked={options.saveToHistory}
                onCheckedChange={(checked) => 
                  handleOptionChange("saveToHistory", Boolean(checked))
                }
              />
              <label htmlFor="save-to-history" className="text-sm font-medium text-slate-300">
                Save to History
              </label>
            </div>
            
            <div className="border-t border-slate-700 pt-4">
              <div className="text-xs text-slate-400 mb-3 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>All operations are performed locally in your browser. No data is sent to any server.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
