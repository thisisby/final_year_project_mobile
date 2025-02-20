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
      d="M15.59 12.26C18.4232 12.26 20.72 9.96323 20.72 7.13C20.72 4.29678 18.4232 2 15.59 2C12.7567 2 10.46 4.29678 10.46 7.13C10.46 9.96323 12.7567 12.26 15.59 12.26Z"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <Path
      d="M6.35977 19.44C8.06081 19.44 9.43979 18.0611 9.43979 16.36C9.43979 14.659 8.06081 13.28 6.35977 13.28C4.65873 13.28 3.27979 14.659 3.27979 16.36C3.27979 18.0611 4.65873 19.44 6.35977 19.44Z"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <Path
      d="M16.6201 21.9999C18.0339 21.9999 19.1801 20.8537 19.1801 19.4399C19.1801 18.026 18.0339 16.8799 16.6201 16.8799C15.2062 16.8799 14.0601 18.026 14.0601 19.4399C14.0601 20.8537 15.2062 21.9999 16.6201 21.9999Z"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
  </Svg>
);

export default Icon;
