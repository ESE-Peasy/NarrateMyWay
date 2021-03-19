import { normaliseNMWString } from '../src/lookup';

jest.mock('../src/storage');

test('Non-NMW code returns undefined', () => {
  expect(normaliseNMWString('')).toBe(undefined);
  expect(normaliseNMWString('abcd')).toBe(undefined);
});

test('Perfect NMW code not altered', () => {
  expect(normaliseNMWString('nmw:AB-CDE-FGH').getPretty()).toBe(
    'nmw:AB-CDE-FGH'
  );
});

test('Lower case NMW code made upper case', () => {
  expect(normaliseNMWString('nmw:ab-cde-fgh').getPretty()).toBe(
    'nmw:AB-CDE-FGH'
  );
});

test('Fields after zero are zeroed out', () => {
  expect(normaliseNMWString('nmw:AB-0-FGH').getPretty()).toBe('nmw:AB-0-0');
});

test('Field with multiple zeroes treated as zero', () => {
  expect(normaliseNMWString('nmw:00-CDE-FGH').getPretty()).toBe('nmw:0-0-0');
});
