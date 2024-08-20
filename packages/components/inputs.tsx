interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function FormInputText({ label, className, type, ...rest } : InputProps) {
  return (
    <div className={`m-2 ${className}`}>
      <label className='flex flex-col'>
        {label}
        <input
          {...rest}
          className='bg-on_primary rounded-xl py-1 px-2'
          type={type ? type : 'text'}
        />
      </label>
    </div>
  );
}