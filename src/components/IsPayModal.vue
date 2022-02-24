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
        <div class="modal-header bg-secondary">
          <h5 class="modal-title text-white" id="exampleModalLabel">付款狀態調整</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          確定將訂單編號 <span class="text-danger">{{item.id}}</span> 調整為 <span :class="{'text-success':!item.is_paid,'text-danger':item.is_paid,}">{{item.is_paid?'未付款':'已付款'}} </span> ?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-outline-dark"  @click="$emit('update-isPaid', item)">確定</button>
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
      modal: '',
      order: {}
    }
  },
  props: {
    item: Object
  },
  mixins: [modalMixin]
}
</script>
