<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <Breadcrumb :productName="product.title"></Breadcrumb>
    <div class="row">
      <article class="col-md-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" style="width: 100%" alt="" class="mb-3" />
      </article>
      <div class="col-md-4">
        <div class="h5">
          <span
            class="text-danger"
            :class="{
              'text-decoration-line-through': product.price !== product.origin_price,
              'text-muted': product.price !== product.origin_price,
            }"
            >{{ `$${product.price}` }}</span
          >&nbsp;
          <span class="text-danger" v-if="product.price !== product.origin_price">{{
            `$${product.origin_price}`
          }}</span>
        </div>
        <hr>
        <label for="exampleFormControlInput1" class="form-label">數量</label>
        <input type="number" class="form-control" id="exampleFormControlInput1" v-model.number="qty">
        <div class="d-grid mt-3">
          <button
            type="button"
            class="btn btn-outline-danger btn-block"
            @click="addCart(product.id,qty)"
          >
            <div class="spinner-border text-warning spinner-border-sm" role="status" v-if="status.loadingItem">
              <span class="visually-hidden">Loading...</span>
            </div>
            加到購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  components: {
    Breadcrumb
  },
  inject: ['emitter'],
  data () {
    return {
      isLoading: false,
      product: {},
      qty: 0,
      status: {
        loadingItem: false
      }
    }
  },
  created () {
    const id = this.$route.params.productId
    this.isLoading = true
    const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
    this.axios.get(api).then((res) => {
      // console.log(res.data)
      if (res.data.success) {
        this.product = { ...res.data.product }
      }
      this.isLoading = false
    })
  },
  methods: {
    addCart (id, qty) {
      // console.log(id)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cartData = {
        product_id: id,
        qty: qty
      }
      this.status.loadingItem = true
      this.axios.post(api, { data: cartData }).then((res) => {
        // console.log(res.data)
        this.status.loadingItem = false
        this.qty = 0
        this.$pushMessageState(res.data)
      })
    }
  }
}
</script>
