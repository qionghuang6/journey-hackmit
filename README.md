# Next.js example

## How to use

Clone this repo

Add backend url to .env
`cd` into the repo
Paste `NEXT_PUBLIC_API_URL=http://localhost:3001` into `.env`

```sh
yarn
yarn dev
```
## The idea behind the example

The project uses [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5.
If you prefer, you can [use styled-components instead](https://mui.com/material-ui/guides/interoperability/#styled-components).

## The link component

The [example folder](https://github.com/mui/material-ui/tree/HEAD/examples/nextjs-with-typescript) provides an adapter for the use of [Next.js's Link component](https://nextjs.org/docs/api-reference/next/link) with MUI.
More information [in the documentation](https://mui.com/material-ui/guides/routing/#next-js).
