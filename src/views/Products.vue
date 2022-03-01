<template>
  <Loading :active='isLoading'></Loading>
  <div class="container">
    <div class="text-end d-md-none mb-3">
      <button class="btn btn-primary" type='button' @click='openModal(true)'>新增產品</button>
    </div>
    <div class="row justify-content-between">
      <div class="col-md-4">
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
      <div class="col-md-2 text-end d-none d-md-block">
        <button class="btn btn-primary" type='button' @click='openModal(true)'>新增產品</button>
      </div>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody v-if="filterProducts.length==0">
        <tr>
          <td colspan="6" class="text-center">目前沒有建立產品</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="item in filterProducts" :key="item.id">
          <td>{{ item.category}}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-end">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination v-if="!isSearch" :pages='pagination' @get-page='getProducts'></Pagination>
  <ProductModal ref='productModal' :product='tempProduct' @update-product='updateProduct'></ProductModal>
  <DelModal ref='delModal' :item='delProduct' @del-item='deleteProduct'></DelModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import DelModal from '@/components/DelModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    ProductModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      delProduct: {},
      isNew: false,
      isLoading: false,
      searchProduct: '',
      filterProducts: [],
      isSearch: false
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    openDelModal (item) {
      // console.log(item)
      this.delProduct = { ...item, type: 'product' }
      this.$refs.delModal.showModal()
    },
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`
      this.axios.get(api).then((res) => {
        // console.log(res.data)
        this.products = [...res.data.products]
        this.filterProducts = this.products
        this.pagination = { ...res.data.pagination }
        this.isLoading = false
        this.isSearch = false
      })
    },
    getAllProducts (product) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`
      this.axios.get(api).then((res) => {
        // console.log(res.data)
        const newArr = []
        for (const a in res.data.products) {
          newArr.push(res.data.products[a])
        }
        this.isSearch = true
        this.filterProducts = newArr.filter(e => e.title.match(product))
        this.isLoading = false
      })
    },
    updateProduct (tempProduct) {
      this.tempProduct = tempProduct
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${tempProduct.id}`
        httpMethod = 'put'
      }
      this.axios[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.getProducts()
        this.$pushMessageState(res.data)
        this.$refs.productModal.hideModal()
      })
    },
    deleteProduct (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`
      this.axios.delete(api).then((res) => {
        this.getProducts()
        this.$pushMessageState(res.data)
        this.$refs.delModal.hideModal()
      })
    }
  },
  watch: {
    searchProduct () {
      if (this.searchProduct === '') {
        this.getProducts()
      } else {
        this.getAllProducts(this.searchProduct)
      }
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
</style>
