const errorClassMap = {
  'Module::SystemError': 'System',
  'Module::RemoteError': 'Remote',
  'Module::ConfigurationError': 'Unknown'
};
export const transactionsMapper = (transactions) => {
  return transactions.map((transaction) => ({
    id: transaction.id,
    status: transaction.status,
    created_at: new Date(transaction.created_at)
      .toLocaleString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
      .replace(',', '')
      .replace(/\//g, '-'),
    merchant_name: transaction.merchant_name,
    type: transaction.type.replace('Transaction', ''),
    error_class: transaction.error_class ? errorClassMap[transaction.error_class] : '',
    card_holder: transaction.card_holder,
    card_number: transaction.card_number,
    amount: parseFloat(transaction.amount / 100).toFixed(2),
    currency: transaction.currency,
    isoDate: transaction.created_at
  }));
};
