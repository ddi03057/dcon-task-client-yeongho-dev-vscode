function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email)
}

function validatePassWord(password) {
  let regex =  /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{7,16}$/ ; // 대문자+소문자+숫자+특수문자 8~15글자

  return regex.test(password)
}

function strLength(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (escape(str.charAt(i)).length === 6) {
      len++;
    }
    len++;
  }
  return len;

}

function footerChangeLang(value) {
  window.postMessage({
    type: 'CHANGE_LOCALE',
    payload: {locale: value}
  }, location.href)
}
export { validateEmail }
export { validatePassWord }
export { strLength }
export { footerChangeLang }
