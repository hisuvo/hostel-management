import React, { useState } from "react";
import Modal from "react-modal";
import PrimayBtn from "../../shared/Buttons/PrimayBtn";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "60vw",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const EditReview = ({ review, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [editReview, setEditReview] = useState("");
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log(review);

  const hanldeEdit = (e) => {
    e.preventDefault();
    axiosSecure
      .patch(`/update-review/${review._id}`, { review: editReview })
      .then((res) => {
        refetch();
        Swal.fire("review update done");
      });
  };

  return (
    <div>
      <PrimayBtn title={"Edit"} onClick={openModal}></PrimayBtn>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-xl font-semibold">Reviews Update</h2>

        <form onSubmit={hanldeEdit} className="mt-4">
          <textarea
            name="review"
            defaultValue={review?.review}
            placeholder="Write your review here...."
            className="rounded w-full p-2 border"
            rows={"3"}
            onChange={(e) => setEditReview(e.target.value)}
          ></textarea>
          {/* review submit button */}

          <PrimayBtn title={"Submit Review"} />
        </form>
        {/* Display the review text  */}
      </Modal>
    </div>
  );
};

export default EditReview;
