import emitter from '@/methods/emitter'

export default function (res, title = '更新') {
  if (res.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`
    })
  } else {
    const message = typeof res.message === 'string' ? [res.message] : res.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、')
    })
  }
}
