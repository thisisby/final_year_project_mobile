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
      d="M5.54003 11.12C0.860029 11.45 0.860029 18.26 5.54003 18.59H7.46007"
      stroke="#171717"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M5.59003 11.12C2.38003 2.18999 15.92 -1.38001 17.47 7.99999C21.8 8.54999 23.55 14.32 20.27 17.19C19.27 18.1 17.98 18.6 16.63 18.59H16.54"
      stroke="#171717"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17 16.53C17 17.27 16.84 17.97 16.54 18.59C16.46 18.77 16.37 18.94 16.27 19.1C15.41 20.55 13.82 21.53 12 21.53C10.18 21.53 8.58998 20.55 7.72998 19.1C7.62998 18.94 7.54002 18.77 7.46002 18.59C7.16002 17.97 7 17.27 7 16.53C7 13.77 9.24 11.53 12 11.53C14.76 11.53 17 13.77 17 16.53Z"
      stroke="#171717"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M10.4399 16.53L11.4299 17.52L13.5599 15.55"
      stroke="#171717"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Icon;
