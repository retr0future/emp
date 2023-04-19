import data from '../data.json';

class PaymentTransactions {
  constructor() {
    this.transactions = data.payment_transactions;
  }

  getTransactions() {
    return this.transactions;
  }

  getTransaction(id) {
    return this.transactions.find(transaction => transaction.id === id);
  }
}
export default PaymentTransactions;
