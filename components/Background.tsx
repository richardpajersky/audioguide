import * as React from "react"
import Svg, { G, Path, Circle, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props: any) {
    return (
        <Svg width={1440}
    height={560}
    preserveAspectRatio="none"
    viewBox="0 -10 1440 560"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
>
    <G clipPath='url("#SvgjsClipPath1091")' fill="none">
    <Path fill="rgba(255, 255, 255, 1)" d="M0 0H1440V560H0z" />
    <G stroke="#365aa3" strokeOpacity={0.25} strokeWidth={2}>
    <Circle cx={-17.69} cy={-29.07} r={93.335} />
    <Circle cx={451.35} cy={322.61} r={93.335} />
    <Circle cx={794.99} cy={661.64} r={93.335} />
    <Circle cx={699.56} cy={298.74} r={132.38} />
    <Circle cx={674.8} cy={346.34} r={72.51} />
    <Circle cx={1143.3} cy={184.72} r={57.82} />
    <Circle cx={257.37} cy={64.49} r={120.4} />
    <Circle cx={1132.4} cy={526.24} r={58.88} />
    <Circle cx={676.7} cy={16.01} r={107.01} />
    <Circle cx={769.27} cy={300.12} r={117.07} />
    <Circle cx={1197.5} cy={462.73} r={154.46} />
    <Circle cx={299.32} cy={12.33} r={179.44} />
    <Circle cx={883.58} cy={377.4} r={54.96} />
    <Circle cx={73.18} cy={299.36} r={111} />
    <Circle cx={766.94} cy={416.01} r={175.6} />
    <Circle cx={1015.5} cy={260.82} r={185.3} />
    <Circle cx={593.85} cy={443.78} r={167.06} />
    <Circle cx={262.93} cy={241.92} r={172.5} />
    <Circle cx={885.6} cy={558.08} r={137.06} />
    <Circle cx={230.4} cy={447.65} r={94.665} />
    <Circle cx={569.7} cy={555} r={113.96} />
    <Circle cx={396.16} cy={291.97} r={128.69} />
    <Circle cx={992.17} cy={351.97} r={60.57} />
    <Circle cx={1247.8} cy={133.89} r={52.945} />
    <Circle cx={835.59} cy={162.2} r={96.815} />
    <Circle cx={1372.4} cy={102.69} r={167.47} />
    <Circle cx={639.99} cy={133.67} r={91.455} />
    <Circle cx={918.36} cy={213.32} r={66.295} />
    <Circle cx={300.5} cy={465.81} r={184.74} />
    <Circle cx={916.93} cy={256.55} r={48.15} />
    </G>
    </G>
    <Defs>
    <ClipPath id="SvgjsClipPath1091">
    <Path d="M0 0H1440V560H0z" />
        </ClipPath>
        </Defs>
        </Svg>
)
}

export default SvgComponent
