import PlansCard from "../../../../../components/PlansCard";

const HomeBuyPlans = () => {
  const buyPlans = [
    {
      title: "YouTube Subscribers",
      price: "$20",
      features: ["10 Subscribers"],
    },
    {
      title: "Instagram Followers",
      price: "$20",
      features: ["10 Followers"],
    },
    {
      title: "Tiktok Followers",
      price: "$20",
      features: ["10 Followers"],
    },
    {
      title: "Youtube Views",
      price: "$20",
      features: ["10k Views"],
    },
    {
      title: "Google Views",
      price: "$20",
      features: ["10k Views"],
    },
    {
      title: "Facebook Followers",
      price: "$20",
      features: ["10 Followers"],
    },
    {
      title: "Youtube WatchTime",
      price: "$20",
      features: ["10k Views"],
    },
    {
      title: "Google Ad Views",
      price: "$20",
      features: ["10k Views"],
    },
    {
      title: "Instagram Likes",
      price: "$20",
      features: ["10 Followers"],
    },
  ];

  return (
    <div className="my-20 mx-4">
      <h1 className="font-extrabold text-center text-4xl md:text-5xl my-8 md:my-20">
        Buy Plans
      </h1>
      <div className="grid grid-cols-3 gap-6 flex-wrap md:mx-20 justify-center">
        {buyPlans.map((plan, index) => (
          <PlansCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBuyPlans;
