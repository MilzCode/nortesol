import React from "react";
import Nouislider from "nouislider-react";

const Test = () => {
  return (
    <div>
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
    </div>
  );
};

export default Test;
