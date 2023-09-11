export const msToMS = (ms: number) => {
    const sec = ms / 1000;
    const quotient = Math.floor(sec / 60);
    const remainder = sec % 60;
    return ((Math.floor(quotient / 10) === 0) ? '0' : '') +
        quotient.toString() +
        ':' +
        ((Math.floor(remainder / 10) === 0) ? '0' : '') +
        Math.trunc(remainder).toString();
}