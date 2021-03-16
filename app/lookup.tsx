import {} from './storage';

/**
 * Normalise a detected NMW code so all fields are converted to upper case and any
 * fields after a zero are also zeroed out. Passing a string that does not match the NMW
 * code format will cause `undefined` to be returned. This means it is a valid method to
 * check if a received code is an NMW code.
 *
 * @param {String} nmwCode The NMW code as received from the beacon
 * @return {String | undefined} The normalised string or `undefined` if the input being
 * malformed makes this impossible
 */
export function normaliseNMWString(nmwCode: String): String | undefined {
  const splitCode = nmwCode.split(':');

  // A valid code has the format "nmw:AB-CDE-FGH"

  // First, check the given code starts with "nmw:"
  if (splitCode.length != 2) {
    return undefined;
  }
  if (splitCode[0].toLowerCase() != 'nmw') {
    return undefined;
  }

  // Convert the remainder to upper case
  // and set all fields after a zero to zero
  let zeroFound: boolean = false;
  const fields = splitCode[1].toUpperCase().split('-');
  for (let i = 0; i < fields.length; i++) {
    if (parseInt(fields[i]) == 0) {
      zeroFound = true;
      fields[i] = '0';
    }
    if (zeroFound) {
      fields[i] = '0';
    }
  }
  return 'nmw:' + fields.join('-');
}
