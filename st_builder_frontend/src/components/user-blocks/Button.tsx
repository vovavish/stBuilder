import { FC } from 'react';

import { useNode } from '@craftjs/core';

import { ButtonProps } from '@/components/ui/button';
import { Button as ShadCNButton } from '@/components/ui/button';

export const Button: FC<ButtonProps> & {
  craft: { props: typeof ButtonDefaultProps, related: { settings: typeof ButtonSettings } };
} = ({ size, variant, color, children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <ShadCNButton
      ref={(ref) => ref && connect(drag(ref))}
      size={size}
      variant={variant}
      color={color}
    >
      {children}
    </ShadCNButton>
  );
};

const ButtonSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div>
      {/* Size Settings */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Size</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="size"
              value="default"
              checked={props.size === 'default'}
              onChange={(e) =>
                setProp(
                  (props: ButtonProps) => (props.size = e.target.value as ButtonProps['size']),
                )
              }
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Default</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="size"
              value="sm"
              checked={props.size === 'sm'}
              onChange={(e) =>
                setProp(
                  (props: ButtonProps) => (props.size = e.target.value as ButtonProps['size']),
                )
              }
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Small</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="size"
              value="lg"
              checked={props.size === 'lg'}
              onChange={(e) =>
                setProp(
                  (props: ButtonProps) => (props.size = e.target.value as ButtonProps['size']),
                )
              }
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Large</span>
          </label>
        </div>
      </div>

      {/* Variant Settings */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Variant</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="variant"
              value="default"
              checked={props.variant === 'default'}
              onChange={(e) =>
                setProp(
                  (props: ButtonProps) =>
                    (props.variant = e.target.value as ButtonProps['variant']),
                )
              }
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Text</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="variant"
              value="outline"
              checked={props.variant === 'outline'}
              onChange={(e) =>
                setProp(
                  (props: ButtonProps) =>
                    (props.variant = e.target.value as ButtonProps['variant']),
                )
              }
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Outlined</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="variant"
              value="secondary"
              checked={props.variant === 'secondary'}
              onChange={(e) =>
                setProp(
                  (props: ButtonProps) =>
                    (props.variant = e.target.value as ButtonProps['variant']),
                )
              }
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Secondary</span>
          </label>
        </div>
      </div>

      {/* Color Settings */}
      <div>
        <label className="block text-sm font-semibold mb-2">Color</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="color"
              value="default"
              checked={props.color === 'default'}
              onChange={(e) => setProp((props: ButtonProps) => (props.color = e.target.value))}
              className="form-radio text-gray-600"
            />
            <span className="ml-2">Default</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="color"
              value="primary"
              checked={props.color === 'primary'}
              onChange={(e) => setProp((props: ButtonProps) => (props.color = e.target.value))}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Primary</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="color"
              value="secondary"
              checked={props.color === 'secondary'}
              onChange={(e) => setProp((props: ButtonProps) => (props.color = e.target.value))}
              className="form-radio text-green-600"
            />
            <span className="ml-2">Secondary</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export const ButtonDefaultProps = {
  size: 'default',
  variant: 'default',
  color: '#000',
  text: 'Click me',
};

Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: ButtonSettings,
  },
};
