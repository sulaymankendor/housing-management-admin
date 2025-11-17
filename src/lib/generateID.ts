export function generateID() {
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += Math.floor(Math.random() * 10); // 0–9
  }
  return result;
}
