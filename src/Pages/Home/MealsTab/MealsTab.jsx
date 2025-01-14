import SectionTitle from "../../../shared/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Container from "../../../shared/Container/Container";
import MealCards from "../../../components/MealCards/MealCards";

function MealsTab() {
  return (
    <Container>
      <SectionTitle
        heading={"Meals Category"}
        subHeading={"check food and test"}
      />
      <div className="my-12">
        <Tabs>
          <TabList>
            <Tab>All Meals</Tab>
            <Tab>Breakfast</Tab>
            <Tab>Lunch</Tab>
            <Tab>Dinner</Tab>
          </TabList>

          <TabPanel>
            <MealCards />
          </TabPanel>
          <TabPanel>
            <MealCards />
          </TabPanel>
          <TabPanel>
            <MealCards />
          </TabPanel>
          <TabPanel>
            <MealCards />
          </TabPanel>
        </Tabs>
      </div>
    </Container>
  );
}

export default MealsTab;
