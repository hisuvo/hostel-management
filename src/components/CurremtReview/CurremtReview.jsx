import { useState } from "react";
import Marquee from "react-fast-marquee";
import useReview from "../../Hooks/useReview";
import SectionTitle from "../../shared/SectionTitle";
import Container from "../../shared/Container/Container";

const CurremtReview = () => {
  const [reviews] = useReview();
  console.log("review number is a", reviews);

  return (
    <Container>
      <SectionTitle heading={"Current Review"} />
      <Marquee>
        {reviews.map((review) => (
          <div key={review._id} className="mx-4">
            <figure className="flex flex-col p-8  bg-blue-50 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
              <figcaption className="flex items-center justify-start ">
                <img
                  className="rounded-full w-9 h-9"
                  src={review?.image}
                  alt={review?.name}
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>{review?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ">
                    {review?.reviewerEmail}
                  </div>
                </div>
              </figcaption>

              <blockquote className=" my-2 text-gray-500  dark:text-gray-400 ">
                <h3 className="text-lg w-xl font-semibold text-gray-900 dark:text-white">
                  {review?.title}
                </h3>
                <p className="my-2 max-w-xl">{review?.review}...</p>
              </blockquote>
            </figure>
          </div>
        ))}
      </Marquee>
    </Container>
  );
};

export default CurremtReview;
