import HorizontalSlider from "./HorizontalSlider";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <div className="md:my-20">
      <h1 className="uppercase font-bold text-xl text-center my-4 md:my-20 md:text-4xl">
        What do our customers say?
      </h1>

      <div className="hidden md:flex  flex-wrap mx-10 lg:mx-32 gap-3 justify-center">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </div>

      <div className="md:hidden">
        <HorizontalSlider
          values={[
            "dfwer1",
            "dfwer2",
            "dfwer3",
            "dfwer4",
            "dfwer5",
            "dfwer6",
            "sdfds7",
            "dfwer8",
            "dfwer9",
          ]}
        />
      </div>
    </div>
  );
};

export default Testimonials;
