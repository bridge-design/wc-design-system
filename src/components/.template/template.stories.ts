import { Story } from '@storybook/web-components';
import { html } from 'lit-html';
import type { ClassName } from './fileName';
import './fileName';

export default {
  title: 'Components/Template',
  component: 'element-name',
};

const Template: Story<ClassName> = () => {
  return html` <element-name></element-name>`;
};

export const Basic = Template.bind({});
