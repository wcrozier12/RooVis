import React, { Component } from "react";
import ArtistGraph from "../Graph";
import artistDataWhole from "../Data/artistDataWhole";
import Select from "react-select";
import "react-select/dist/react-select.css";
import logo from "../assets/rooLogo.png";
const selectWrapperStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "10px"
};
const selectStyle = {
  width: "20%"
};
export default class Layout extends Component {
  state = {
    data: [],
    filters: {},
    loading: true
  };

  filterArtists = (filters, array) => {
    let data = [];
    for (let i = 0; i < filters.length; i++) {
      for (let j = 0; j < array.length; j++) {
        for (let property in array[j]) {
          if (
            array[j][property] === filters[i].value &&
            data.indexOf(array[j]) === -1
          ) {
            data.push(array[j]);
          }
        }
      }
    }
    return data;
  };
  onFilterSelect = (filters, filterType) => {
    const currentFilters = { ...this.state.filters };
    currentFilters[filterType] = filters;
    const artistsByGenre =
      currentFilters["Genre"] && currentFilters["Genre"].length !== 0
        ? artistDataWhole.filter(artist => {
            for (let i = 0; i < currentFilters["Genre"].length; i++) {
              if (artist.Genre === currentFilters["Genre"][i].value) {
                return artist;
              }
            }
            return;
          })
        : artistDataWhole;

    const dayFilters = currentFilters["Day"] ? [...currentFilters["Day"]] : [];
    const stageFilters = currentFilters["Stage"]
      ? [...currentFilters["Stage"]]
      : [];
    let artistsByDay =
      dayFilters.length !== 0
        ? this.filterArtists(dayFilters, artistsByGenre)
        : [];
    let artistsByStage =
      stageFilters.length !== 0 && artistsByDay.length === 0
        ? this.filterArtists(stageFilters, artistsByGenre)
        : stageFilters.length !== 0
          ? this.filterArtists(stageFilters, artistsByDay)
          : [];
    const data =
      artistsByStage.length !== 0
        ? [...artistsByStage]
        : artistsByDay.length !== 0 ? [...artistsByDay] : artistsByGenre;

    this.setState({ filters: currentFilters, data });
  };

  componentDidMount() {
    this.setState({ data: artistDataWhole, loading: false });
  }

  render() {
    const { loading, filters, data } = this.state;
    return !loading ? (
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="logo" />
        <div style={selectWrapperStyle}>
          <Select
            wrapperStyle={selectStyle}
            name="genre"
            value={this.state.filters.Genre}
            onChange={e => this.onFilterSelect(e, "Genre")}
            placeholder="Select a genre.."
            multi
            options={[
              { value: "Rock", label: "Rock" },
              { value: "EDM", label: "EDM" },
              {
                value: "Country/Americana",
                label: "Country/Americana"
              },
              { value: "Soul/Blues", label: "Soul/Blues" },
              { value: "Funk/Jazz", label: "Funk/Jazz" },
              {
                value: "Jam/Reggae/World",
                label: "Jam/Reggae/World"
              },
              { value: "Hip-Hop", label: "Hip-Hop" },
              { value: "Pop/R&B", label: "Pop/R&B" },
              { value: "Indie", label: "Indie" }
            ]}
          />
          <Select
            wrapperStyle={selectStyle}
            name="day"
            value={filters["Day"]}
            placeholder="Select a day.."
            onChange={e => this.onFilterSelect(e, "Day")}
            multi
            options={[
              { value: "Thursday", label: "Thursday" },
              { value: "Friday", label: "Friday" },
              { value: "Saturday", label: "Saturday" },
              { value: "Sunday", label: "Sunday" }
            ]}
          />
          <Select
            wrapperStyle={selectStyle}
            name="stage"
            value={filters["Stage"]}
            placeholder="Select a stage.."
            onChange={e => this.onFilterSelect(e, "Stage")}
            multi
            options={[
              { value: "What", label: "What" },
              { value: "Which", label: "Which" },
              { value: "Who", label: "Who" },
              { value: "This Tent", label: "This Tent" },
              {
                value: "New Music On Tap Lounge",
                label: "New Music On Tap Lounge"
              },
              { value: "That Tent", label: "That Tent" },
              { value: "The Other", label: "The Other" }
            ]}
          />
        </div>
        <ArtistGraph data={data} />
      </div>
    ) : null;
  }
}
