import { useEffect, useState } from "react";
import ToggleBar from "./ToggleBar";
import Overview from "./Overview";
import Features from "./Features";

export default function Details() {
  const options: string[] = ['Overview', 'Features'];
  const [currentOption, setCurrentOption] = useState(0);

  return (
    <div>
      <div className="w-screen bg-secondary py-5">
        <ToggleBar
          currentOption={currentOption}
          options={options}
          setCurrentOption={setCurrentOption}
          className="mx-auto"
        />
      </div>
      {currentOption === 0 && <Overview />}
      {currentOption === 1 && <Features />}
    </div>
  );
}