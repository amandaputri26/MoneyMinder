import React, { useEffect, useState } from 'react';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import axios from 'axios';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [summary, setSummary] = useState(null);

  const fetchData = async () => {
    try {
      const [transRes, balanceRes, summaryRes] = await Promise.all([
        axios.get('http://backend:5000/api/transactions'),
        axios.get('/api/balance'),
        axios.get('/api/summary')
      ]);

      setTransactions(transRes.data);
      setBalance(balanceRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h1>MoneyMinder</h1>
      <AddTransaction onTransactionAdded={fetchData} />
      <Summary balance={balance} summary={summary} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default App;
