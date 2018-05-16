export default function(array) {
  return array.map(artist => {
    if (artist.Category === "Rock") {
      artist.color = "#ff6c00";
    }
    if (artist.Category === "EDM") {
      artist.color = "#00c0bf";
    }
    if (artist.Category === "Hip-Hop") {
      artist.color = "#6fff6b";
    }
    if (artist.Category === "Pop/R&B") {
      artist.color = "#D955A0";
    }
    if (artist.Category === "Indie") {
      artist.color = "#46B3B3";
    }
    if (artist.Category === "Jam/Reggae/World") {
      artist.color = "#81003F";
    }
    if (artist.Category === "Country/Americana") {
      artist.color = "#0D3184";
    }
    if (artist.Category === "Funk/Jazz") {
      artist.color = "#7C30B0";
    }
    if (artist.Category === "Soul/Blues") {
      artist.color = "#6BE400";
    }

    if (!artist.Category) {
      artist.color = "#FFE800";
    }
    if (artist.Day === "Thursday") {
      const dashIndex = artist.Time.indexOf("-");
      let startTime;
      let endTime;
      if (artist.Time.indexOf("AM") === 6) {
        startTime = `moment("2018-06-08 ${artist.Time.substring(
          0,
          dashIndex
        )}")`;
        endTime = `moment("2018-06-08 ${artist.Time.substring(
          dashIndex + 1,
          artist.Time.length
        )}")`;
      } else {
        startTime = `moment("2018-06-07 ${artist.Time.substring(
          0,
          dashIndex
        )}")`;
        endTime = `moment("2018-06-07 ${artist.Time.substring(
          dashIndex + 1,
          artist.Time.length
        )}")`;
      }
      return { ...artist, y: startTime, endTime };
    }
    if (artist.Day === "Friday") {
      const dashIndex = artist.Time.indexOf("-");
      let startTime;
      let endTime;
      if (artist.Time.indexOf("AM") === 6) {
        startTime = `moment("2018-06-09 ${artist.Time.substring(
          0,
          dashIndex
        )}")`;
        endTime = `moment("2018-06-09 ${artist.Time.substring(
          dashIndex + 1,
          artist.Time.length
        )}")`;
      } else {
        startTime = `moment("2018-06-08 ${artist.Time.substring(
          0,
          dashIndex
        )}")`;
        endTime = `moment("2018-06-08 ${artist.Time.substring(
          dashIndex + 1,
          artist.Time.length
        )}")`;
      }
      return { ...artist, y: startTime, endTime };
    }
    if (artist.Day === "Saturday") {
      const dashIndex = artist.Time.indexOf("-");
      let startTime;
      let endTime;
      if (artist.Time.indexOf("AM") === 6) {
        startTime = `moment("2018-06-10 ${artist.Time.substring(
          0,
          dashIndex
        )}")`;
        endTime = `moment("2018-06-10 ${artist.Time.substring(
          dashIndex + 1,
          artist.Time.length
        )}")`;
      } else {
        startTime = `moment("2018-06-09 ${artist.Time.substring(
          0,
          dashIndex
        )}")`;
        endTime = `moment("2018-06-09 ${artist.Time.substring(
          dashIndex + 1,
          artist.Time.length
        )}")`;
      }
      return { ...artist, y: startTime, endTime };
    }
    if (artist.Day === "Sunday") {
      const dashIndex = artist.Time.indexOf("-");
      const startTime = `moment("2018-06-10 ${artist.Time.substring(
        0,
        dashIndex
      )}")`;
      const endTime = `moment("2018-06-010 ${artist.Time.substring(
        dashIndex + 1,
        artist.Time.length
      )}")`;
      return { ...artist, y: startTime, endTime };
    }
  });
}
