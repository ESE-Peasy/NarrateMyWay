import Storage from './storage';

const storage = new Storage();

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

type LookupResultSimple = {
  description: String;
  icon: String;
}

type LookupResultExpanded = {
  name: String;
  description: String;
  icon: String;
}

/**
 * To be called when a new beacon is detected. The function wraps the necessary
 * lookup(s) to the database to retrieve all desired information. This also includes
 * error handling of the NMW code that was received from the beacon.
 *
 * @param {String} nmwCode NMW code of detected beacon
 * @param {String} uuid UUID of detected beacon
 * @return {LookupResultSimple | LookupResultExpanded | undefined} `LookupResultSimple`
 * if the lookup only resulted in standard NMW code results, `LookupResultExpanded` if
 * additional information was available via an expansion pack, and `undefined` if the
 * lookup failed
 */
export async function lookupBeacon(
  nmwCode: String,
  uuid: String
): Promise<LookupResultSimple | LookupResultExpanded | undefined> {
  // Ensure the NMW code is correctly formatted
  const normalisedNMWCode = normaliseNMWString(nmwCode);
  if (normalisedNMWCode == undefined) {
    // Return if the code is invalid and not convertible to a valid format
    return undefined;
  }
  nmwCode = normalisedNMWCode;

  // Query database
  return new Promise((resolve, _) => {
    storage.getUUIDData(uuid, (result) => {
      if (result != null) {
      resolve({result.name, result.description, result.icon});
      }
    })
  });
}
