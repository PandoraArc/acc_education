'use client';

import { useState } from "react";
import ArrowIcon from '@/public/icon/ArrowIcon';

function PrimaryButton(props) {

    const { text, padding, onClick } = props;
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const buttonStyle = {
        border: 'none',
        borderRadius: '1000px',
        background: isActive
            ? 'linear-gradient(102.66deg, #006633 -37.63%, #4CAF50 177.32%)'
            : isHovered
                ? 'linear-gradient(102.66deg, #007A3D -37.63%, #56B94A 177.32%)'
                : 'linear-gradient(102.66deg, #008542 -37.63%, #62C554 177.32%)',
        transition: 'background 0.3s',
    };


    return (
        <button
            style={buttonStyle}
            onClick={onClick ?? undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
        >
            <div
                style={{
                    padding: padding ?? '10px 25.5px 10px 25.5px',
                    display: 'flex',
                    gap: '4px'
                }}
            >
                <p
                    style={{
                        color: '#FBFCFE',
                        fontWeight: 700,
                        fontFamily: "IBM Plex Sans Thai",
                        fontSize: '15px',
                    }}
                >
                    {text}
                </p>
                <ArrowIcon />

            </div>
        </button>
    )
}

export default PrimaryButton;