import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props: any) {
    return (
        <Svg
            viewBox="0 0 458.65 458.65"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M450.08 212.86L218.02 50.13a20.117 20.117 0 00-31.665 16.47v92.014l-154.7-108.48A20.116 20.116 0 00-.01 66.604v325.46a20.114 20.114 0 0031.666 16.47l154.7-108.48v92.014a20.114 20.114 0 0020.115 20.116c4.06 0 8.103-1.228 11.551-3.646l232.06-162.73a20.117 20.117 0 00-.002-32.94z" />
        </Svg>
    )
}

export default SvgComponent