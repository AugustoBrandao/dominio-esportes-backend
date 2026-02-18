export default function generateCadastroId()
{
    const now = new Date();
    const pad = (n, size = 2) => String(n).padStart(size, "0");
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = String(now.getFullYear()).slice(-2);
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());
    const ms = pad(now.getMilliseconds(), 3);
  
    return `${day}${month}${year}${hour}${minute}${second}${ms}`;
};