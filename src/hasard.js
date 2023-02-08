// fonction permettant de choisir au hasard un item dans un array
export function hasard(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
