import axios from "axios";
import { useEffect, useState } from "react";
import { useCategory } from "../../zustand/category-store";

const CategoryDropDown = () => {
  const { categories, getCategory } = useCategory();
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <div className="dropdown dropdown-hover" onMouseEnter={getCategory}>
        <div className="btn font-goto font-thin bg-transparent shadow-none border-none hover:bg-slate-100 text-black text-[15px]">Kategori</div>
        <ul className="menu dropdown-content text-white bg-orange-400 rounded-[2px] z-[1] w-52 p-2 shadow font-goto">
          {categories.map((data) => {
            return (
              <li className=" hover:text-black" key={data.id}>
                <a className="hover:bg-white rounded-sm">{data.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDropDown;
