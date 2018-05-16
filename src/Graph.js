import React, { Component } from "react";
import moment from "moment";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  YAxis,
  XAxis,
  MarkSeries,
  Hint
} from "react-vis";

import artistData, { colors } from "./artistData";
import formatDates from "./util/formatDates";
import "../node_modules/react-vis/dist/style.css";

const tipStyle = {
  display: "flex",
  color: "#fff",
  background: "black",
  alignItems: "center",
  padding: "5px",
  borderRadius: "10%",
  opacity: "0.8"
};

const boxStyle = {
  padding: "5px"
};

class ArtistGraph extends Component {
  state = {
    hoveredCell: false,
    data: [],
    loading: true
  };

  renderTooltip = hoveredCell => {
    return (
      <Hint value={hoveredCell}>
        <div style={tipStyle}>
          <div style={boxStyle}>
            <span>{hoveredCell.Artist}</span>
            <br />
            <span>Day: {hoveredCell.Day}</span>
            <br />
            <span>Time: {hoveredCell.Time}</span>
            <br />
            <span>
              {hoveredCell.Category ? `Genre: ${hoveredCell.Category}` : ""}
            </span>
          </div>
        </div>
      </Hint>
    );
  };

  onSearch = () => {
    const newState = { ...this.state };
    const data = { rock: newState.data["rock"] };
    this.setState({ data, loading: false });
  };

  renderSeries = () => {
    return Object.keys(this.state.data).map((genre, i) => {
      console.log(genre);
      const artistArray = this.state.data[genre];
      const arrayWithSizes = artistArray.map(artist => {
        let duration = Math.pow(
          moment.duration(artist.endTime.diff(artist.y)).asHours() + 1,
          2
        );
        // let duration = moment.duration(artist.endTime.diff(artist.y)).asHours();
        return { ...artist, size: duration };
      });
      return (
        <MarkSeries
          data={arrayWithSizes}
          key={i}
          color={colors[genre]}
          onValueMouseOver={v =>
            this.setState({ hoveredCell: v.x && v.y ? v : false })}
          onValueMouseOut={v => this.setState({ hoveredCell: false })}
        />
      );
    });
  };

  componentDidMount() {
    this.setState({ data: artistData, loading: false });
  }
  render() {
    const { hoveredCell, data, loading } = this.state;
    const rendered = !loading ? (
      <div>
        <button onClick={this.onSearch}> Click me </button>
        <XYPlot
          height={800}
          width={1300}
          margin={{ left: 100, right: 40, top: 50, bottom: 50 }}
          yType="time"
          xType="ordinal"
          colorType="category"
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {this.renderSeries()}
          {hoveredCell ? this.renderTooltip(hoveredCell) : null}
        </XYPlot>
      </div>
    ) : null;
    return rendered;
  }
}

export default ArtistGraph;
