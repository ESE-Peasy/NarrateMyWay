import * as React from 'react';
import renderer from 'react-test-renderer';
import LargeButton from '../LargeButton';
import BeaconInfo from '../BeaconInfo';
import ScanningButton from '../ScanningButton';
import { HorizontalSeparator, VerticalSeparator } from '../Separators';

const testTheme = {
  name: 'default',
  backgroundColor: '#093f74',
  borderColor: '#fff',
  textColor: '#fff',
  backgroundColorInverted: '#fff',
  borderColorInverted: '#093f74',
  textColorInverted: '#093f74'
};

// LargeButton tests
it(`LargeButton renders correctly`, () => {
  const tree = renderer
    .create(
      <LargeButton
        theme={testTheme}
        accessibilityLabel="Test accessibility label"
      >
        Tap to repeat
      </LargeButton>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`LargeButton text and accessibility correct`, () => {
  const largeButton = (
    <LargeButton
      theme={testTheme}
      accessibilityLabel="Test accessibility label"
    >
      Tap to repeat
    </LargeButton>
  );

  expect(largeButton.props.theme).toBe(testTheme);
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
    .create(
      <BeaconInfo
        theme={testTheme}
        description="Test Description"
        icon="test-icon"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`BeaconInfo type and place correct`, () => {
  const beaconInfo = (
    <BeaconInfo
      theme={testTheme}
      description="Test Description"
      icon="test-icon"
    />
  );

  expect(beaconInfo.props.theme).toBe(testTheme);
  expect(beaconInfo.props.icon).toBe('test-icon');
  expect(beaconInfo.props.description).toBe('Test Description');
});

// ScanningButton tests
it(`ScanningButton renders correctly`, () => {
  const tree = renderer
    .create(<ScanningButton theme={testTheme} accessibilityLabel="Scanning" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`ScanningButton type and place correct`, () => {
  const scanningButton = (
    <ScanningButton theme={testTheme} accessibilityLabel="Scanning" />
  );

  expect(scanningButton.props.theme).toBe(testTheme);
  expect(scanningButton.props.accessibilityLabel).toBe('Scanning');
});
