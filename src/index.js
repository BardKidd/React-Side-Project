import React, { useEffect, useState, Fragment, useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./Scss/all.scss";
// ======================================================
import SearchBox from "./Pages/Home/SearchBox";
import Ingredients from "./Pages//Home/Ingredients";
import MealsShow from "./Pages/Home/MealsShow";
// ======================================================
import FavoriteItem from "./Pages/MyFavorite";
// ======================================================
import NavBar from "./Components/NavBar";
import { SEARCH_MEALS, GET_RANDOM_MEALS } from "./Global";
import { MyTotalFavorite } from "./Context";

function Home() {
  const [mealsName, setMealsName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [mealsData, setMealsData] = useState({});
  const myTotalFavorite = useContext(MyTotalFavorite);

  const handleSearchMeals = async (e) => {
    if (
      (e.target.tagName.toLowerCase() === "input" && e.key !== "Enter") ||
      !mealsName
    )
      return false;
    e.preventDefault();
    setMealsData({});
    setIngredients([]);

    const api = await fetch(`${SEARCH_MEALS}${mealsName}`);
    const res = await api.json();
    const data = res.meals ? res.meals[0] : null;

    if (data) {
      let isHearted = false;
      myTotalFavorite.forEach((item) => {
        if (item.id === data.idMeal) {
          isHearted = true;
        }
      });

      setMealsData({ ...data, isHearted });
    } else {
      alert("未搜尋到該食譜");
    }
  };

  useEffect(() => {
    if (Object.keys(mealsData).length !== 0) {
      const ingredientsValue = Object.values(mealsData);
      const ingredientsKeys = Object.keys(mealsData);

      ingredientsKeys.forEach((key, index) => {
        if (key.match("strIngredient") && ingredientsValue[index]) {
          setIngredients((o) => [
            ...o,
            {
              Name: ingredientsValue[index],
              Image: `https://www.themealdb.com/images/ingredients/${ingredientsValue[index]}-Small.png`,
            },
          ]);
        }
      });
    }
  }, [mealsData]);

  useEffect(() => {
    const getRandom = async () => {
      const api = await fetch(GET_RANDOM_MEALS);
      const res = await api.json();
      const data = res.meals[0];
      let isHearted = false;

      if (myTotalFavorite) {
        myTotalFavorite.forEach((item) => {
          if (item.id === data.idMeal) {
            isHearted = true;
          }
        });
      }
      setMealsData({ ...data, isHearted });
    };
    getRandom();
  }, []);

  return (
    <article className="recipeBox">
      <SearchBox
        mealsName={mealsName}
        setMealsName={setMealsName}
        handleSearchMeals={handleSearchMeals}
      />
      <Ingredients ingredients={ingredients} />
      <MealsShow
        ingredients={ingredients}
        mealsData={mealsData}
        setMealsData={setMealsData}
      />
    </article>
  );
}

function Favorite() {
  const [allFavorite] = useState(JSON.parse(localStorage.getItem("meals")));
  const renderItem = allFavorite.map((item) => {
    return <FavoriteItem key={item.id} item={item}></FavoriteItem>;
  });

  return (
    <div>
      <ul>{renderItem}</ul>
    </div>
  );
}

function App() {
  return (
    <Fragment>
      <NavBar></NavBar>
      <MyTotalFavorite.Provider
        value={JSON.parse(localStorage.getItem("meals"))}
      >
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/favorite">
            <Favorite />
          </Route>
        </Switch>
      </MyTotalFavorite.Provider>
    </Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
