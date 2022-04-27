/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const stringSlice = string.slice(0, size);
  const rest = [...string.slice(size)];

  return rest.reduce((string, char) => {
    if (!string.endsWith(char.repeat(size))) {
      string += char;
    }

    return string;
  }, stringSlice);
}
