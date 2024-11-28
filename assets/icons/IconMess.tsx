import React from "react";
import Svg, { Path } from "react-native-svg";

export function IconMess({
  colors,
  width,
  height,
}: {
  colors: string;
  width: number;
  height: number;
}) {
  return (
    <Svg
      width={width || 28}
      height={height || 28}
      viewBox="0 0 28 28"
      fill="none"
    >
      <Path
        fill={colors || "white"}
        stroke={colors || "white"}
        d="m15.391 14.025.325 2.633c.084.692-.658 1.175-1.25.817l-2.883-1.717c-.2-.116-.25-.366-.142-.566a5.263 5.263 0 0 0 .642-2.5c0-3.05-2.617-5.534-5.833-5.534-.659 0-1.3.1-1.9.3a.42.42 0 0 1-.534-.5c.759-3.033 3.675-5.291 7.159-5.291 4.066 0 7.358 3.075 7.358 6.866 0 2.25-1.158 4.242-2.942 5.492Z"
      />
      <Path
        fill={colors || "white"}
        stroke={colors || "white"}
        d="M10.833 12.692a4.05 4.05 0 0 1-.984 2.633c-.825 1-2.133 1.642-3.6 1.642l-2.175 1.291c-.366.225-.833-.083-.783-.508l.208-1.642c-1.116-.775-1.833-2.016-1.833-3.416 0-1.467.783-2.759 1.983-3.525a4.736 4.736 0 0 1 2.6-.759c2.534 0 4.584 1.917 4.584 4.284Z"
      />
    </Svg>
  );
}
