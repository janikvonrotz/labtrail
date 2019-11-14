const hasRole = (obj, args) => {
  if (obj && args.includes(obj.role)) {
    return true
  }
}

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})

export { hasRole, groupBy }
