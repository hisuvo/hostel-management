import React from "react";
import Container from "../../shared/Container/Container";
import SectionTitle from "../../shared/SectionTitle";

const Accordion = () => {
  // 5 FAG here
  const hostelFAQs = [
    {
      question: "What meals are provided in the hostel?",
      answer:
        "The hostel provides three meals daily: breakfast, lunch, and dinner. A weekly meal plan is shared every Sunday via notice or app.",
    },
    {
      question: "Can I request a special diet (vegetarian/vegan/gluten-free)?",
      answer:
        "Yes, you can select your dietary preferences during registration or update them later in your profile settings. The kitchen is informed accordingly.",
    },
    {
      question: "What should I do if I’m going to miss a meal?",
      answer:
        "You should notify the hostel mess supervisor at least 4 hours in advance using the app or the meal cancellation register to avoid food waste.",
    },
    {
      question: "Is outside food allowed in the hostel dining area?",
      answer:
        "No, outside food is not allowed in the dining hall to maintain hygiene and food safety standards. You can consume it in your room.",
    },
    {
      question: "How can I give feedback on meals?",
      answer:
        "You can submit meal feedback through the student portal or feedback box placed in the dining area. Feedback helps improve meal quality.",
    },
  ];

  return (
    <Container>
      <SectionTitle heading={"FAGS"} />
      <div className="space-y-4">
        {hostelFAQs.map((hostelFAQ, index) => (
          <div
            key={index}
            className="collapse bg-gray-200 text-gray-950 collapse-arrow  dark:bg-gray-900 dark:border dark:border-gray-700"
          >
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold dark:text-white">
              {hostelFAQ?.question}
            </div>
            <div className="collapse-content text-sm dark:text-gray-300">
              {hostelFAQ?.answer}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Accordion;
