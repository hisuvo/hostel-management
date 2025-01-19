const PrimayBtn = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn bg-blue-700 hover:bg-blue-800 text-white"
    >
      {title}
    </button>
  );
};

export default PrimayBtn;
