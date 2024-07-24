const common = {
  PINK_200: '#FAE2E9',
  PINK_400: '#EC87A5',
  PINK_500: '#BF5C79',
  PINK_700: '#C63B64',
  RED_300: '#FFB4B4',
  RED_500: '#FF5F5F',
  BLUE_400: '#B4E0FF',
  BLUE_500: '#0D8AFF',
  GREEN_400: '#CCE6BA',
  YELLOW_400: '#FFE594',
  YELLOW_500: '#FACC15',
  PURPLE_400: '#C4C4E7',
  UNCHANGED_WHITE: '#fff',
  UNCHANGE_BLACK: '#000',
};

const colors = {
  light: {
    WHITE: '#fff',
    GRAY_100: '#F8F8F8',
    GRAY_200: '#E7E7E7',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#161616',
    ...common
  },
  dark: {
    WHITE: '#161616',
    GRAY_100: '#202124',
    GRAY_200: '#3C4043',
    GRAY_300: '#5E5E5E',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#F8F8F8',
    BLACK: '#fff',
    ...common
  },
} as const;

const colorHex = {
  RED: colors['light'].PINK_400,
  BLUE: colors['light'].BLUE_400,
  GREEN: colors['light'].GREEN_400,
  YELLOW: colors['light'].YELLOW_400,
  PURPLE: colors['light'].PURPLE_400,
} as const;

export {colors, colorHex};