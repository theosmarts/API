export function convertToPercentage(num1, num2) {
  if (num2 === 0 && num2 === 0) {
    return 0;
  } else {
    const result = (num1 / num2) * 100;
    return Math.round(result);
  }
}

export function formatNumberWithCommas(num) {
  if (num === null) {
    return null;
  } else {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
}

export function formatDate(date) {
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

  return `${da}-${mo}-${ye}`;
}
