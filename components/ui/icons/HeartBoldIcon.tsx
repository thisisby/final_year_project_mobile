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
      d="M16.4556 3.09998C14.6456 3.09998 13.0256 3.97998 12.0156 5.32998C11.0056 3.97998 9.38562 3.09998 7.57562 3.09998C4.50563 3.09998 2.01562 5.59998 2.01562 8.68998C2.01562 9.87998 2.20562 10.98 2.53562 12C4.11562 17 8.98563 19.99 11.3956 20.81C11.7356 20.93 12.2956 20.93 12.6356 20.81C15.0456 19.99 19.9156 17 21.4956 12C21.8256 10.98 22.0156 9.87998 22.0156 8.68998C22.0156 5.59998 19.5256 3.09998 16.4556 3.09998Z"
      fill={color}
    />
  </Svg>
);

export default Icon;
