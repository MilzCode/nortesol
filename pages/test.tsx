import React from "react";
//import firebase storage

const TEST = ({ fb }: any) => {
  const [image, setImage] = React.useState(null);
  const handdleUpload = (e: any) => {
    setImage(e.target.files[0]);
  };
  const handdleSubir = (e: any) => {
    fb.uploadImage(image, "test");
  };
  return (
    <div>
      {/* input file img */}
      <br />
      <br />
      <input type="file" onChange={handdleUpload} />
      <br />
      <br />
      <button onClick={handdleSubir}>Subir</button>
    </div>
  );
};

export default TEST;
