import { ContainerProps } from './Container';

export const Container_public: React.FC<ContainerProps> = ({
  background,
  paddingX = 0,
  paddingY = 0,
  children,
}) => {
  return (
    <div style={{ margin: '0', background, padding: `${paddingY}px ${paddingX}px` }}>
      {children}
    </div>
  );
};
