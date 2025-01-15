import React from "react";
import useMeal from "../../../Hooks/useMeal";
import MealCard from "../../../shared/MealCard/MealCard";
import Container from "../../../shared/Container/Container";
import MealCards from "../../../components/MealCards/MealCards";

function Meals() {
  const [meals] = useMeal();

  return (
    <Container>
      <MealCards items={meals} />
      {/* <div className="grid grid-cols-3 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div> */}
    </Container>
  );
}

export default Meals;
