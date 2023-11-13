export function formatNumberToCurrency(number: number ) {
    const currency = `R$ ${number.toFixed(2).replace(/\./g, ',')}`;
    return currency;
}
