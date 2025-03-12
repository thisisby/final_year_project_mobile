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
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M8.67987 11.91L10.3299 12.32L9.37988 16.1601C9.15988 17.0601 9.59986 17.36 10.3599 16.83L15.5399 13.24C16.1699 12.8 16.0799 12.29 15.3299 12.1L13.6799 11.69L14.6299 7.85C14.8499 6.95 14.4099 6.65001 13.6499 7.18001L8.46988 10.77C7.83988 11.21 7.92987 11.72 8.67987 11.91Z"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Icon;
