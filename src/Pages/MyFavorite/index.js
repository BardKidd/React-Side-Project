import Round from "../Home/Ingredients/Components/IngredientsRound";
import Card from "../../Components/Card";
const FavoriteItem = (props) => {
  const { ingredients } = props.item;
  const allIngredients = ingredients.map((item, index) => {
    return <Round key={index} item={item} />;
  });

  return (
    <li
      style={{
        width: "50%",
        margin: "0 auto",
        listStyle: "none",
        backgroundColor: "white",
        borderRadius: "5px",
        borderBottom: "1px solid gray",
      }}
    >
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
