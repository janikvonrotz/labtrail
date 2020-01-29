const hasRole = (obj, args) => {
  if (obj && args.includes(obj.role)) {
    return true
  }
}

const compareValues = (key, order = 'asc') => {
  return (a, b) => {
    if (!a[key] || !b[key]) {
      // property doesn't exist on either object
      return 0
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key]
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    )
  }
}

export { hasRole, compareValues }
