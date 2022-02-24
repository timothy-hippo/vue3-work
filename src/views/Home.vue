<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-2">
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: category == '' }"
          >
            <a
              class="text-decoration-none"
              :class="{ 'text-white': category == '' }"
              href="#"
              @click="checkCategory('')"
              >所有商品</a
            >
          </li>
          <li
            class="list-group-item"
            :class="{ active: category == item }"
            v-for="item in categorys"
            :key="item"
          >
            <a
              class="text-decoration-none"
              :class="{ 'text-white': category == item }"
              href="#"
              @click="checkCategory(item)"
              >{{ item }}</a
            >
          </li>
        </ul>
      </div>
      <div class="col-md-10">
        <div class="row justify-content-end mb-3 mt-3 mt-md-0">
          <div class="col-12 col-md-4">
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
              <input type="text" v-model="searchProduct" class="form-control" placeholder="請輸入商品名稱" aria-label="Username" aria-describedby="basic-addon1">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3" v-for="item in searchProducts" :key="item.id">
            <div class="card h-100">
              <img :src="item.imageUrl" style="width: 100%" />
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
                <p class="card-text">
                  <span
                    class="text-danger"
                    :class="{
                      'text-decoration-line-through':
                        item.price !== item.origin_price,
                      'text-muted':
                        item.price !== item.origin_price
                    }"
                    >{{ `$${item.price}` }}</span
                  >&nbsp;
                  <span
                    class="text-danger" v-if="item.price !== item.origin_price">{{
                    `$${item.origin_price}`
                  }}</span>
                </p>
                <div class="btn-group btn-group-sm d-flex">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="getProduct(item.id)"
                  >
                    查看更多
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    :disabled="status.loadingItem == item.id"
                    @click="addCart(item.id)"
                  >
                    <div
                      class="spinner-grow text-danger spinner-grow-sm"
                      role="status"
                      v-if="status.loadingItem == item.id"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    加到購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      products: [],
      status: {
        loadingItem: ''
      },
      categorys: [],
      category: '',
      filterProducts: [],
      searchProduct: ''
    }
  },
  inject: ['emitter'],
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.axios.get(api).then((res) => {
        // console.log(res.data)
        this.products = [...res.data.products]
        this.filterProducts = this.products
        this.products.forEach((item) => {
          this.getCategorys(item.category)
        })
        this.isLoading = false
      })
    },
    getCategorys (item) {
      const isRepeat = this.categorys.some(a => a === item)
      if (!isRepeat) {
        this.categorys.push(item)
      }
    },
    checkCategory (item) {
      this.category = item
      if (item === '') {
        this.filterProducts = this.products
      } else {
        this.filterProducts = this.products.filter(e => e.category === item)
      }
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      // console.log(id)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cartData = {
        product_id: id,
        qty: 1
      }
      this.status.loadingItem = id
      this.axios.post(api, { data: cartData }).then((res) => {
        // console.log(res.data)
        this.status.loadingItem = ''
        if (res.data.success) {
          this.emitter.emit('push-message', {
            style: 'success',
            title: res.data.message
          })
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: res.data.message
          })
        }
      })
    }
  },
  computed: {
    searchProducts () {
      return this.filterProducts.filter(e => e.title.match(this.searchProduct))
    }
  }
}
</script>
