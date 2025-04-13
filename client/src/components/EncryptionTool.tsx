import { useState } from "react";
import { Lock, Unlock, Copy, Trash, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { encryptText, decryptText } from "@/lib/encryption";
import { HistoryItem } from "@/types";

interface EncryptionToolProps {
  addHistoryItem: (item: HistoryItem) => void;
}

export default function EncryptionTool({ addHistoryItem }: EncryptionToolProps) {
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [encryptionMethod, setEncryptionMethod] = useState("AES-256");
  const [outputFormat, setOutputFormat] = useState("Base64");
  const [isEncrypted, setIsEncrypted] = useState(false);
  
  const handleEncrypt = () => {
    if (!inputText) {
      toast({
        title: "No input text",
        description: "Please enter text to encrypt",
        variant: "destructive"
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "No encryption password",
        description: "Please enter an encryption password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const encrypted = encryptText(inputText, password, encryptionMethod, outputFormat);
      setOutputText(encrypted);
      setIsEncrypted(true);
      
      addHistoryItem({
        content: encrypted,
        type: "encrypted",
        timestamp: new Date()
      });
      
      toast({
        title: "Encryption successful",
        description: "Text has been encrypted"
      });
    } catch (error) {
      toast({
        title: "Encryption failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  };
  
  const handleDecrypt = () => {
    if (!inputText) {
      toast({
        title: "No input text",
        description: "Please enter text to decrypt",
        variant: "destructive"
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "No decryption password",
        description: "Please enter the decryption password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const decrypted = decryptText(inputText, password, encryptionMethod, outputFormat);
      setOutputText(decrypted);
      setIsEncrypted(false);
      
      toast({
        title: "Decryption successful",
        description: "Text has been decrypted"
      });
    } catch (error) {
      toast({
        title: "Decryption failed",
        description: "Unable to decrypt. Please check your password and input text.",
        variant: "destructive"
      });
    }
  };
  
  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };
  
  const copyToClipboard = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText).then(() => {
      toast({
        title: "Copied!",
        description: "Output copied to clipboard",
        duration: 2000,
      });
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-in">
      {/* Text Input & Controls */}
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Encrypt/Decrypt Text</h2>
            
            {/* Encryption Options */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-4 mb-4">
                <div>
                  <Label htmlFor="encryption-method" className="mb-1">Encryption Method</Label>
                  <Select 
                    value={encryptionMethod} 
                    onValueChange={setEncryptionMethod}
                  >
                    <SelectTrigger className="w-full bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AES-256">AES-256</SelectItem>
                      <SelectItem value="Triple DES">Triple DES</SelectItem>
                      <SelectItem value="Blowfish">Blowfish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="output-format" className="mb-1">Output Format</Label>
                  <Select 
                    value={outputFormat} 
                    onValueChange={setOutputFormat}
                  >
                    <SelectTrigger className="w-full bg-slate-900 border-slate-700">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Base64">Base64</SelectItem>
                      <SelectItem value="Hex">Hex</SelectItem>
                      <SelectItem value="UTF-8">UTF-8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Encryption Password */}
              <div className="mb-6">
                <Label htmlFor="encryption-password" className="mb-1">Encryption Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="encryption-password"
                    className="bg-slate-900 border-slate-700 pr-10"
                    placeholder="Enter encryption key"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">Use a strong password for maximum security</p>
              </div>
            </div>
            
            {/* Text Input */}
            <div className="mb-4">
              <Label htmlFor="text-input" className="mb-1">Input Text</Label>
              <Textarea 
                id="text-input" 
                rows={6} 
                className="bg-slate-900 border-slate-700"
                placeholder="Enter text to encrypt or decrypt"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleEncrypt} className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Encrypt
              </Button>
              <Button onClick={handleDecrypt} variant="secondary" className="flex items-center">
                <Unlock className="h-5 w-5 mr-2" />
                Decrypt
              </Button>
              <Button onClick={handleClear} variant="secondary" className="flex items-center">
                <Trash className="h-5 w-5 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Output & Information */}
      <div>
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Output</h2>
            <div className="bg-slate-900 p-4 rounded-lg font-mono text-emerald-400 h-40 overflow-y-auto text-sm mb-3">
              {outputText || "Output will appear here"}
            </div>
            <Button 
              onClick={copyToClipboard} 
              variant="secondary" 
              className="w-full flex items-center justify-center"
              disabled={!outputText}
            >
              <Copy className="h-5 w-5 mr-2" />
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">Security Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">
                  {encryptionMethod === "AES-256" 
                    ? "AES-256 is a symmetric encryption algorithm used by governments for sensitive information."
                    : encryptionMethod === "Triple DES" 
                    ? "Triple DES applies the DES cipher algorithm three times to each data block for enhanced security."
                    : "Blowfish is a symmetric block cipher designed as a fast, free alternative to existing encryption algorithms."}
                </span>
              </div>
              <div className="flex items-start">
                <Info className="h-5 w-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">All encryption/decryption occurs locally in your browser. Your data never leaves your device.</span>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-slate-300">Always remember your encryption password. If lost, encrypted data <span className="font-semibold">cannot be recovered</span>.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
