export const setStorage = ({ name, value }: { name: string; value: string }) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(name, value);
  }
  return null;
};

export const getStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(name);
  }
  return null;
};

export const removeStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.removeItem(name);
  }
  return null;
};
