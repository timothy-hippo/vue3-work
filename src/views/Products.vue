<template>
  <Loading :active='isLoading'></Loading>
  <div class="container">
    <div class="text-end mt-2">
      <div class="btn btn-primary" type='button' @click='openModal(true)'>新增產品</div>
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
      <tbody v-if="products.length==0">
        <tr>
          <td colspan="6" class="text-center">目前沒有建立產品</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="item in products" :key="item.id">
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
  <Pagination :pages='pagination' @get-page='getProducts'></Pagination>
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
      isLoading: false
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
        this.pagination = { ...res.data.pagination }
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
  }
}
</script>
