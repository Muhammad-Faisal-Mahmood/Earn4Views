import ProgressBar from "./ProgressBar";
import Step from "./Step";

const Steps = ({ step }) => {
  return (
    <div className="my-10">
      {step === 1 && (
        <div className="text-center font-semibold text-white text-xl flex justify-center items-center gap-3">
          <Step step={1} filled={true} />
          <ProgressBar progress={"half"} />
          <Step step={2} />
          <ProgressBar />
          <Step step={3} />
        </div>
      )}
      {step === 2 && (
        <div className="text-center font-semibold text-white text-xl flex justify-center items-center gap-3">
          <Step step={1} filled={true} />
          <ProgressBar progress={"full"} />
          <Step step={2} filled={true} />
          <ProgressBar progress={"half"} />
          <Step step={3} />
        </div>
      )}
      {step === 3 && (
        <div className="text-center font-semibold text-white text-xl flex justify-center items-center gap-3">
          <Step step={1} filled={true} />
          <ProgressBar progress={"full"} />
          <Step step={2} filled={true} />
          <ProgressBar progress={"full"} />
          <Step step={3} filled={true} />
        </div>
      )}
    </div>
  );
};

export default Steps;
