export const buildUrl = (path) => {
 return import.meta.env.DEV
  ? `http://localhost:6000/api${path}`
  : `/api${path}`;
};
