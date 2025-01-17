import type { FC } from 'react';

export const Preloader: FC = () => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-20 h-20 border-2 border-t-transparent border-gray-300 border-solid rounded-full animate-spin" />
    </div>
  );
};
