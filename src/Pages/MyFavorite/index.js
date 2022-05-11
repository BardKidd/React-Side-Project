import Round from "../Home/Ingredients/Components/IngredientsRound";
import Card from "../../Components/Card";
import { useEffect } from "react";
const FavoriteItem = (props) => {
  const { ingredients, id } = props.item;
  const { setAllFavorite, allFavorite } = props;
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
    console.log("allFavorite", allFavorite);
    localStorage.setItem("meals", JSON.stringify(allFavorite));
  }, [allFavorite]);

  return (
    <li
      style={{
        width: "50%",
        margin: "0 auto",
        listStyle: "none",
        backgroundColor: "white",
        borderRadius: "5px",
        borderBottom: "1px solid gray",
        position: "relative",
      }}
    >
      <button
        type="button"
        style={{
          position: "absolute",
          right: -10,
          top: -10,
          width: "30px",
          height: "30px",
          borderRadius: "30px",
          border: "none",
          backgroundColor: "#f44336",
          color: "#fafafa",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => removeMyFavorite(id)}
      >
        X
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ flex: 1 }}>
          <Card {...props.item} />
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {allIngredients}
          </div>
        </div>
      </div>
    </li>
  );
};

export default FavoriteItem;
