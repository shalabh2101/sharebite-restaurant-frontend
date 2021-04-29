import React, { Component } from "react";
import "./App.css";

const SubHeader = (props) => {

    console.log(props);
    return (
        <div className="subHeader">
          <div className="col-md-8">{props.name}</div>
          <div className="col-md-4" style={{ paddingRight: "4%" }}>
            <button type="button" className={props.disable?'btnMargin':"btn-primary btnMargin"} onClick={props.onBtnClick} disabled={props.disable}>
              Add
            </button>
          </div>
        </div>
  );
}

export default SubHeader;
