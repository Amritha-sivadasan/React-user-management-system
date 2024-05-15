import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className="h-screen overflow-hidden  flex justify-center  bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/039/578/478/non_2x/ai-generated-composition-of-beauty-and-make-up-cosmetics-on-pink-studio-background-photo.jpg')",
      }}
    >
      {" "}
      <h1 className=" text-3xl font-semibold text-center my-7 ">
        {!currentUser ? (
          <h1>Welcome Home </h1>
        ) : (
          <h1>{currentUser.userName}</h1>
        )}
      </h1>
    </div>
  );
}
