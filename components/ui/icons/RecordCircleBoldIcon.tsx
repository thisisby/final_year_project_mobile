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
      d="M12.47 2C6.94997 2 2.46997 6.48 2.46997 12C2.46997 17.52 6.94997 22 12.47 22C17.99 22 22.47 17.52 22.47 12C22.47 6.48 18 2 12.47 2ZM12.5 16.23C10.16 16.23 8.26997 14.34 8.26997 12C8.26997 9.66 10.16 7.77 12.5 7.77C14.84 7.77 16.73 9.66 16.73 12C16.73 14.34 14.84 16.23 12.5 16.23Z"
      fill={color}
    />
  </Svg>
);

export default Icon;
