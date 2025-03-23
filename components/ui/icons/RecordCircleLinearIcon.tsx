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
      d="M12.47 22C17.9928 22 22.47 17.5228 22.47 12C22.47 6.47715 17.9928 2 12.47 2C6.94712 2 2.46997 6.47715 2.46997 12C2.46997 17.5228 6.94712 22 12.47 22Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.5 16.23C14.8362 16.23 16.73 14.3362 16.73 12C16.73 9.66386 14.8362 7.77002 12.5 7.77002C10.1639 7.77002 8.27002 9.66386 8.27002 12C8.27002 14.3362 10.1639 16.23 12.5 16.23Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Icon;
