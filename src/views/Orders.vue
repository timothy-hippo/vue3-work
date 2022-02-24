<template>
  <Loading :active='isLoading'></Loading>
  <div class="container">
    <table class="table mt-4 table-striped table-hover">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th>訂單編號</th>
          <th>購買項目</th>
          <th width="120">應付金額</th>
          <th width="150">是否付款</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody v-if="orders.length == 0">
        <tr>
          <td colspan="6" class="text-center">目前沒有訂單</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.id }}</td>
          <td class="">
            <template v-for="(productsItem,key) in item.products" :key="key">
              <span>{{productsItem.product.title}}</span>
              <span>{{productsItem.qty}}</span>
              <span>{{productsItem.product.unit}}</span>
              <br>
            </template>
          </td>
          <td class="text-end">
            {{ $filters.currency(item.total) }}
          </td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="item.is_paid"  @click.prevent="openIsPayModal(item)">
              <label class="form-check-label" :class="{'text-success':item.is_paid, 'text-danger':!item.is_paid}" for="flexSwitchCheckDefault">{{item.is_paid?'已付款':'未付款'}}</label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(item)">細節</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <OrderModal ref="orderModal" :order='tempOrder'></OrderModal>
  <IsPayModal ref="isPayModal" :item='isPayOrder' @update-isPaid='updateOrder'></IsPayModal>
  <DelModal ref="delModal" :item='delOrder' @del-item='deleteOrder'></DelModal>
</template>

<script>
import OrderModal from '@/components/OrderModal'
import IsPayModal from '@/components/IsPayModal'
import DelModal from '@/components/DelModal'
export default {
  components: {
    OrderModal,
    IsPayModal,
    DelModal
  },
  data () {
    return {
      orders: [],
      tempOrder: {},
      isPayOrder: {},
      delOrder: {},
      isLoading: false
    }
  },
  created () {
    this.getOrders()
  },
  methods: {
    getOrders () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders`
      this.axios.get(api).then((res) => {
        // console.log(res.data)
        if (res.data.success) {
          this.orders = [...res.data.orders]
        }
        this.isLoading = false
      })
    },
    openModal (order) {
      this.tempOrder = { ...order }
      this.$refs.orderModal.showModal()
    },
    openIsPayModal (item) {
      // console.log(item.is_paid)
      this.isPayOrder = { ...item }
      this.$refs.isPayModal.showModal()
    },
    updateOrder (item) {
      const newOrder = { ...item }
      newOrder.is_paid = !newOrder.is_paid
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      this.axios.put(api, { data: newOrder }).then((res) => {
        // console.log(res.data)
        this.getOrders()
        this.$pushMessageState(res.data)
        this.$refs.isPayModal.hideModal()
      })
    },
    openDelModal (item) {
      // console.log(item)
      this.delOrder = { ...item, type: 'order' }
      // console.log(this.delOrder)
      this.$refs.delModal.showModal()
    },
    deleteOrder (id) {
      // console.log(id)
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${id}`
      this.axios.delete(api).then((res) => {
        // console.log(res.data)
        this.getOrders()
        this.$pushMessageState(res.data)
        this.$refs.delModal.hideModal()
      })
    }
  }
}
</script>
