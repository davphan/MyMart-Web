import { PrimaryNavButton, SecondaryNavButton } from "../buttons";

export default function Hero() {
  return (
    <div className="relative flex justify-center items-center">
      <img
        src="https://images.pexels.com/photos/868110/pexels-photo-868110.jpeg?cs=srgb&dl=pexels-wdnet-868110.jpg&fm=jpg"
        className={`
          relative top-0 left-0 h-[28rem] object-cover
          sm:w-screen
          md:h-screen
        `}
      />
      <div
        className={`
          absolute flex flex-col justify-center items-center bg-white z-10 px-8
          w-3/4 h-5/6
          sm:w-1/2 sm:right-0 sm:h-full
        `}
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl">Cheaper,</h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl">Faster,</h1>
          <h1 className="text-3xl sm:text-5xl md:text-6xl">More Convenient</h1>
          <p className="text-sm pt-3 md:text-xl">
            Sign up or learn more about how you can change your grocery
            shopping experience.
          </p>
        </div>
        <div className="flex flex-row gap-5 pt-5">
          <PrimaryNavButton href='/signup'>Sign Up</PrimaryNavButton>
          <SecondaryNavButton href='/about'>Learn More</SecondaryNavButton>
        </div>
      </div>
    </div>
  )
}