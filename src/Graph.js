import React, { Component } from "react";
import moment from "moment";

import {
  VictoryChart,
  VictoryScatter,
  VictoryTooltip,
  VictoryVoronoiTooltip,
  VictoryAxis,
  VictoryAnimation
} from "victory";

import CustomTooltip from "./Components/CustomTooltip";

class ArtistGraph extends Component {
  state = {
    data: []
  };
  renderSeries = () => {
    const arrayWithSizes = this.props.data.map(artist => {
      let duration = Math.pow(
        moment.duration(artist.endTime.diff(artist.y)).asHours() + 1,
        1.4
      );
      return { ...artist, size: duration };
    });
    return (
      <VictoryScatter
        data={arrayWithSizes}
        x={d => d.Stage}
        animate={{
          onEnter: {
            duration: 500
          },
          onExit: {
            duration: 500
          }
        }}
        style={{ data: { fill: d => d.color } }}
        labels={() => ""}
        labelComponent={<VictoryTooltip flyoutComponent={<CustomTooltip />} />}
      />
    );
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div>
          <VictoryChart
            scale={"time"}
            padding={{ top: 40, bottom: 40, left: 40, right: 100 }}
            width={800}
            height={370}
            domainPadding={{ x: 150 }}
            style={{ parent: { overflow: "visible", margin: "0" } }}
          >
            <VictoryAxis style={{ tickLabels: { fontSize: 6 } }} />
            <VictoryAxis
              style={{ tickLabels: { fontSize: 6 } }}
              dependentAxis
              tickCount={12}
            />
            {this.renderSeries()}
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default ArtistGraph;
