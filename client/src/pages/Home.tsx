import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabNavigation from "@/components/TabNavigation";
import PasswordGenerator from "@/components/PasswordGenerator";
import EncryptionTool from "@/components/EncryptionTool";
import HistoryTool from "@/components/HistoryTool";
import { HistoryItem } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("password-tool");
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  const addHistoryItem = (item: HistoryItem) => {
    setHistoryItems((prevItems) => [item, ...prevItems]);
  };

  const clearHistory = () => {
    setHistoryItems([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "password-tool" && (
          <PasswordGenerator addHistoryItem={addHistoryItem} />
        )}
        
        {activeTab === "encryption-tool" && (
          <EncryptionTool addHistoryItem={addHistoryItem} />
        )}
        
        {activeTab === "history-tool" && (
          <HistoryTool historyItems={historyItems} clearHistory={clearHistory} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
