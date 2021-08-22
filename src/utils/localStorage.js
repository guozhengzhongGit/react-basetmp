function stringify(value) {
  return JSON.stringify(value);
}

function parse(value) {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error('JSON Parse 调用失败');
    return null;
  }
}

const LocalStorage = {
  setValue(key, data) {
    localStorage.setItem(key, stringify(data));
    return this;
  },
  getValue(key) {
    const value = localStorage.getItem(key);

    if (!value) return null;
    return parse(value);
  },
  removeValue(key) {
    localStorage.removeItem(key);
    return this;
  },
};

export default LocalStorage;
