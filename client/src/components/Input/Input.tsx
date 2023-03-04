import React, { ChangeEvent } from 'react';

type MyInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
const Input: React.FC<MyInputProps> = ({ onChange }) => {
  return <input type={'text'} onChange={onChange} />;
};
export default Input;
