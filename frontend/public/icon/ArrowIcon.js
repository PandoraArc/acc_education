import Icon from "@ant-design/icons";

const ArrowSVG = () => (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1_830" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
            <rect x="24.5" width="24" height="24" transform="rotate(90 24.5 0)" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_1_830)">
            <path d="M6.5 11H15.7L12.1 7.4L13.5 6L19.5 12L13.5 18L12.1 16.6L15.7 13H6.5V11Z" fill="white" />
        </g>
    </svg>
)

const ArrowIcon = (props) => <Icon component={ArrowSVG} />

export default ArrowIcon;