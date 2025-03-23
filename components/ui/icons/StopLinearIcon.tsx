import React from "react";
import { Path, Svg } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  width = 30,
  height = 30,
  color = "#333333",
}) => (
  <Svg width={width} height={height} viewBox="0 0 25 24" fill="none">
    <Path
      d="M9.8 21H15.2C19.7 21 21.5 19.2 21.5 14.7V9.3C21.5 4.8 19.7 3 15.2 3H9.8C5.3 3 3.5 4.8 3.5 9.3V14.7C3.5 19.2 5.3 21 9.8 21Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Icon;
