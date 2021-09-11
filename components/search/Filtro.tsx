import React, { useState } from "react";
import Select from "react-select";

const Filtro = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const marcas = [
    { value: "torre", label: "Torre" },
    { value: "murano", label: "Murano" },
    { value: "colon", label: "Colon" },
  ];
  return (
    <div className="filtro">
      <div className="filtro__marca">
        <span>Marca:</span>
        <Select
          inputId="filtro-marca"
          isMulti
          name="marcas"
          options={marcas}
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedOption}
          onChange={(e: any) => setSelectedOption(e)}
        />
      </div>
    </div>
  );
};

export default Filtro;
