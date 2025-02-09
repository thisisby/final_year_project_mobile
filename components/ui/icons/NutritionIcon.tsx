import React from "react";
import Svg, { Defs, Path } from "react-native-svg";

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
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 16V19C18 20.65 16.65 22 15 22H9C7.35 22 6 20.65 6 19V14.99C6 14.44 6.45 13.99 7.01 13.99L9.89 14C10.58 14 11.26 14.15 11.89 14.45C12.58 14.77 13.31 15 14.08 15H17C17.55 15 18 15.45 18 16Z"
      fill={color}
    />
    <Path
      d="M17.41 9.41L15.29 7.29C15.1 7.1 15 6.85 15 6.59V4.91C15.58 4.71 16 4.15 16 3.5C16 2.67 15.33 2 14.5 2H9.5C8.67 2 8 2.67 8 3.5C8 4.15 8.42 4.71 9 4.91V6.59C9 6.85 8.9 7.1 8.71 7.29L6.59 9.41C6.27 9.73 6 10.38 6 10.83V11.48C6 12.03 6.44 12.48 6.99 12.48L9.9 12.5C10.88 12.5 11.87 12.74 12.75 13.2C13.17 13.42 13.65 13.5 14.12 13.5H17C17.55 13.5 18 13.05 18 12.5V10.83C18 10.38 17.73 9.73 17.41 9.41Z"
      fill={color}
    />
  </Svg>
);

export default Icon;
