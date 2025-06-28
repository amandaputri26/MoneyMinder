import React from 'react';
import './Summary.css';

const Summary = ({ balance, summary }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getCurrentMonth = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (!balance || !summary) {
    return (
      <div className="summary">
        <h2>Summary</h2>
        <div className="loading-summary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="summary">
      <h2>Financial Summary</h2>
      
      {/* Current Balance */}
      <div className="balance-card">
        <h3>Current Balance</h3>
        <div className={`balance-amount ${balance.balance >= 0 ? 'positive' : 'negative'}`}>
          {formatAmount(balance.balance)}
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="monthly-summary">
        <h4>{getCurrentMonth()} Summary</h4>
        <div className="summary-grid">
          <div className="summary-item income">
            <div className="summary-label">Income</div>
            <div className="summary-value">{formatAmount(summary.monthly_income)}</div>
          </div>
          <div className="summary-item expense">
            <div className="summary-label">Expenses</div>
            <div className="summary-value">{formatAmount(summary.monthly_expenses)}</div>
          </div>
          <div className="summary-item balance">
            <div className="summary-label">Monthly Balance</div>
            <div className={`summary-value ${summary.monthly_balance >= 0 ? 'positive' : 'negative'}`}>
              {formatAmount(summary.monthly_balance)}
            </div>
          </div>
        </div>
      </div>

      {/* Total Overview */}
      <div className="total-overview">
        <h4>Total Overview</h4>
        <div className="overview-grid">
          <div className="overview-item">
            <span>Total Income:</span>
            <span className="income">{formatAmount(balance.total_income)}</span>
          </div>
          <div className="overview-item">
            <span>Total Expenses:</span>
            <span className="expense">{formatAmount(balance.total_expenses)}</span>
          </div>
          <div className="overview-item">
            <span>Transactions:</span>
            <span>{summary.transaction_count} this month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;