export default function Features() {
  return (
    <div className="flex flex-col justify-center items-center m-20 gap-10">
      <h1 className="font-semibold text-2xl">BETA</h1>
      <div className="flex flex-col items-center w-80 gap-2">
        <p className="text-center">
          Features are currently in development, come back soon to see features
          as they are released, or use
        </p>
        <a
          href="https://github.com/davphan/MyMart-Web"
          className="text-primary text-xl hover:opacity-50"
        >
          this link
        </a>
        <p className="text-center">
          to see and join in developing the open source code for MyMart!
        </p>
      </div>
    </div>
  );
}