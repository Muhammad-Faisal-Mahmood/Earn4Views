import { useEffect, useState } from "react";
import PlansCard from "../../../../../components/PlansCard";
import { Base_Api } from "../../../../../utils/BaseApi";

const HomeBuyPlans = () => {
  const [buyPlanData, setbuyPlanData] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(Base_Api + "api/userAuth/getPlans");
        const data = await response.json();
        console.log(data?.plan);
        setbuyPlanData(data?.plan);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="my-20 mx-4">
      <h1 className="font-extrabold text-center text-4xl md:text-5xl my-8 md:my-20">
        Buy Plans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap md:mx-20 justify-center">
        {buyPlanData.map((plan, index) => (
          <PlansCard
            key={index}
            title={plan.Service}
            price={plan.Price * 100}
            features={["100 Subscribers"]}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBuyPlans;
