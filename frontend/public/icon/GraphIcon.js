import Icon from "@ant-design/icons";

const GraphSvgActive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1_789" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_1_789)">
            <path d="M2 21V19H22V21H2ZM3 18V11H6V18H3ZM8 18V6H11V18H8ZM13 18V9H16V18H13ZM18 18V3H21V18H18Z" fill="white" fill-opacity="0.77" />
        </g>
    </svg>
)

const GraphIconActive = (props) => <Icon component={GraphSvgActive} />


const GraphSvg = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1_789" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_1_789)">
            <path d="M2 21V19H22V21H2ZM3 18V11H6V18H3ZM8 18V6H11V18H8ZM13 18V9H16V18H13ZM18 18V3H21V18H18Z" fill="#008542" fill-opacity="0.77" />
        </g>
    </svg>

)

const GraphIcon = (props) => <Icon component={GraphSvg} />

export {
    GraphIcon,
    GraphIconActive
};