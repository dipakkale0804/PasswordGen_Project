// Password Generator Types
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
  saveToHistory: boolean;
}

// History Types
export type HistoryItemType = "password" | "encrypted";

export interface HistoryItem {
  content: string;
  type: HistoryItemType;
  timestamp: Date;
}
