interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string[];
}

export function FormInputText({ label, errors, className, name, type, ...rest } : InputProps) {

  return (
    <div className={`m-2 ${className}`}>
      <label className='flex flex-col'>
        {label}
        <input
          {...rest}
          className='bg-on_primary rounded-xl py-1 px-2'
          type={type ? type : 'text'}
          name={name}
          required
        />
        <div id={`${name ? name + '-' : ''}error`} aria-live="polite" aria-atomic="true">
            {errors &&
              errors.map((error: string) => (
                <p className='form-error mt-2 text-sm text-red-500' key={error}>
                  {error}
                </p>
              ))}
          </div>
      </label>
    </div>
  );
}