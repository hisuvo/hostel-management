import SectionTitle from "../../../shared/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Container from "../../../shared/Container/Container";
import MealCards from "../../../components/MealCards/MealCards";
import useMeal from "../../../Hooks/useMeal";
import { useState } from "react";
import PrimayBtn from "../../../shared/Buttons/PrimayBtn";
import { Link } from "react-router-dom";

function MealsTab() {
  const [tabIndex, setTabIndex] = useState(0);
  const [meals] = useMeal();
  const breakfast = meals.filter((item) => item.category === "Breakfast");
  const lunch = meals.filter((item) => item.category === "Lunch");
  const dinner = meals.filter((item) => item.category === "Dinner");

  return (
    <Container>
      <SectionTitle
        heading={"Meals Category"}
        subHeading={"check food and test"}
      />
      <div className="my-8">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
            <Tab>All Meals</Tab>
          </TabList>

          <TabPanel>
            <MealCards items={breakfast} />
          </TabPanel>
          <TabPanel>
            <MealCards items={lunch} />
          </TabPanel>
          <TabPanel>
            <MealCards items={dinner} />
          </TabPanel>
          <TabPanel>
            <MealCards items={meals} />
          </TabPanel>
        </Tabs>
      </div>
    </Container>
  );
}

export default MealsTab;
