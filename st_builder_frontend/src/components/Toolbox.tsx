import { Element, useEditor } from '@craftjs/core';
import { Button as ShadCNButton } from './ui/button';
import { Button } from '@/components/user/Button';
import { Text } from '@/components/user/Text';
import { Card } from '@/components/user/Card';
import { Container } from '@/components/user/Container';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <div className="p-2">
      <div className="p-2">
        <h2>Drag to add</h2>
      </div>

      <div className="flex gap-4">
        <div>
          <ShadCNButton
            ref={(ref) => {
              if (ref) connectors.create(ref, <Button size="sm">Click me</Button>);
            }}
            variant="default"
          >
            Button
          </ShadCNButton>
        </div>
        <div>
          <ShadCNButton
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Text
                    text={`lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                    fontSize={20}
                    paggingY={100}
                    textAlign="center"
                    maxWidth={500}
                  />,
                );
            }}
            variant="default"
          >
            Текст
          </ShadCNButton>
        </div>
        <div>
          <ShadCNButton
            ref={(ref) => {
              if (ref)
                connectors.create(
                  ref,
                  <Element is={Container} paddingY={20} background="#999" canvas />,
                );
            }}
            variant="default"
          >
            Container
          </ShadCNButton>
        </div>
        <div>
          <ShadCNButton
            ref={(ref) => {
              if (ref) connectors.create(ref, <Card background="#999" />);
            }}
            variant="default"
          >
            Card
          </ShadCNButton>
        </div>
      </div>
    </div>
  );
};
