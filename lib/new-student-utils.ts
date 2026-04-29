export function generatePassword(): string {
  const words = ['Welcome', 'Academy', 'Start', 'Learn', 'Join'];
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${word}${num}!`;
}
