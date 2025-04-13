import { Trash, Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HistoryItem } from "@/types";
import { formatTimestamp } from "@/lib/utils";

interface HistoryToolProps {
  historyItems: HistoryItem[];
  clearHistory: () => void;
}

export default function HistoryTool({ historyItems, clearHistory }: HistoryToolProps) {
  const { toast } = useToast();
  
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
        duration: 2000,
      });
    });
  };
  
  return (
    <div className="fade-in">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Password & Encryption History</h2>
            <div>
              <Button 
                variant="secondary" 
                className="flex items-center text-sm"
                onClick={clearHistory}
                disabled={historyItems.length === 0}
              >
                <Trash className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </div>
          </div>
          
          <div className="border-b border-slate-700 pb-3 mb-4">
            <div className="flex items-center justify-between text-sm text-slate-400 font-medium">
              <div className="w-5/12 lg:w-6/12">Item</div>
              <div className="w-3/12 lg:w-2/12">Type</div>
              <div className="w-3/12 lg:w-3/12">Timestamp</div>
              <div className="w-1/12 lg:w-1/12 text-center">Actions</div>
            </div>
          </div>
          
          {historyItems.length > 0 ? (
            historyItems.map((item, index) => (
              <div key={index} className="border-b border-slate-700 py-3 hover:bg-slate-800/50 transition-colors rounded-md -mx-2 px-2">
                <div className="flex items-center justify-between">
                  <div className="w-5/12 lg:w-6/12 truncate pr-2">
                    <div className="font-mono text-sm text-emerald-400">{item.content}</div>
                  </div>
                  <div className="w-3/12 lg:w-2/12">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.type === "password" 
                        ? "bg-blue-500/20 text-blue-400" 
                        : "bg-purple-500/20 text-purple-400"
                    }`}>
                      {item.type === "password" ? "Password" : "Encrypted"}
                    </span>
                  </div>
                  <div className="w-3/12 lg:w-3/12 text-sm text-slate-400">
                    {formatTimestamp(item.timestamp)}
                  </div>
                  <div className="w-1/12 lg:w-1/12 flex justify-center">
                    <button 
                      className="text-slate-400 hover:text-white p-1" 
                      title="Copy to clipboard"
                      onClick={() => copyToClipboard(item.content)}
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-300 mb-1">No History Yet</h3>
              <p className="text-sm text-slate-400">Generated passwords and encryption outputs will appear here</p>
            </div>
          )}
          
          <div className="mt-6 text-center text-xs text-slate-500">
            Note: History is stored in your browser's local storage and will be cleared when you close your browser session.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
