//Generate sequence of 10 numbers and 4 letters ramdonly
export function generateIdempotencyKey(): string {
    const numbers = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');
  
    const letters = Array.from({ length: 4 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    ).join('');
  
    return `${numbers}${letters}`;
}