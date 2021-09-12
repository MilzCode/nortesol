import React from "react";
import Nouislider from "nouislider-react";

//format 55555 to $55,555
const formatNumberToprice = (value: number, maxValue: number) => {
  // value = Math.floor(Math.log(value + 1) * (maxValue / Math.log(100 + 1)));
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

const Test = () => {
  return (
    <div className="test">
      <h1>Slider</h1>
      <Nouislider
        range={{ min: 0, max: 100 }}
        start={[0, 100]}
        connect
        tooltips={[true, true]}
        format={{
          to: (value: number) => {
            return `$${formatNumberToprice(value, 5000000)}`;
          },
          from: (value: string) => {
            return parseInt(value);
          },
        }}
      />
    </div>
  );
};

export default Test;
