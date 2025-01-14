import useMeal from "../../Hooks/useMeal";
import MealCard from "../../shared/MealCard/MealCard";

function MealCards() {
  const [meals] = useMeal();
  return (
    <div className="grid grid-cols-3 gap-4">
      {meals.map((meal) => (
        <MealCard key={meal._id} meal={meal} />
      ))}
    </div>
  );
}

export default MealCards;
