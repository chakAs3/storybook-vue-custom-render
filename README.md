# Vue3 Render Functions in Storybook

This repository showcases different render functions for Vue 3 components in Storybook. Each render function demonstrates a different approach to rendering components using various syntaxes and APIs.

## Render Functions

### JSX Syntax

The story is rendered using the JSX syntax. The `Button` component is rendered with the provided arguments.

```javascript
export const JSXSyntax: Story = {
  args: {
    label: 'Rendered Using JSX Syntax',
    size: 'small',
  },
  render(args) {
    return <Button {...args} />;
  }
};
```

### h() Function

The story is rendered using the `h()` function. The `Button` component is rendered with the provided arguments.

```javascript
export const HRenderFunction: Story = {
  args: {
    label: 'Rendered Using h() function',
  },
  render(args) {
    return h(Button, args);
  },
};
```

### Composition API Component

The story is rendered using the Composition API Component that is returned by  the render function.  the Vue Component uses the Composition API `setup` and `template`.

```javascript
export const CompositionApiComponent: Story = {
  args: {
    label: 'Rendered using Composition Component',
  },
  render(args) {
    return {
      components: { Button },
      setup(props, { attrs }) {
        return { props, args, attrs };
      },
      template: `
        <div>
          Args: <pre>{{ JSON.stringify(args) }}</pre> 
          <Button v-bind="args" />
        </div>
      `,
    };
  },
};
```

### Options API Component

- Label: Rendered using Composition Component

The component is rendered using the Options API. The `Button` component is rendered with the provided arguments, using the Options API props and data properties.

```javascript
export const OptionsApiComponent: Story = {
  args: {
    label: 'Rendered using Composition Component',
  },
  render(args, { argTypes }) {
    return {
      props: Object.keys(argTypes),
      data: () => ({ args }),
      components: { Button },
      template: `
        <div>
          Args: <pre>{{ JSON.stringify(args) }}</pre>
          <Button v-bind="args" />
        </div>
      `,
    };
  },
};
```

## Getting Started

1. Clone this repository: `git clone https://github.com/chakAs3/vue3-storybook-custom-render.git`
2. Install dependencies: `cd vue3-jsx & pnpm install`
3. Run Storybook: `pnpm run storybook`
4. Open your browser and visit `http://localhost:6006` to view the Storybook.

## License

This repository is licensed under the [MIT License](LICENSE). Feel free to use the code and modify it according to your needs.
