import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarText: '#ffffff',
    background: '#e1e4e8',
    white: '#ffffff',
    border: '#d0d7de',
    placeholder: '#9aa4af',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  backgroundColor: {
    colorPrimary: '#24292e',
  },
  radius: {
    input: 6,
    button: 6,
  },
}

export default theme
