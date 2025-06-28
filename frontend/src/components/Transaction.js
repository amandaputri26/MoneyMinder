import React from 'react';

const Transaction = ({ transaction }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className={`transaction-item ${transaction.type}`}>
      <div className="transaction-main">
        <div className="transaction-info">
          <h4 className="transaction-description">{transaction.description}</h4>
          <div className="transaction-meta">
            <span className="transaction-category">{transaction.category}</span>
            <span className="transaction-date">{formatDate(transaction.date)}</span>
          </div>
        </div>
        <div className="transaction-amount">
          <span className={`amount ${transaction.type}`}>
            {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Transaction;