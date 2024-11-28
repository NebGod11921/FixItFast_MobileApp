import Svg, {Path} from 'react-native-svg';
import React from 'react';

export function IconHome({
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
      width={width || '14'}
      height={height || '14'}
      viewBox="0 0 14 14"
      fill="none">
      <Path
        d="M8.04309 2.03698L8.04336 2.03717L11.4033 4.38793C11.6433 4.55598 11.8824 4.84145 12.062 5.18534C12.2415 5.52922 12.3392 5.88883 12.3392 6.18332V10.1383C12.3392 11.3497 11.3555 12.3333 10.1442 12.3333H3.85583C2.64588 12.3333 1.66083 11.3453 1.66083 10.1325V6.10748C1.66083 5.83555 1.74892 5.49439 1.91274 5.16168C2.07641 4.82925 2.2944 4.54853 2.51251 4.3784L2.51262 4.37832L5.43374 2.09856C5.43396 2.09839 5.43417 2.09822 5.43439 2.09805C6.14207 1.55025 7.30697 1.52123 8.04309 2.03698ZM6.99999 11.4375C7.5153 11.4375 7.93749 11.0153 7.93749 10.5V8.74998C7.93749 8.23467 7.5153 7.81248 6.99999 7.81248C6.48469 7.81248 6.06249 8.23467 6.06249 8.74998V10.5C6.06249 11.0153 6.48469 11.4375 6.99999 11.4375Z"
        fill={colors || 'white'}
        stroke={colors || 'white'}
      />
    </Svg>
  );
}
