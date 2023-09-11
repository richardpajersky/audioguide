import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
    <Svg
        width={"50%"}
        height={"50%"}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        viewBox={"-4 0 34 34"}
    >
        <Path
            d="M29 15.268c1.333.77 1.333 2.694 0 3.464L3.5 33.454c-1.333.77-3-.192-3-1.732V2.277C.5.737 2.167-.225 3.5.545L29 15.267z"
            {...props}
            fillOpacity={0.95}
        />
    </Svg>
)

export default SvgComponent
