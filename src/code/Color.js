const Palette = Object.freeze({
  white: 'white',
  'darkgray-1': 'darkgray-1',
  'darkgray-2': 'darkgray-2',
  'gray-1': 'gray-1',
  'gray-2': 'gray-2',
  'lightgray-1': 'lightgray-1',
  'lightgray-2': 'lightgray-2',
  'lightgray-3': 'lightgray-3',
  'lightgray-4': 'lightgray-4',
  'darkblue-1': 'darkblue-1',
  'darkblue-2': 'darkblue-2',
  'blue-1': 'blue-1',
  'blue-2': 'blue-2',
  'lightblue-1': 'lightblue-1',
  'lightblue-2': 'lightblue-2',
  'lightblue-3': 'lightblue-3',
  'darkgreen-1': 'darkgreen-1',
  'darkgreen-2': 'darkgreen-2',
  'green-1': 'green-1',
  'green-2': 'green-2',
  'lightgreen-1': 'lightgreen-1',
  'lightgreen-2': 'lightgreen-2',
  'lightgreen-3': 'lightgreen-3',
  'darkyellow-1': 'darkyellow-1',
  'darkyellow-2': 'darkyellow-2',
  'yellow-1': 'yellow-1',
  'yellow-2': 'yellow-2',
  'lightyellow-1': 'lightyellow-1',
  'lightyellow-2': 'lightyellow-2',
  'lightyellow-3': 'lightyellow-3',
  'darkred-1': 'darkred-1',
  'darkred-2': 'darkred-2',
  'red-1': 'red-1',
  'red-2': 'red-2',
  'lightred-1': 'lightred-1',
  'lightred-2': 'lightred-2',
  'lightred-3': 'lightred-3'
})

const Brand = Object.freeze({
  'opsnow-green': 'opsnow-green',
  'management-service': 'management-service',
  'monitoring-service': 'monitoring-service',
  'productivity-service': 'productivity-service',
  'admin-service': 'admin-service'
})

const ColorPrefix = Object.freeze({
  BG: 'bg',
  Text: 'color',
  Border: 'border'
})

const getBackgroundColor = (color) => {
  if (Palette[color]) {
    return `-${ColorPrefix.BG}-${Palette[color]}`
  }
  if (Brand[color]) {
    return `-${ColorPrefix.BG}-${Brand[color]}`
  }
  return null
}
const getTextColor = (palette) => (Palette[palette] ? `-${ColorPrefix.Text}-${Palette[palette]}` : undefined)
const getBorderColor = (palette) => (Palette[palette] ? `-${ColorPrefix.Border}-${Palette[palette]}` : undefined)

const Font = Object.freeze({
  primary: Palette.DarkGray_1,
  secondary: Palette.Gray_1,
  tertiary: Palette.Gray_2
})

const BadgeColor = Object.freeze({
  info: getBackgroundColor(Palette['gray-1']),
  warning: getBackgroundColor(Palette['yellow-1']),
  error: getBackgroundColor(Palette['red-1']),
  healthy: getBackgroundColor(Palette['green-1'])
})

const GnbBadgeColor = Object.freeze({
  new: getBackgroundColor(Palette['blue-2']),
  beta: getBackgroundColor(Palette['yellow-1'])
})

const ButtonColor = Object.freeze({
  '': '',
  primary: 'primary-',
  secondary: 'secondary-',
  destructive: 'destructive-',
  borderless: 'borderless-',
  link: 'link-',
  whitesecondary: 'whitesecondary-',
  whiteborderless: 'whiteborderless-'
})

const NotificationColor = Object.freeze({
  info: 'gray-',
  warning: 'yellow-',
  error: 'red-',
  healthy: 'green-'
})

const TagColor = Object.freeze({
  critical: 'red-',
  warning: 'yellow-',
  healthy: 'green-',
  info: 'gray-'
})

const OpacityValue = Object.freeze({
  0: '-opacity-0',
  10: '-opacity-10',
  20: '-opacity-20',
  30: '-opacity-30',
  40: '-opacity-40',
  50: '-opacity-50',
  60: '-opacity-60',
  70: '-opacity-70',
  80: '-opacity-80',
  90: '-opacity-90',
  100: '-opacity-100'
})

export {
  Palette,
  Brand,
  Font,
  getBackgroundColor,
  getTextColor,
  getBorderColor,
  ColorPrefix,
  BadgeColor,
  ButtonColor,
  GnbBadgeColor,
  OpacityValue,
  NotificationColor,
  TagColor
}
