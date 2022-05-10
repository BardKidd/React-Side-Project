import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const SearchBox = (props) => {
  const { mealsName, setMealsName, handleSearchMeals } = props;
  return (
    <header className="searchBox">
      <form id="searchForm">
        <input
          type="text"
          value={mealsName}
          onChange={(e) => setMealsName(e.target.value)}
          onKeyPress={handleSearchMeals}
        />
        <span onClick={handleSearchMeals}>
          <FontAwesomeIcon icon={solid("magnifying-glass")} id="searchIcon" />
        </span>
      </form>
    </header>
  );
};

export default SearchBox;
