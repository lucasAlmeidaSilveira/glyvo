import { toUTC } from "@/lib";

export function getTime(date: Date): string {
  // Usar a data atual se nenhuma data for fornecida
  const currentDate = date || new Date();
  
  // Obter os componentes da data no fuso horário local
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formatted;
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