import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <div className="md:my-20">
      <h1 className="uppercase text-4xl font-bold text-center my-20">
        What do our customers say?
      </h1>

      <div className="flex flex-wrap md:mx-32 gap-3 justify-center">
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
      </div>
    </div>
  );
};

export default Testimonials;
