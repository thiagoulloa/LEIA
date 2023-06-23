import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./style.css";

const marks = [
  {
    value: 1,
    label: "0.1",
  },
  {
    value: 3,
    label: "0.3",
  },
  {
    value: 5,
    label: "0.5",
  },
  {
    value: 7,
    label: "0.7",
  },
  {
    value: 10,
    label: "1",
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function TemperatureSlider() {
  return (
    <div className="slider">
      <Box>
        <Slider
          aria-label="Temperature"
          defaultValue={3}
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="on"
          marks={marks}
        />
      </Box>
    </div>
  );
}
