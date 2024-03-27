import React from "react";

type FloatingInputProps = {
  errMsg: string;
  title: string;
  name: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  err: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

function FloatingInput({
  err,
  errMsg,
  title,
  name,
  placeholder,
  type,
  value,
  onChange,
  onKeyDown,
}: FloatingInputProps) {
  return (
    <div>
      <div className="relative w-full">
        <input
          data-err={err}
          name={name}
          type={type}
          id={`${name}floatingInput`}
          className="w-full appearance-none rounded-lg border-2 border-gray-300 px-2 pb-1 pt-5  text-gray-700 shadow outline-none ring-0 duration-200 placeholder:text-gray-500 hover:border-gray-500 focus:border-primary-700 data-[err=true]:border-rose-500 data-[err=true]:placeholder:text-rose-400 sm:px-3 sm:pb-2 sm:pt-6 text-xs"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
        <label
          data-err={err}
          htmlFor={`${name}floatingInput`}
          className="absolute left-2.5 top-[0.25rem] text-xs text-gray-500 data-[err=true]:text-rose-400 sm:left-3.5 sm:top-2 sm:text-[13px]"
        >
          {title}
        </label>
      </div>
      {err && <p className="mt-1 pl-1 text-xs text-rose-400">{errMsg}</p>}
    </div>
  );
}

export default FloatingInput;
