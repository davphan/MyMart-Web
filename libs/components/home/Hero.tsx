import { PrimaryNavButton, SecondaryNavButton } from "../buttons";

export default function Hero() {
  return (
    <div className="relative flex">
      <img
        src="https://images.pexels.com/photos/868110/pexels-photo-868110.jpeg?cs=srgb&dl=pexels-wdnet-868110.jpg&fm=jpg"
        className="relative w-full top-0 left-0"
      />
      <div className="absolute flex flex-col justify-center items-center w-1/2 right-0 bg-white z-10 p-10 h-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl">Cheaper,</h1>
          <h1 className="text-5xl">Faster,</h1>
          <h1 className="text-5xl">More Convenient</h1>
          <p className="pt-3">
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