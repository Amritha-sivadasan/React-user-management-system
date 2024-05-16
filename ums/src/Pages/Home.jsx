import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className="h-screen overflow-hidden  flex justify-center  bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/98/00/5d/98005d2adc6e37746ca9f9fde5d4378b.jpg')",
      }}
    >
      {" "}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          {!currentUser ? (
            <>
              <span>Welcome Home</span>
              <p className="text-lg mt-16">
                Discover the Beauty App, your one-stop beauty destination
                offering curated trends, expert services, personalized product
                recommendations, and a vibrant beauty community. Book
                appointments with trusted professionals, shop premium products,
                and explore a world of beauty inspiration tailored to your
                unique needs. Join our community of beauty enthusiasts and
                elevate your beauty routine with convenience, trust, and
                personalization. Download the Beauty App now and unlock a
                personalized beauty experience like never before.
              </p>
            </>
          ) : (
            <>
              {" "}
              <h1>Welcome {currentUser.userName}..</h1>
              <p className="text-lg mt-16 ">
                Discover the Beauty App, your one-stop beauty destination
                offering curated trends, expert services, personalized product
                recommendations, and a vibrant beauty community. Book
                appointments with trusted professionals, shop premium products,
                and explore a world of beauty inspiration tailored to your
                unique needs. Join our community of beauty enthusiasts and
                elevate your beauty routine with convenience, trust, and
                personalization. Download the Beauty App now and unlock a
                personalized beauty experience like never before.
              </p>
            </>
          )}
        </h1>
      </div>
    </div>
  );
}
