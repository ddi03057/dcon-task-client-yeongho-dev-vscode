
export function validParams (obj, value) {
  if (value.constructor === Boolean) {
    return true
  }

  if (obj.constructor === Array) {
    return obj.indexOf(value) !== -1
  }

  if (obj.constructor === Object) {
    return value in obj
  }
}
