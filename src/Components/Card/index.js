import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
const Card = (props) => {
  const { mealsData, ingredients, setMealsData } = props;
  //   const [isHearted, setIsHearted] = useState(false);
  const mealsList = JSON.parse(localStorage.getItem("meals")) || [];

  const first = useRef(true);
  useEffect(() => {
    if (!first.current) {
      if (mealsData.isHearted) {
        addMyFavorite(mealsData.idMeal);
      } else {
        removeMyFavorite(mealsData.idMeal);
      }
    }
  }, [mealsData.isHearted]);

//   useEffect(() => {
//     mealsList.forEach((item) => {
//       if (item.id !== mealsData.idMeal) return false;
//       if (item.isHearted) {
//         setMealsData({ ...item, isHearted: true });
//       } else {
//         setMealsData({ ...item, isHearted: false });
//       }
//     });
//   }, []);

  function addMyFavorite(id) {
    const meals = {
      id,
      ingredients,
      isHearted: mealsData.isHearted,
      mealsData,
    };
    mealsList.push(meals);
    localStorage.setItem("meals", JSON.stringify(mealsList));
  }

  function removeMyFavorite(id) {
    const rm = mealsList.find((item) => {
      return item.id === id;
    });
    const rmIndex = mealsList.indexOf(rm);
    // setIsHearted(false);
    mealsList.splice(rmIndex, 1);
    localStorage.setItem("meals", JSON.stringify(mealsList));
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

          <FontAwesomeIcon
          style={{ display: mealsData.isHearted ? "" : "none" }}
            onClick={() => {
              first.current = false;
              setMealsData({...mealsData, isHearted: false})
            }}
            icon={solid("heart")}
          />
          <FontAwesomeIcon
          style={{ display: mealsData.isHearted ? "none" : "" }}
            onClick={() => {
              first.current = false;
              setMealsData({...mealsData, isHearted: true})
            }}
            icon={regular("heart")}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
