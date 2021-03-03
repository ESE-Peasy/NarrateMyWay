import * as React from 'react';
import renderer from 'react-test-renderer';
import LargeButton from '../LargeButton';
import BeaconInfo from '../BeaconInfo';
import ScanningButton from '../ScanningButton';
import { HorizontalSeparator, VerticalSeparator } from '../Separators';

// LargeButton tests
it(`LargeButton renders correctly`, () => {
  const tree = renderer
    .create(
      <LargeButton accessibilityLabel="Test accessibility label">
        Tap to repeat
      </LargeButton>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`LargeButton text and accessibility correct`, () => {
  const largeButton = (
    <LargeButton accessibilityLabel="Test accessibility label">
      Tap to repeat
    </LargeButton>
  );

  expect(largeButton.props.accessibilityLabel).toBe('Test accessibility label');
  expect(largeButton.props.children).toBe('Tap to repeat');
});

// Separators tests
it(`HorizontalSeparator renders correctly`, () => {
  const tree = renderer.create(<HorizontalSeparator />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(`VerticalSeparator renders correctly`, () => {
  const tree = renderer.create(<VerticalSeparator />).toJSON();
  expect(tree).toMatchSnapshot();
});

// BeaconInfo tests
it(`BeaconInfo renders correctly`, () => {
  const tree = renderer
    .create(<BeaconInfo type="Test Type" place="Test Place" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`BeaconInfo type and place correct`, () => {
  const beaconInfo = <BeaconInfo type="Test Type" place="Test Place" />;

  expect(beaconInfo.props.type).toBe('Test Type');
  expect(beaconInfo.props.place).toBe('Test Place');
});

// ScanningButton tests
it(`ScanningButton renders correctly`, () => {
  const tree = renderer
    .create(<ScanningButton accessibilityLabel="Scanning" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`ScanningButton type and place correct`, () => {
  const scanningButton = <ScanningButton accessibilityLabel="Scanning" />;

  expect(scanningButton.props.accessibilityLabel).toBe('Scanning');
});
