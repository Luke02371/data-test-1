import { createMuiTheme } from "@material-ui/core/styles";

// general base theme, Change to your liking...
const theme = createMuiTheme({
  palette: {
    color: {
      red: "#CC3333",
      lightBlue: "#69aca9",
      lightYellow: " #FFFFF0",
      blue: "#4671a2",
      blueHover: "#6280a3",
      lightGreen: "#b7cb59",
      green: "#81bb48",
      purple: "#8a63a9",
      pink: "#bf5b7b",
      offWhite: "#f7f7f7",
      coolBlue: "#0080ff",
      coolBlueHover: "#3696f5",
      otherBlue: "#389cff",
    },
    primary: {
      main: "rgba(0, 160, 255, 0.6)",
      hover: "#3696f5",
      lighter: "rgba(0, 160, 255, 0.6)",
    },
  },
});

export default theme;
