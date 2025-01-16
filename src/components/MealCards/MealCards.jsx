import MealCard from "../../shared/MealCard/MealCard";

function MealCards({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((meal) => (
        <MealCard key={meal._id} meal={meal} />
      ))}
    </div>
  );
}

export default MealCards;
