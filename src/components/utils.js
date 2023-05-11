export const filterArrayByDateRange = (array, fromDate, toDate) => {
  if (fromDate.toString() === 'Invalid Date' && toDate.toString() === 'Invalid Date') {
    return array;
  } else if (fromDate.toString() === 'Invalid Date') {
    return array.filter((item) => new Date(item.isoDate) <= new Date(toDate));
  } else if (toDate.toString() === 'Invalid Date') {
    return array.filter((item) => new Date(item.isoDate) >= new Date(fromDate));
  } else {
    return array.filter((item) => {
      const itemDate = new Date(item.isoDate);
      return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
    });
  }
};
export const applyFilters = (transactions, filters) => {
  return filters.reduce((result, filter) => {
    const { column, matchBy, value } = filter;
    return result.filter((transaction) => {
      const transactionValue = transaction[column].toString();
      switch (matchBy) {
        case 'equal':
          return transactionValue === value;
        case 'starts_with':
          return transactionValue.startsWith(value);
        case 'ends_with':
          return transactionValue.endsWith(value);
        case 'contains':
          return transactionValue.includes(value);
        default:
          return true;
      }
    });
  }, transactions);
};
