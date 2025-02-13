import React from "react";
import Svg, { Path } from "react-native-svg";

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
      d="M3.01562 9.10998V14.88C3.01562 17 3.01562 17 5.01562 18.35L10.5156 21.53C11.3456 22.01 12.6956 22.01 13.5156 21.53L19.0156 18.35C21.0156 17 21.0156 17 21.0156 14.89V9.10998C21.0156 6.99998 21.0156 6.99999 19.0156 5.64999L13.5156 2.46999C12.6956 1.98999 11.3456 1.98999 10.5156 2.46999L5.01562 5.64999C3.01562 6.99999 3.01562 6.99998 3.01562 9.10998Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M12.0156 15C13.6725 15 15.0156 13.6569 15.0156 12C15.0156 10.3431 13.6725 9 12.0156 9C10.3588 9 9.01562 10.3431 9.01562 12C9.01562 13.6569 10.3588 15 12.0156 15Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Icon;
