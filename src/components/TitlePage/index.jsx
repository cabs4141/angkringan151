import React from "react";

const TitlePage = ({ title }) => {
  return (
    <div className="flex flex-row  items-center justify-between font-goto text-md font-semibold xl:mt-8 mt-[-10%] pb-10 xl:pb-0">
      <div>
        <h1 className="font-opensauce font-bold text-md text-gray-600 flex justify-center xl:items-start ">{title}</h1>
      </div>
      <div></div>
    </div>
  );
};

export default TitlePage;
