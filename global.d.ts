interface UserDataInterface {
  first_name: string;
  last_name: string;
  email: string;
}

interface LinksInterface {
  name: string;
  iconPath: string;
  path: string;
}

interface WalletDetailsInterface {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

declare global {
  UserDataInterface, LinksInterface;
}

// Transaction type with payment_reference
interface TransactionWithReference {
  amount: number;
  metadata?: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name?: string;
  };
  payment_reference: string;
  status: string;
  type: string;
  date: string;
}

// Transaction type without payment_reference
interface TransactionWithoutReference {
  amount: number;
  metadata?: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name?: string;
  };
  status: string;
  type: string;
  date: string;
}

// Create a union type combining both transaction types
type TransactioniInterface =
  | TransactionWithReference
  | TransactionWithoutReference;
