import React, { useState, useEffect, useRef, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
const Card = (props) => {
  const { mealsData, ingredients, location } = props;
  const myLoveMeals = JSON.parse(localStorage.getItem("meals")) || [];
  const [isLoved, setIsLoved] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (!isFirst.current) {
      if (isLoved) {
        addMyFavorite(mealsData);
      } else {
        removeMyFavorite(mealsData);
      }
    }
  }, [isLoved]);

  function addMyFavorite(mealsData) {
    const meals = {
      id: mealsData.idMeal,
      ingredients,
      mealsData,
    };
    myLoveMeals.push(meals);
    localStorage.setItem("meals", JSON.stringify(myLoveMeals));
  }

  function removeMyFavorite(mealsData) {
    const rm = myLoveMeals.find((item) => {
      return item.id === mealsData.idMeal;
    });
    if (rm) {
      const rmIndex = myLoveMeals.indexOf(rm);
      myLoveMeals.splice(rmIndex, 1);
      localStorage.setItem("meals", JSON.stringify(myLoveMeals));
    }
  }

  function ShowLove() {
    if (location.pathname !== "/favorite") {
      return (
        <Fragment>
          <FontAwesomeIcon
            style={{ display: isLoved ? "" : "none" }}
            onClick={() => {
              isFirst.current = false;
              setIsLoved(false);
            }}
            icon={solid("heart")}
          />
          <FontAwesomeIcon
            style={{ display: isLoved ? "none" : "" }}
            onClick={() => {
              isFirst.current = false;
              setIsLoved(true);
            }}
            icon={regular("heart")}
          />
        </Fragment>
      );
    }
  }

  return (
    <div className="card">
      <div className="card_main">
        <img
          id="oneMeal_img"
          className="card_body"
          src={mealsData.strMealThumb}
          alt={`${mealsData.strMeal}`}
        />
        <div className="card_footer">
          <a
            rel="noreferrer noopener"
            target="_blank"
            href={mealsData.strYoutube}
            id="oneMeal_title"
          >
            {mealsData.strMeal}
          </a>
          {ShowLove()}
        </div>
      </div>
    </div>
  );
};

export default Card;
