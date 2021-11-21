export const formatTime = (dateLike: any): string => {
  const date = new Date(dateLike);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
    hour12: true,
  }).format(new Date(date))
}