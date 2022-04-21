const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const randomString = (length) => {
  return Array.from(Array(10).keys()).map(e => chars[Math.floor(Math.random() * chars.length)]).join('');
};
export const create = (tag, { properties, content } = {}) => {
  const element = document.createElement(tag);
  if (properties) Object.keys(properties).forEach(key => element[key] = properties[key]);
  if (content) element.innerHTML = content;
  return element;
};
export const getUrlParam = (name) => new URL(window.location.href).searchParams.get(name);
export const getUrlParams = (parameter) => {
  return new URL(window.location.href).searchParams.getAll(parameter).filter(e => !!e);
}
