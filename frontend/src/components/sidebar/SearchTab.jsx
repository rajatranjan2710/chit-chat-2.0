import React from "react";
import { IoSearch } from "react-icons/io5";
import Profile from "./Profile";

const SearchTab = () => {
  return (
    <div className="searchTab">
      <div>
        <form>
          <input type="text" placeholder="Search" />
          <button>
            <IoSearch size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchTab;
