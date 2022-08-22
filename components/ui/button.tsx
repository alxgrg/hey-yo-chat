import type { NextPage } from 'next';
import React from 'react';

import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  color?: string;
  href?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
};

const Button: NextPage<Props> = ({
  children,
  color = 'bg-blue-600',
  href,
  onClick,
}) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={`p-3 text-white rounded ${color}`}>{children}</a>
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={`p-3 text-white rounded ${color}`}>
      {children}
    </button>
  );
};

export default Button;
