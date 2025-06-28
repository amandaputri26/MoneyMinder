import React from 'react';
import Transaction from './Transaction';
import './TransactionList.css';

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-list">
        <h2>Recent Transactions</h2>
        <div className="empty-state">
          <p>No transactions yet. Add your first transaction above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h2>Recent Transactions ({transactions.length})</h2>
      <div className="transactions-container">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;