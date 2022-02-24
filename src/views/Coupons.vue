<template>
  <Loading :active='isLoading'></Loading>
  <div class="container">
    <div class="text-end mt-2">
      <div class="btn btn-secondary" type='button' @click='openModal(true)'>新增優惠券</div>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th width="160">折扣碼</th>
          <th width="160">折扣百分比</th>
          <th width="120">數量</th>
          <th width="180">到期日</th>
          <th width="180">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody v-if="coupons.length == 0">
        <tr>
          <td colspan="6" class="text-center">目前沒有建立優惠券</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.num }}</td>
          <td>
            {{ $filters.date(item.due_date) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click='openModal(false,item)'>編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click='openDelModal(item)'>刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages='pagination' @get-page='getCoupon'></Pagination>
  <CouponModal ref='couponModal' :coupon='tempCoupon' @update-coupon='updateCoupon'></CouponModal>
  <DelModal ref='delModal' :item='delCoupon' @del-item='deleteCoupon'></DelModal>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
export default {
  components: {
    Pagination,
    CouponModal,
    DelModal
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      delCoupon: {},
      isLoading: false,
      pagination: {},
      isNew: false
    }
  },
  inject: ['emitter'],
  created () {
    this.getCoupon()
  },
  methods: {
    // 取得優惠券列表
    getCoupon (page) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.axios.get(api).then((res) => {
        this.coupons = [...res.data.coupons]
        this.pagination = { ...res.data.pagination }
        this.isLoading = false
      })
    },
    // 開啟新增/編輯優惠券
    openModal (isNew, item) {
      isNew ? this.tempCoupon = {} : this.tempCoupon = { ...item }
      this.isNew = isNew
      this.$refs.couponModal.showModal()
    },
    // 開啟刪除優惠券
    openDelModal (item) {
      this.delCoupon = { ...item, type: 'coupon' }
      this.$refs.delModal.showModal()
    },
    // 新增/更新優惠券
    updateCoupon (item) {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      this.axios[httpMethod](api, { data: item }).then((res) => {
        // console.log(res.data)
        this.getCoupon()
        this.$pushMessageState(res.data)
        this.$refs.couponModal.hideModal()
      })
    },
    // 刪除優惠券
    deleteCoupon (id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`
      this.axios.delete(api).then((res) => {
        // console.log(res.data)
        this.getCoupon()
        this.$pushMessageState(res.data)
        this.$refs.delModal.hideModal()
      })
    }
  }
}
</script>
