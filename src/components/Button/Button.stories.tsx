import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";

export default {
    title: "UILibrary/Button",
    component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({})
Default.args = {
    label: 'Default',
    description: 'Button description',
    action: () => console.log('Clicked!')
}

export const WithEmptyLabel = Template.bind({})
WithEmptyLabel.args = {
    label: ' ',
    description: 'Button description'
}

export const WithEmptyDescription = Template.bind({})
WithEmptyDescription.args = {
    label: 'Click me',
    description: ' '
}

export const DivButton = Template.bind({})
DivButton.args = {
    label: 'Div as a button',
    description: '<div> with role=button',
    tag: 'div'
}

export const AnchorButton = Template.bind({})
AnchorButton.args = {
    label: 'Anchor as a button',
    description: '<a> with role=button',
    tag: 'a',
}