const hasRole = (obj, args) => {
  if (obj && args.includes(obj.role)) {
    return true
  }
}

export default hasRole
