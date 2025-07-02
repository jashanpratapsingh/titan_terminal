import { ReactNode } from 'react';
import { cn } from 'src/misc/cn';

const V2SexyChameleonText = ({
  children,
  className,
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}) => {
  return (
    <span
      className={cn(
        'text-transparent bg-clip-text bg-gradient-to-r from-titan-purple to-titan-blue',
        className,
        {
          'animate-hue': animate,
        },
      )}
    >
      {children}
    </span>
  );
};

export default V2SexyChameleonText;
