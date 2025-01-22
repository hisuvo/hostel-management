import MealCard from "../../shared/MealCard/MealCard";

function MealCards({ items }) {
  const filterUpcomingMeals = (meals) => {
    const currentDate = new Date();
    return meals.filter((meal) => new Date(meal.postTime) < currentDate);
  };

  return (
    <>
      <h2 className="text-xl mb-2 bg-blue-100 p-2">
        Total Meals: {items.length}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterUpcomingMeals(items).map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </>
  );
}

export default MealCards;
