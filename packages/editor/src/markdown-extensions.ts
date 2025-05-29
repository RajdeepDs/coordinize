import * as E from "./extensions";

export interface GetMarkdownExtensionsOptions {
  placeholder?: string;
}

export function getMarkdownExtensions(options?: GetMarkdownExtensionsOptions) {
  const placeholderExtension = options?.placeholder
    ? E.placeholder.configure({ placeholder: options.placeholder })
    : E.placeholder;
  return [E.starterKit, placeholderExtension];
}
