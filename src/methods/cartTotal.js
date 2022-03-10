import axios from 'axios'
export function getCart () {
  const carts = () => {
    return new Promise((resolve) => {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      axios.get(api).then((res) => {
        resolve(res.data.data.carts.length)
      })
    })
  }
  carts().then((value) => {
    console.log(value)
    return value
  })
}
