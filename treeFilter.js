function filterOrganization(array, text) {
  if (!text) return array
  const getNodes = (result, object) => {
    if (object.members) {
      for (const member of object.members) {
        const filterField = member.name + member.email
        if (filterField.toLowerCase().includes(text.toLowerCase())) {
          result.push(object)
          return result
        }
      }
    }
    if (Array.isArray(object.members)) {
      const nodes = object.members.reduce(getNodes, [])
      if (nodes.length) result.push({ ...object, nodes })
    }
    return result
  }
  return array.reduce(getNodes, [])
}
