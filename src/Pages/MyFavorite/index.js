import Round from "../Home/Ingredients/Components/IngredientsRound";
import Card from "../../Components/Card";
import { useEffect } from "react";
const FavoriteItem = (props) => {
  const { ingredients, id } = props.item;
  const { setAllFavorite, allFavorite, location } = props;
  const allIngredients = ingredients.map((item, index) => {
    return <Round key={index} item={item} />;
  });

  //   正要寫這邊刪除按鈕
  function removeMyFavorite(id) {
    const rm = allFavorite.find((favorite) => {
      return id === favorite.id;
    });
    if (rm) {
      const rmIndex = allFavorite.indexOf(rm);

      //   刪除項目
      setAllFavorite(allFavorite.filter((item, index) => index !== rmIndex));

      //   最後一個用 useEffect 刪不掉，所以改用這個方式。
      if (allFavorite.length === 1) {
        setAllFavorite([]);
        localStorage.setItem("meals", JSON.stringify([]));
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(allFavorite));
  }, [allFavorite]);

  return (
    <li
      className="favoriteItem"
    >
      <button
        type="button"
        className="closeBtn"
        onClick={() => removeMyFavorite(id)}
      >
        X
      </button>
      <div
        className="contentBox"
      >
        <div className="contentBox_Card">
          <Card {...props.item} location={location} />
        </div>
        <div
          className="contentBox_IngredientsBox"
        >
          <div
            className="contentBox_IngredientsBox_Rounds"
          >
            {allIngredients}
          </div>
        </div>
      </div>
    </li>
  );
};

export default FavoriteItem;
