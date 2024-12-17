import Icon from "@ant-design/icons";

const WarningSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1_688" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
            <rect width="16" height="16" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_1_688)">
            <path d="M7.33331 11.3333H8.66665V7.33325H7.33331V11.3333ZM7.99998 5.99992C8.18887 5.99992 8.3472 5.93603 8.47498 5.80825C8.60276 5.68047 8.66665 5.52214 8.66665 5.33325C8.66665 5.14436 8.60276 4.98603 8.47498 4.85825C8.3472 4.73047 8.18887 4.66658 7.99998 4.66658C7.81109 4.66658 7.65276 4.73047 7.52498 4.85825C7.3972 4.98603 7.33331 5.14436 7.33331 5.33325C7.33331 5.52214 7.3972 5.68047 7.52498 5.80825C7.65276 5.93603 7.81109 5.99992 7.99998 5.99992ZM7.99998 14.6666C7.07776 14.6666 6.21109 14.4916 5.39998 14.1416C4.58887 13.7916 3.88331 13.3166 3.28331 12.7166C2.68331 12.1166 2.20831 11.411 1.85831 10.5999C1.50831 9.78881 1.33331 8.92214 1.33331 7.99992C1.33331 7.0777 1.50831 6.21103 1.85831 5.39992C2.20831 4.58881 2.68331 3.88325 3.28331 3.28325C3.88331 2.68325 4.58887 2.20825 5.39998 1.85825C6.21109 1.50825 7.07776 1.33325 7.99998 1.33325C8.9222 1.33325 9.78887 1.50825 10.6 1.85825C11.4111 2.20825 12.1166 2.68325 12.7166 3.28325C13.3166 3.88325 13.7916 4.58881 14.1416 5.39992C14.4916 6.21103 14.6666 7.0777 14.6666 7.99992C14.6666 8.92214 14.4916 9.78881 14.1416 10.5999C13.7916 11.411 13.3166 12.1166 12.7166 12.7166C12.1166 13.3166 11.4111 13.7916 10.6 14.1416C9.78887 14.4916 8.9222 14.6666 7.99998 14.6666ZM7.99998 13.3333C9.48887 13.3333 10.75 12.8166 11.7833 11.7833C12.8166 10.7499 13.3333 9.48881 13.3333 7.99992C13.3333 6.51103 12.8166 5.24992 11.7833 4.21659C10.75 3.18325 9.48887 2.66659 7.99998 2.66659C6.51109 2.66659 5.24998 3.18325 4.21665 4.21659C3.18331 5.24992 2.66665 6.51103 2.66665 7.99992C2.66665 9.48881 3.18331 10.7499 4.21665 11.7833C5.24998 12.8166 6.51109 13.3333 7.99998 13.3333Z" fill="#919191" />
        </g>
    </svg>

)

const WarningIcon = (props) => <Icon component={WarningSVG} />

export default WarningIcon;