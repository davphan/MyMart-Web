'use client';

export default function ToggleBar({
  currentOption, options, setCurrentOption, className
} : {
  currentOption: number;
  options: string[];
  setCurrentOption: (option: number) => void;
  className?: string;
}) {

  return(
    <div className={`relative flex flex-row justify-center w-fit rounded-full bg-on_secondary ${className}`}>
      <div className={`absolute left-${24 * currentOption} rounded-full w-24 h-10 bg-on_primary`}/>
      {options.map((option, index) => (
        <div
          className={`z-10 w-24 h-10 leading-10 text-center hover:text-primary ${index === currentOption ? 'text-on_secondary' : 'text-on_primary'}`}
          key={option}
          onClick={() => {setCurrentOption(index)}}
        >
          {option}
        </div>
      ))}
    </div>
  );
}