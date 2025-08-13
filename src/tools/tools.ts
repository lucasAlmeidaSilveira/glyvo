import { toUTC } from "@/lib";

export function getTime(date: Date): string {
  const formatToBrazilTime = (date: Date): string => {
    // Converte para o fuso horário do Brasil
    const brazilTime = new Date(
      date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    );

    const year = brazilTime.getFullYear();
    const month = String(brazilTime.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda
    const day = String(brazilTime.getDate()).padStart(2, '0'); // Adiciona zero à esquerda
    const hours = String(brazilTime.getHours()).padStart(2, '0'); // Formato 24h
    const minutes = String(brazilTime.getMinutes()).padStart(2, '0');

    return `${year}-${day}-${month}T${hours}:${minutes}`;
  };

  const formattedDate = formatToBrazilTime(date);

  return formattedDate;
}

export function formatDate(date: Date): string {
  const now = new Date();
  const dateNewDate = toUTC(new Date(date));
  const year = dateNewDate.getFullYear();
  const month = String(dateNewDate.getMonth() + 1).padStart(2, '0');
  const day = String(dateNewDate.getDate()).padStart(2, '0');
  const hours = String(dateNewDate.getHours()).padStart(2, '0');
  const minutes = String(dateNewDate.getMinutes()).padStart(2, '0');

  const isToday =
    dateNewDate.getDate() === now.getDate() &&
    dateNewDate.getMonth() === now.getMonth() &&
    dateNewDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return `${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
}