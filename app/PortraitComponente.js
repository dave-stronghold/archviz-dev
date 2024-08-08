
// import { Player } from "@lottiefiles/react-lottie-player";
const Lottie = () => {
  return (
    <Player
      autoplay
      loop
      src="/rotate.json"
      style={{ height: "200px", width: "200px" }}
    ></Player>
  );
};
const PortraitComponent = () => {
  return (
    <div className="h-screen text-gray-200 bg-black flex justify-center items-center">
      <div className="text-center">
        <div className="w-full max-w-md p-4 rounded-lg shadow-lg  ">
          {/* <Info size={32} className="mx-auto" /> */}
        </div>
       {/* <Lottie /> */}
        <h1 className="text-2xl font-semibold ">Portrait Mode</h1>
        <p className="m-4 ">
          Please rotate your device to landscape mode to view the Architectural
          tour
        </p>
      </div>
    </div>
  );
};

export default PortraitComponent;
