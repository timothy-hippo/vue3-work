<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="exampleModalLabel">
            刪除<span v-if="item.type === 'order'">訂單</span>
            <span v-else-if="item.type === 'coupon'">優惠券</span>
            <span v-else-if="item.type === 'product'">產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          確定將 <span v-if="item.type === 'order'">訂單{{item.id}}</span>
            <span v-else-if="item.type === 'coupon'">優惠券-{{item.title}}</span>
            <span v-else-if="item.type === 'product'">產品-{{item.title}}</span> 刪除?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="$emit('del-item', item.id)"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixins'
export default {
  data () {
    return {
      modal: ''
    }
  },
  props: {
    item: Object
  },
  mixins: [modalMixin]
}
</script>
