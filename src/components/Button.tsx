import { FC, ReactNode } from 'react';

type colorType = 'default' | 'alternative' | 'light' | 'green' | 'red' | 'whiteRed' | 'gray';

interface IButtonProps {
  children?: ReactNode;
  color?: colorType;
  customClasses?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  margin?: number;
  onClick?: () => void;
}

interface Colors {
  [key: string]: string;
}

const Button: FC<IButtonProps> = ({
  children,
  color = 'default',
  customClasses,
  type = 'button',
  margin,
  onClick,
}) => {
  const colors: Colors = {
    default: 'bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-300',
    gray: 'border border-gray-200 bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300',
    whiteRed:
      'border border-red-300 bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-200',
    alternative:
      'border border-gray-200 bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200',
    light: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-200',
    green: 'bg-green-700 text-white hover:bg-green-800 focus:ring-green-300',
    red: 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300',
  };
  return (
    <button
      type={type}
      className={
        customClasses
          ? customClasses
          : `mx-${
              margin ? margin : '0'
            } rounded-xs px-2 py-2 text-sm font-medium focus:outline-none focus:ring-4 ${
              colors[color]
            } `
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
