export const buildUrl = (path) => {
 return import.meta.env.DEV
  ? `http://localhost:4242/api${path}`
  : `/api${path}`;
};