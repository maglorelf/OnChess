// Utility function to format a date as yyyy/mm/dd
export function formatDateYYYYMMDD(dateInput) {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  return (
    date.getFullYear() +
    '/' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '/' +
    String(date.getDate()).padStart(2, '0')
  );
}
