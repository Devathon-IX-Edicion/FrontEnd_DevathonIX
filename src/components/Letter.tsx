import React, { JSX, RefObject } from 'react';

type LetterProps = {
  contentLetter: React.ReactNode | JSX.Element;
  titleLetter: React.ReactNode | JSX.Element;
  ref?: RefObject<HTMLDivElement | null>;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Letter({
  contentLetter,
  titleLetter,
  className,
  ...props
}: LetterProps) {
  return (
    <div className={`letter ${className}`} {...props}>
      <div className='content'>{contentLetter}</div>
      <div className='footer trajan-pro-bold'>{titleLetter}</div>
    </div>
  );
}
