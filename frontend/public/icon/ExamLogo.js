import Icon from "@ant-design/icons";

const ExamSvgActive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1_794" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="white" />
        </mask>
        <g mask="url(#mask0_1_794)">
            <path d="M6 15H13L15 13H6V15ZM6 11H12V9H6V11ZM4 7V17H11L9 19H2V5H22V8H20V7H4ZM22.9 12.3C22.9833 12.3833 23.025 12.475 23.025 12.575C23.025 12.675 22.9833 12.7667 22.9 12.85L22 13.75L20.25 12L21.15 11.1C21.2333 11.0167 21.325 10.975 21.425 10.975C21.525 10.975 21.6167 11.0167 21.7 11.1L22.9 12.3ZM13 21V19.25L19.65 12.6L21.4 14.35L14.75 21H13Z" fill="white" />
        </g>
    </svg>
)

const ExamLogoActive = (props) => <Icon component={ExamSvgActive} />


const ExamSvg = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1_794" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="white" />
        </mask>
        <g mask="url(#mask0_1_794)">
            <path d="M6 15H13L15 13H6V15ZM6 11H12V9H6V11ZM4 7V17H11L9 19H2V5H22V8H20V7H4ZM22.9 12.3C22.9833 12.3833 23.025 12.475 23.025 12.575C23.025 12.675 22.9833 12.7667 22.9 12.85L22 13.75L20.25 12L21.15 11.1C21.2333 11.0167 21.325 10.975 21.425 10.975C21.525 10.975 21.6167 11.0167 21.7 11.1L22.9 12.3ZM13 21V19.25L19.65 12.6L21.4 14.35L14.75 21H13Z" fill="#008542C4" />
        </g>
    </svg>
)

const ExamLogo = (props) => <Icon component={ExamSvg} />

export {
    ExamLogo,
    ExamLogoActive
};