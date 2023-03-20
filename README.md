## Folder Structure

- `api` - for fetching data from website api backend

- `src/layouts` - Layout components to wrap pages. The layout components must always have `html`, `head`, `body`, `slot`

- `src/pages` - Pages for static and dynamic routes. Every file here will be accessible via routes, so use only lowercase characters and hyphen as separator

- `src/views` - Page specific components. If we have `/home`, `/about`, `/contact`, `/blog` and `/blog/[slug]` routes, then each route has a corresponding folder in `src/views` folder. And if a component is specific to home page, it could be placed in some nested folder inside `src/views/Home/`.

- `src/components` - Common/Shared components which can be used across multiple pages, like header and footer. These components should not be specific to any page/view

- `src/styles` - CSS related files

- `public/*` - Static files
