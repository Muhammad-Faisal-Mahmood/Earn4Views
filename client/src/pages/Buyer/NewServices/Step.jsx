const Step = ({ step, filled }) => {
  return (
    <span
      className={`${
        filled
          ? "two-color-gradient-background text-white"
          : "bg-neutral-300 text-black"
      }  rounded-full flex items-center justify-center w-8 h-8 text-center font-bold`}
    >
      {step}
    </span>
  );
};

export default Step;
