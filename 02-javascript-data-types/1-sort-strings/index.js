/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {void}
 */
export function sortStrings (arr, param = 'asc') {
  const compareString = (str1, str2) => {
    return str1.localeCompare(str2, ['ru', 'en'], {caseFirst: "upper"});
  };

  return [...arr].sort((str1, str2) => {
    switch (param) {
    case 'asc':
      return compareString(str1, str2);
    case 'desc':
      return compareString(str2, str1);
    default:
      return 'error';
    }
  });
}
