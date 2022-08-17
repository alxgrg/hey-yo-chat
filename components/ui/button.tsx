import type { NextPage } from 'next';
import React from 'react';

type Props = {
  children: React.ReactNode;
  color?: string;
  onClick?: () => void;
};

const Button: NextPage<Props> = ({
  children,
  color = 'bg-blue-600',
  onClick,
}) => {
  return (
    <button onClick={onClick} className={`p-3 text-white rounded ${color}`}>
      {children}
    </button>
  );
};

export default Button;
