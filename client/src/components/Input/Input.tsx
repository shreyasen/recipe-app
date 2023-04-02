import React, { ChangeEvent } from 'react';

type MyInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const Input: React.FC<MyInputProps> = ({ onChange }) => {
  return (
    <input
      type={'text'}
      onChange={onChange}
      className="add-recipe__input-text"
    />
  );
};
export default Input;
