import { colors } from '../colors'

export const lightTheme = {
  name: 'light',
  isLightMode: true,
  colorScheme: 'light',
  primaryBackgroundColor: colors.white,
  color: colors.gray['900'],
  secondaryColor: colors.gray['600'],
  tertiaryColor: colors.gray['600']
}

export const darkTheme = {
  name: 'dark',
  isLightMode: false,
  colorScheme: 'dark',
  primaryBackgroundColor: colors.gray['800'],
  color: colors.white,
  secondaryColor: colors.gray['25'],
  tertiaryColor: colors.gray['300']
}
