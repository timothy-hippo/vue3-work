import axios from 'axios'
export function getCart () {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
  axios.get(api).then((res) => {
    return res.data.data.carts.length
  })
}
