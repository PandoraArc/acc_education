import Icon from "@ant-design/icons";

const BinSVG = () => (
    <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1_663" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
            <rect y="0.611084" width="16" height="16" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_1_663)">
            <path d="M4.66663 14.6111C4.29996 14.6111 3.98607 14.4805 3.72496 14.2194C3.46385 13.9583 3.33329 13.6444 3.33329 13.2778V4.61108H2.66663V3.27775H5.99996V2.61108H9.99996V3.27775H13.3333V4.61108H12.6666V13.2778C12.6666 13.6444 12.5361 13.9583 12.275 14.2194C12.0138 14.4805 11.7 14.6111 11.3333 14.6111H4.66663ZM11.3333 4.61108H4.66663V13.2778H11.3333V4.61108ZM5.99996 11.9444H7.33329V5.94442H5.99996V11.9444ZM8.66663 11.9444H9.99996V5.94442H8.66663V11.9444Z" fill="black" />
        </g>
    </svg>
)

const BinIcon = (props) => <Icon component={BinSVG} />

export default BinIcon;