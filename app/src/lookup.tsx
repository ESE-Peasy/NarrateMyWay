import Storage, {
  expansionPackData,
  expansionPackMeta,
  nmwLocation,
  uuidLocation
} from './storage';

import { Beacon } from './state/types';

const storage = new Storage();
storage.clearStorage();
storage.createTable();

/**
 * A wrapper for the NMW code. This exists so a single reference to a NMW code can be
 * used as a code with or without the `'nmw:'` prepended.
 */
class NMWCode {
  #code: string;

  /**
   * Construct an `NMWCode` object without any error checking.
   *
   * @param {string} code NMW code as a string
   */
  constructor(code: string) {
    this.#code = code;
  }

  /**
   *
   * @return {string} The code without `'nmw:'`
   */
  getCode() {
    return this.#code;
  }

  /**
   *
   * @return {string} The code with `'nmw:'`
   */
  getPretty() {
    return 'nmw:' + this.#code;
  }
}

/**
 * Normalise a detected NMW code so all fields are converted to upper case and any
 * fields after a zero are also zeroed out. Passing a string that does not match the NMW
 * code format will cause `undefined` to be returned. This means it is a valid method to
 * check if a received code is an NMW code.
 *
 * @param {string} nmwCode The NMW code as received from the beacon
 * @return {NMWCode | undefined} The normalised `NMWCode` or `undefined` if the input
 * being malformed makes this impossible
 */
export function normaliseNMWString(nmwCode: string): NMWCode | undefined {
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
  return new NMWCode(fields.join('-'));
}

type Simple = {
  description: string;
  icon: string;
  _tag: 'Simple';
};

type Enriched = {
  name: string;
  description: string;
  icon: string;
  _tag: 'Enriched';
};

type LookupError = {
  _tag: 'LookupError';
};

/**
 * Type of a result after performing a lookup.
 *
 * - If only standard NMW code information is available: `Simple`
 * - With enriched UUID-based information: `Enriched`
 * - If a lookup error occurs: `LookupError`
 */
export type LookupResult = Simple | Enriched | LookupError;

/**
 * To be called when a new beacon is detected. The function wraps the necessary
 * lookup(s) to the database to retrieve all desired information. This also includes
 * error handling of the NMW code that was received from the beacon.
 *
 * @param {Beacon} beacon The detected beacon to be looked up
 * @return {LookupResult} `Simple` if the lookup only resulted in standard NMW code
 * results, `Enriched` if additional information was available via an expansion pack,
 * and `Error` if the lookup failed
 */
export async function lookupBeacon(beacon: Beacon): Promise<LookupResult> {
  // Ensure the NMW code is correctly formatted
  const nmwCode = normaliseNMWString(beacon.beaconName);
  if (nmwCode == undefined) {
    // Return if the code is invalid and not convertible to a valid format
    return { _tag: 'LookupError' };
  }

  // Query database
  return new Promise((resolve, _) => {
    storage.lookupUUID(beacon.beaconId, (result: uuidLocation) => {
      if (result != null) {
        resolve({
          name: result.name,
          description: result.description,
          icon: result.icon,
          _tag: 'Enriched'
        });
      } else {
        storage.lookupNMWCode(nmwCode.getCode(), (result: nmwLocation) => {
          if (result != null) {
            resolve({
              description: result.description,
              icon: result.icon,
              _tag: 'Simple'
            });
          } else {
            resolve({ _tag: 'LookupError' });
          }
        });
      }
    });
  });
}

type ExpansionPackDownloadRequired = {
  _tag: 'ExpansionPackDownloadRequired';
};

type ExpansionPackDownloadNotRequired = {
  _tag: 'ExpansionPackDownloadNotRequired';
};

type ExpansionPackLookupError = {
  _tag: 'ExpansionPackLookupError';
};

/**
 * Type of a result after performing a lookup.
 *
 * - If expansion pack has not been downloaded or is outdated:
 *      `ExpansionPackDownloadRequired`
 * - If expansion pack has been downloaded AND is latest version:
 *      `ExpansionPackDownloadNotRequired`
 * - If a lookup error occurs: `ExpansionPackLookupError`
 */
export type ExpansionPackLookupResult =
  | ExpansionPackDownloadRequired
  | ExpansionPackDownloadNotRequired
  | ExpansionPackLookupError;

/**
 * To be called when an expansion pack beacon is detected new beacon is detected. The * function wraps the necessary lookup(s) to the database to check if the detected
 * expansion pack has already been downloaded or if it is outdated. This also includes
 * error handling of the NMW code that was received from the beacon.
 *
 * @param {number} packId The unique id of this pack
 * @param {number} latestPackVersionNumber The version number retrieved from central
 * database for this pack
 * @return {ExpansionPackLookupResult} The download is either required or not required.
 * `Error` if the lookup failed
 */
export async function checkExpansionPack(
  packId: number,
  latestPackVersionNumber: number
): Promise<ExpansionPackLookupResult> {
  // Query database
  return new Promise((resolve, _) => {
    storage.lookupExpansionPack(
      packId,
      latestPackVersionNumber,
      (result: expansionPackMeta) => {
        // No entry in local database means pack has not been downloaded.
        // If version number in local database is lower than latest pack version number
        // then we need to download the latest version
        console.log('Result of lookup is', result);

        if (result == null || result.packVersion < latestPackVersionNumber) {
          resolve({
            _tag: 'ExpansionPackDownloadRequired'
          });
        } else if (result.packVersion == latestPackVersionNumber) {
          resolve({
            _tag: 'ExpansionPackDownloadNotRequired'
          });
        } else {
          resolve({ _tag: 'ExpansionPackLookupError' });
        }
      }
    );
  });
}

export async function saveExpansionPack(expansionData) {
  return storage.parseExpansionPack(expansionData);
}
