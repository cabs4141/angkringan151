import React from "react";

const RegisterButton = ({ handleAuth, title }) => {
  return (
    <>
      <button onClick={handleAuth} className="xl:w-[72px] xl:h-[32px]  w-[160px] h-[32px] bg-orange-500 text-white rounded-lg font-opensauce font-bold text-xs">
        {title}
      </button>
    </>
  );
};

export default RegisterButton;
