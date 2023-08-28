import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import type { WCButton } from './button';
import './button';

export default {
  title: 'Components/Button',
  component: 'wc-button',
  argTypes: {
    variant: {
      type: 'string',
      options: ['primary', 'secondary'],
      defaultValue: 'primary',
      control: {
        type: 'radio',
      },
    },
    disabled: {
      type: 'boolean',
      control: {
        type: 'boolean',
      },
    },
    ariaLabel: {
      name: 'aria-label',
    },
    ariaLabelledBy: {
      name: 'aria-labelledBy',
      table: {
        disable: true,
      },
    },
    innerText: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Buttons allow users to perform an action or to navigate to another page. They have multiple styles for various needs, and are ideal for calling attention to where a user needs to do something in order to move forward in a flow.',
      },
    },
  },
};

export const ButtonDefault: Story<WCButton> = ({
  innerText,
  variant,
  disabled,
  ariaLabelledBy,
  id,
  type,
}: WCButton) => html`<wc-button
  type=${type}
  variant="${variant}"
  ?disabled=${disabled}
  .ariaLabelledBy="${ariaLabelledBy}"
  id=${id}
  >${innerText}</wc-button
>`;

ButtonDefault.args = {
  innerText: 'Button Label',
  type: 'button',
  variant: 'primary',
  disabled: false,
  ariaLabelledBy: undefined,
  id: '7',
};
