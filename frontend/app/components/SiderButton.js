import React from "react";
import styles from "./SiderButton.module.css";

function SiderButton (props) {

  const { text, active, activeIcon, Icon } = props;
  const styleUse = active ? styles.buttonActive : styles.button;

  return (
    <button onClick={props.onClick} className={styleUse}>
      {active ? activeIcon : Icon}
      <div
        style={{ marginLeft: "12px" }}
      >{text}</div>
    </button>
  )
}

export default SiderButton;