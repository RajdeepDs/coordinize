# Editor Component Architecture

This directory contains a rich text editor implementation built with [TipTap](https://tiptap.dev/) and [Novel](https://novel.sh/).

## Folder Structure

```
editor/
├── components/           # UI components for the editor
│   ├── bubble-menu/     # Components for the floating bubble menu
│   │   ├── link-selector.tsx
│   │   ├── node-selector.tsx
│   │   └── text-buttons.tsx
│   └── slash-commands/  # Slash command components
├── extensions/          # TipTap extensions configuration
├── utils/               # Helper utilities
├── editor.tsx           # Main editor component
└── README.md            # Documentation
```

## Best Practices

### Component Organization

- **Separation of Concerns**: Each component has a single responsibility
- **Modular Design**: Extensions, commands, and UI components are separated
- **Consistent Naming**: All files follow the same naming convention

### Performance Considerations

- Use memoization for expensive operations
- Lazy load extensions when possible
- Avoid unnecessary re-renders by using React.memo for pure components

### Accessibility

- Ensure proper ARIA attributes are used
- Support keyboard navigation
- Maintain good color contrast

### Customization

- Extensions are configured in a central location
- Styling uses utility classes for easy theming
- Component props allow for flexible configuration

## Usage

```tsx
import { Editor } from '@/components/editor';

function MyComponent() {
  return (
    <Editor 
      initialContent={content}
      readOnly={false}
      placeholder="Start typing..."
    />
  );
}
```

## Extension Development

When adding new extensions:

1. Add the extension to the `extensions.ts` file
2. Configure any necessary styling
3. Update the bubble menu if needed
4. Add slash commands if applicable