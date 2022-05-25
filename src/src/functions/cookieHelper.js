const CookieHelper = {
  setCookie(name, value, day) {
    const date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  },
  getCookie(name) {
    const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  },
  deleteCookie(name) {
    const date = new Date();
    document.cookie = `${name}=; expires=${date.toUTCString()}; path=/`;
  },
};

export default CookieHelper;
