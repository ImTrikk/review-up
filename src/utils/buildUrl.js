export const buildUrl = (path) => {
 return import.meta.env.DEV
  ? `http://localhost:4242/api${path}`
  : `/api${path}`;
};

// export const buildUrl = (path) => {
//  if (typeof import.meta.env === "undefined" || import.meta.env.DEV) {
//   // In development or if import.meta.env is undefined, use the development URL.
//   return `http://localhost:4242/api${path}`;
//  } else {
//   // In production or other environments, use the production URL.
//   return `/api${path}`;
//  }
// };