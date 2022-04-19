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

export const importCSS = (href) => {
  const properties = {
    href,
    type: "text/css",
    rel: "stylesheet",
    media: "screen,print"
  };
  const link = create( "link", { properties });

  document.getElementsByTagName( "head" )[0].appendChild( link );
}
