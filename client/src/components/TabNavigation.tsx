import { Key, Lock, Clock } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="mb-6 border-b border-slate-700">
      <div className="flex flex-wrap -mb-px">
        <button 
          onClick={() => setActiveTab("password-tool")}
          className={`px-6 py-3 font-medium text-sm border-b-2 flex items-center ${
            activeTab === "password-tool" 
              ? "text-white border-primary" 
              : "text-slate-400 hover:text-white hover:border-slate-400 border-transparent"
          }`}
        >
          <Key className="h-5 w-5 mr-2" />
          Password Generator
        </button>
        <button 
          onClick={() => setActiveTab("encryption-tool")}
          className={`px-6 py-3 font-medium text-sm border-b-2 flex items-center ${
            activeTab === "encryption-tool" 
              ? "text-white border-primary" 
              : "text-slate-400 hover:text-white hover:border-slate-400 border-transparent"
          }`}
        >
          <Lock className="h-5 w-5 mr-2" />
          Encryption Tool
        </button>
        <button 
          onClick={() => setActiveTab("history-tool")}
          className={`px-6 py-3 font-medium text-sm border-b-2 flex items-center ${
            activeTab === "history-tool" 
              ? "text-white border-primary" 
              : "text-slate-400 hover:text-white hover:border-slate-400 border-transparent"
          }`}
        >
          <Clock className="h-5 w-5 mr-2" />
          History
        </button>
      </div>
    </div>
  );
}
