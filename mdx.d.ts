// types/mdx.d.ts
declare module '*.mdx' {
  // eslint-disable-next-line import/no-mutable-exports
  let MDXComponent: (props) => JSX.Element;
  export default MDXComponent;
}
