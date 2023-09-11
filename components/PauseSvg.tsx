import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const SvgComponent = (props: any) => (
    <Svg
        width={"50%"}
        height={"50%"}
        viewBox="0 0 365 365"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G>
            <Path
                fill="black"
                d="M84.5 0h53a10 10 45 0 1 10 10v345a10 10 135 0 1-10 10h-53a10 10 45 0 1-10-10V10a10 10 135 0 1 10-10zM227.5 0h53a10 10 45 0 1 10 10v345a10 10 135 0 1-10 10h-53a10 10 45 0 1-10-10V10a10 10 135 0 1 10-10z"
            />
        </G>
    </Svg>
)

export default SvgComponent