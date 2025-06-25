const LoginButton = ({ handleAuth, title }) => {
  return (
    <>
      <button onClick={handleAuth} className="xl:w-[72px] xl:h-[32px] w-[160px] h-[32px] text-blue-500 rounded-lg border-blue-500 border font-opensauce font-bold text-xs xl:mr-3 lg:mr-3">
        {title}
      </button>
    </>
  );
};

export default LoginButton;
