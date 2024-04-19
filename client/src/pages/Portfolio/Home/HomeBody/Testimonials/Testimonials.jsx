import HorizontalSlider from "./HorizontalSlider";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const Testimonial=[
    {
      "name": "Ayesha Malik",
      "rating": 5,
      "description": "Earn4views helped me boost my YouTube channel's visibility tremendously! I purchased views and subscribers, and the results were outstanding. My channel gained credibility and attracted a wider audience. I highly recommend Earn4views for anyone looking to enhance their social media presence."
    },
    {
      "name": "Ali Khan",
      "rating": 5,
      "description": "As a freelancer, Earn4views has been a game-changer for me. I've earned a steady income by completing tasks and providing views on social media platforms. The platform is user-friendly, and the payouts are reliable. It's an excellent opportunity for anyone looking to monetize their skills."
    },
    {
      "name": "Fatima Ahmed",
      "rating": 4,
      "description": "Earn4views is a fantastic platform for growing your Instagram presence. I used their services to increase my followers and engagement, and the results were impressive. The support team was responsive, and the process was hassle-free. I'm grateful for the boost it gave to my social media profile!"
    },
    {
      "name": "Usman Mahmood",
      "rating": 5,
      "description": "I've been using Earn4views to enhance my TikTok account, and I'm thrilled with the outcome. The increase in views and likes has helped me gain more followers and credibility in the TikTok community. It's a reliable platform for anyone serious about growing their social media presence."
    },
    {
      "name": "Sana Khan",
      "rating": 4,
      "description": "Earn4views has been instrumental in promoting my Facebook page. The boost in likes and engagement has been remarkable, helping me reach a broader audience and attract potential customers for my business. I'm grateful for the positive impact it's had on my social media marketing efforts."
    },
    {
      "name": "Ahmed Ali",
      "rating": 5,
      "description": "I stumbled upon Earn4views while looking for ways to increase my YouTube views, and it exceeded my expectations. The service is efficient, and the results are evident. My channel's visibility has improved significantly, thanks to the boost provided by Earn4views. It's definitely worth trying!"
    }
  ]
  
  return (
    <div className="md:my-20">
      <h1 className="uppercase font-bold text-xl text-center my-4 md:my-20 md:text-4xl">
        What do our customers say?
      </h1>

      <div className="hidden lg:flex  flex-wrap mx-10 xl:mx-32 gap-3 justify-center">
        {Testimonial.map((item,index)=>(
          <TestimonialCard card={item} key={index} />
        ))}
      </div>

      <div className="lg:hidden">
        <HorizontalSlider
          values={Testimonial}
        />
      </div>
    </div>
  );
};

export default Testimonials;
