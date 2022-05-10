import Round from "./Components/IngredientsRound";

let initNum = 1;
const wheelFoods = (e) => {
  let lastNum = initNum;

  initNum += e.deltaY * -0.01;
  if (initNum > lastNum) {
    e.target.scrollLeft -= 10;
  } else {
    e.target.scrollLeft += 10;
  }
};

const Ingredients = ({ ingredients }) => {
  if (ingredients.length === 0) return false;
  const ingredientsList = ingredients.map((item, index) => {
    return <Round key={index} item={item} />;
  });

  return (
    <nav className="foods">
      <div className="foods_title">準備食材</div>
      <div className="foods_content" id="foods" onWheel={(e) => wheelFoods(e)}>
        {ingredientsList}
      </div>
    </nav>
  );
};

export default Ingredients;
