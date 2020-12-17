import React from "react";
import classnames from 'classnames';

import "components/Button.scss";
/**
 * Buttons used in booking, editing and cancelling of appointments.
 * 
 */
export default function Button(props) {
  const {confirm, danger} = props;
  
  const buttonClass = classnames("button", {
    "button--confirm": confirm,
    "button--danger": danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}