const monochromeTheme = {
  name: 'monochrome',
  backgroundColor: '#fff',
  borderColor: '#000',
  textColor: '#000',
  rippleColor: '#333',
  backgroundColorInverted: '#000',
  borderColorInverted: '#fff',
  textColorInverted: '#fff'
};

const defaultTheme = {
  name: 'default',
  backgroundColor: '#093f74',
  borderColor: '#fff',
  textColor: '#fff',
  rippleColor: '#666',
  backgroundColorInverted: '#fff',
  borderColorInverted: '#093f74',
  textColorInverted: '#093f74'
};

const highContrastTheme = {
  name: 'highContrast',
  backgroundColor: '#00f',
  borderColor: '#f00',
  textColor: '#f00',
  rippleColor: '#f00',
  backgroundColorInverted: '#f00',
  borderColorInverted: '#00f',
  textColorInverted: '#00f'
};

function setTheme(themeName: string) {
  if (themeName == 'monochrome') {
    return monochromeTheme;
  } else if (themeName == 'highContrast') {
    return highContrastTheme;
  } else {
    return defaultTheme;
  }
}

export { defaultTheme, monochromeTheme, highContrastTheme, setTheme };
