import React from "react";
import Card from "../../../Components/Card";

const MealsShow = (props) => {
  return (
    <section className="meal" id="oneMeal">
      <Card {...props} />
    </section>
  );
};

export default MealsShow;
