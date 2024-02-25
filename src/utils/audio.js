export function setNodeValues(node, valuesMap) {
  for (let key in valuesMap) {
    node[key].value = valuesMap[key];
  }
}
