import React from 'react';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

export type IconName = keyof typeof FontAwesome.glyphMap;

interface Props {
  iconName: IconName,
  color: string,
  size: number
  lable?: string,
}

function Icon({ iconName, color, size, lable }: Props): React.JSX.Element {
  return (
    <FontAwesome5 name={iconName} color={color} label={lable} size={size}/>
  )
}

export default Icon;