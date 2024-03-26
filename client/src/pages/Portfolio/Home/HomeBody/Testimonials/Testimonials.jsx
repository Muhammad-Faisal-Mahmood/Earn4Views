import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <div className="md:my-20">
      <h1 className="uppercase font-bold text-xl text-center my-20 md:text-4xl">
        What do our customers say?
      </h1>

      <div className="flex flex-wrap mx-10 lg:mx-32 gap-3 justify-center">
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
