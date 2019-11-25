export function parseCamelCase(str) {
  let friendlyStr = str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    if (str.charCodeAt(i) < 91) friendlyStr += " ";
    friendlyStr += str[i];
  }
  return friendlyStr;
}
