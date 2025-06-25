import { useNavigate } from "react-router-dom";
import { useSearchProduct } from "../../zustand/products-store";

const SearchBar = () => {
  const { searchTerm, setQuery } = useSearchProduct();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") submitInput();
  };

  const submitInput = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products/search/${searchTerm}`);
    }
  };

  return (
    <div className="relative flex items-center xl:w-[540px] w-[240px]">
      <input
        value={searchTerm}
        onKeyDown={handleEnter}
        onChange={handleInput}
        type="text"
        placeholder="Cari di RRTM Store"
        className="text-black placeholder:text-slate-600 placeholder:font-light border-gray-400 border rounded-lg pl-4 h-10 w-full font-opensauce text-sm focus:outline-none focus:border-none focus:ring-slate-400"
      />
      <div className="absolute rounded-lg right-[4px] items-center justify-center mt-1 mr-2">
        <button onClick={submitInput}>
          <img className=" text-gray-500" src="https://img.icons8.com/?size=100&id=59878&format=png&color=0000004D" alt="search icon" width={25} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
