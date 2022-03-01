<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <!-- 手機版 -->
    <div class="d-lg-none">
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1"
          ><i class="bi bi-search"></i
        ></span>
        <input
          type="text"
          v-model="searchProduct"
          class="form-control position-relative"
          placeholder="請輸入商品名稱"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <button
          type="button"
          class="
            btn btn-link
            text-decoration-none
            position-absolute
            product-search-clear
          "
          @click="searchProduct = ''"
        >
          <i class="bi bi-x text-dark"></i>
        </button>
      </div>
      <select
        class="form-select mt-3"
        v-model="category"
        @change="checkCategory(category)"
      >
        <option selected value="">所有商品</option>
        <option :value="item" v-for="item in categorys" :key="item">
          {{ item }}
        </option>
      </select>
      <div class="d-flex align-items-center mt-3">
        排序：
        <a
          href="#"
          class="text-decoration-none link-secondary"
          @click.prevent="sortProduct('up')"
          >價錢<i class="bi bi-sort-up"></i></a
        >&nbsp;|&nbsp;
        <a
          href="#"
          class="text-decoration-none link-secondary"
          @click.prevent="sortProduct('down')"
          >價錢<i class="bi bi-sort-down"></i
        ></a>
      </div>
    </div>
    <!-- 桌機版 -->
    <div class="row mt-3">
      <div class="col-lg-2">
        <ul class="list-group d-none d-lg-block">
          <li class="list-group-item" :class="{ active: category == '' }">
            <a
              class="text-decoration-none d-block"
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
              class="text-decoration-none d-block"
              :class="{ 'text-white': category == item }"
              href="#"
              @click="checkCategory(item)"
              >{{ item }}</a
            >
          </li>
        </ul>
      </div>
      <div class="col-lg-10">
        <div
          class="row mb-3 mt-3 mt-md-0 d-none d-lg-flex justify-content-between"
        >
          <div class="col-md-4 d-flex align-items-center">
            排序：
            <a
              href="#"
              class="text-decoration-none link-secondary"
              @click.prevent="sortProduct('up')"
              >價錢<i class="bi bi-sort-up"></i></a
            >&nbsp;|&nbsp;
            <a
              href="#"
              class="text-decoration-none link-secondary"
              @click.prevent="sortProduct('down')"
              >價錢<i class="bi bi-sort-down"></i
            ></a>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="input-group position-relative">
              <span class="input-group-text" id="basic-addon1"
                ><i class="bi bi-search"></i
              ></span>
              <input
                type="text"
                v-model="searchProduct"
                class="form-control product-search"
                placeholder="請輸入商品名稱"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <button
                type="button"
                class="
                  btn btn-link
                  text-decoration-none
                  position-absolute
                  product-search-clear
                "
                @click="searchProduct = ''"
              >
                <i class="bi bi-x text-dark"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col-md-6 col-lg-4 col-xl-3 mb-3"
            v-for="item in searchProducts"
            :key="item.id"
          >
            <div class="card h-100">
              <img :src="item.imageUrl" style="width: 100%" />
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>
                <div class="d-flex justify-content-between">
                  <p class="card-text">
                    <span
                      class="text-danger"
                      :class="{
                        'text-decoration-line-through':
                          item.price !== item.origin_price,
                        'text-muted': item.price !== item.origin_price,
                      }"
                      >{{ `$${item.price}` }}</span
                    >&nbsp;
                    <span
                      class="text-danger"
                      v-if="item.price !== item.origin_price"
                      >{{ `$${item.origin_price}` }}</span
                    >
                  </p>
                  <i class="bi bi-heart myheart" @click="addMyList(item.id)"></i>
                </div>
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
      searchProduct: '',
      sortType: '',
      myList: localStorage.getItem('myList') || []
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
      this.axios.get(api).then(res => {
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
        this.filterProducts = this.products.filter((e) => e.category === item)
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
      this.axios.post(api, { data: cartData }).then(res => {
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
    },
    sortProduct (type) {
      this.sortType = type
      switch (type) {
        case 'up':
          this.filterProducts = this.filterProducts.sort(
            (a, b) => a.price - b.price
          )
          break
        case 'down':
          this.filterProducts = this.filterProducts.sort(
            (a, b) => b.price - a.price
          )
          break
      }
    },
    addMyList (id) {
      // this.myList.push(id)
      const newMyList = JSON.parse(this.myList)
      console.log(newMyList)
    }
  },
  computed: {
    searchProducts () {
      return this.filterProducts.filter(e =>
        e.title.match(this.searchProduct)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.product-search-clear {
  right: 0;
  z-index: 10;
  &:hover {
    i {
      font-size: 1.1rem;
    }
  }
  &:focus {
    box-shadow: none;
  }
}
.myheart{
  color:rgb(236, 69, 69);
  &:hover{
    cursor:pointer
  }
}
</style>
