from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, date
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///budget.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

# Database Model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(10), nullable=False)  # income/expense
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'description': self.description,
            'type': self.type,
            'category': self.category,
            'date': self.date.isoformat(),
            'created_at': self.created_at.isoformat()
        }

# Routes
@app.route('/api/transactions', methods=['GET', 'POST'])
def handle_transactions():
    if request.method == 'GET':
        transactions = Transaction.query.order_by(Transaction.date.desc()).all()
        return jsonify([t.to_dict() for t in transactions])
    
    elif request.method == 'POST':
        data = request.get_json()
        
        try:
            transaction = Transaction(
                amount=float(data['amount']),
                description=data['description'],
                type=data['type'],
                category=data['category'],
                date=datetime.strptime(data['date'], '%Y-%m-%d').date()
            )
            
            db.session.add(transaction)
            db.session.commit()
            
            return jsonify(transaction.to_dict()), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 400

@app.route('/api/balance', methods=['GET'])
def get_balance():
    transactions = Transaction.query.all()
    
    total_income = sum(t.amount for t in transactions if t.type == 'income')
    total_expenses = sum(t.amount for t in transactions if t.type == 'expense')
    balance = total_income - total_expenses
    
    return jsonify({
        'balance': balance,
        'total_income': total_income,
        'total_expenses': total_expenses
    })

@app.route('/api/summary', methods=['GET'])
def get_summary():
    # Get current month transactions
    current_month = date.today().month
    current_year = date.today().year
    
    transactions = Transaction.query.filter(
        db.extract('month', Transaction.date) == current_month,
        db.extract('year', Transaction.date) == current_year
    ).all()
    
    monthly_income = sum(t.amount for t in transactions if t.type == 'income')
    monthly_expenses = sum(t.amount for t in transactions if t.type == 'expense')
    
    return jsonify({
        'monthly_income': monthly_income,
        'monthly_expenses': monthly_expenses,
        'monthly_balance': monthly_income - monthly_expenses,
        'transaction_count': len(transactions)
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)