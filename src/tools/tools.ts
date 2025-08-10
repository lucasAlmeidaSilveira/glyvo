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