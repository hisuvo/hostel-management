import React from "react";
import useMeal from "../../../Hooks/useMeal";
import Container from "../../../shared/Container/Container";
import MealCards from "../../../components/MealCards/MealCards";

function Meals() {
  const [meals] = useMeal();

  return (
    <Container>
      <MealCards items={meals} />
    </Container>
  );
}

export default Meals;
