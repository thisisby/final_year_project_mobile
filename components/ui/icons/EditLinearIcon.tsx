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
      d="M11.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22H15.5C20.5 22 22.5 20 22.5 15V13"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5399 3.02001L8.65988 10.9C8.35988 11.2 8.05988 11.79 7.99988 12.22L7.56988 15.23C7.40988 16.32 8.17988 17.08 9.26988 16.93L12.2799 16.5C12.6999 16.44 13.2899 16.14 13.5999 15.84L21.4799 7.96001C22.8399 6.60001 23.4799 5.02001 21.4799 3.02001C19.4799 1.02001 17.8999 1.66001 16.5399 3.02001Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.4099 4.15002C16.0799 6.54002 17.9499 8.41002 20.3499 9.09002"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Icon;
