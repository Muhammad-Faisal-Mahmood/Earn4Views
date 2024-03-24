import HomeContact from "./Home Contact";
import HomeBuyPlans from "./HomeBuyPlans";
import HomeHero from "./HomeHero";
import HomeWorkers from "./HomeWorkers";
import SocialMediaPlatforms from "./SocialMediaPlatforms";
import Testimonials from "./Testimonials";

const HomeBody = () => {
  return (
    <>
      <HomeHero />
      <SocialMediaPlatforms />
      <HomeWorkers />
      <HomeBuyPlans />
      <Testimonials />
      <HomeContact />
    </>
  );
};

export default HomeBody;
