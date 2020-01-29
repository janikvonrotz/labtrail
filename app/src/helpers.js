const hasRole = (obj, args) => {
  if (obj && args.includes(obj.role)) {
    return true
  }
}

const compareValues = (key, order = 'ASC') => {
  const keys = key.split('.')

  return (a, b) => {
    let i = 0

    // Access nested property
    while (i < keys.length) {
      a = a[keys[i]]
      b = b[keys[i]]
      i++
    }

    const varA = (typeof a === 'string') ? a.toUpperCase() : a
    const varB = (typeof b === 'string') ? b.toUpperCase() : b

    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return (
      (order === 'DESC') ? (comparison * -1) : comparison
    )
  }
}

export { hasRole, compareValues }
