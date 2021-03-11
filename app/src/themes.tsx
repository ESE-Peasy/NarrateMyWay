const monochromeTheme = {
  color1: '#fff',
  color2: '#000',
  color3: '#000',
  color4: '#333'
};

const defaultTheme = {
  color1: '#000',
  color2: '#fff',
  color3: '#fff',
  color4: '#666'
};

const highContrastTheme = {
  color1: '#00f',
  color2: '#f00',
  color3: '#666',
  color4: '#999'
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
