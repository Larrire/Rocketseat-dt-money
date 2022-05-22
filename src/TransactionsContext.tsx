import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from './service/api'

interface Transaction {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

type NewTransaction = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: NewTransaction) => Promise<void>
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export const TransactionsProvider = ({children}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  
  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, [])

  async function createTransaction(newTransaction: NewTransaction) {
    const response = await api.post('/transactions', {
      ...newTransaction,
      createdAt: new Date()
    });
    
    const { transaction } = response.data

    setTransactions(
      [...transactions, transaction]
    )
  }

  return <TransactionsContext.Provider value={ {transactions, createTransaction} }>
    {children}
  </TransactionsContext.Provider>
}