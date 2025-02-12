function Container({ children }) {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 md:my-12 lg:my-16 xl:my-20">
      {children}
    </div>
  );
}

export default Container;
