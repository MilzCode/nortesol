import React from "react";
import Nouislider from "nouislider-react";
import SliderPrecios from "../components/venta/SliderPrecios";

const Test = () => {
  return (
    <div className="test">
      <h1 className="mb-5">Slider</h1>
      <SliderPrecios minValue={0} maxValue={200000} onChange={(e: any) => console.log(e)} />
    </div>
  );
};

export default Test;
