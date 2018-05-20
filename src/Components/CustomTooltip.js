import React, { Component } from "react";

const tipStyle = {
  display: "flex",
  color: "#fff",
  backgroundColor: "black",
  alignItems: "center",
  padding: "5px",
  borderRadius: "10%"
};

const boxStyle = {
  padding: "5px",
  backgroundColor: "black"
};
export default class CustomTooltip extends Component {
  render() {
    const { datum, x, y } = this.props;

    return (
      <g
        style={{
          pointerEvents: "none",
          fontSize: "6px",
          display: "flex",
          alignItems: "center",
          margin: "2px",
          opacity: "0.97"
        }}
      >
        <foreignObject x={x} y={y} width="80" height="50">
          <div
            style={{
              marginLeft: "5px",
              color: "#D9D9DF",
              padding: "3px 3px 3px 10px",
              backgroundColor: "#3E3E3E",
              borderRadius: "10%"
            }}
          >
            <span>{datum.Artist}</span>
            <br />
            <span>Day: {datum.Day}</span>
            <br />
            <span>Time: {datum.Time}</span>
            <br />
            <span>{datum.Category ? `Genre: ${datum.Genre}` : ""}</span>
          </div>
        </foreignObject>
      </g>
    );
  }
}
