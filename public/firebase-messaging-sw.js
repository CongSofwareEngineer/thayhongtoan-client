importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

const firebaseConfig = JSON.parse(new URL(location).searchParams.get('firebaseConfig'))

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  if (payload?.data?.title) {
    const notificationTitle = payload?.data?.title
    const notificationOptions = {
      body: payload?.data?.body || null,
      icon: 'https://skywalker.infura-ipfs.io/ipfs/QmTZBqX5FbMPQEC6AaTmhaqDSPv3gpp5hb3XzZN7piA534',
      image: 'https://skywalker.infura-ipfs.io/ipfs/QmTZBqX5FbMPQEC6AaTmhaqDSPv3gpp5hb3XzZN7piA534',
      actions: [
        {
          action: 'action',
          title: payload.data?.titleConfirm || 'Kiểm tra',
        },
      ],
      data: payload?.data, // Pass any additional data
    }
    self.registration.showNotification(notificationTitle, notificationOptions)
    self.addEventListener('notificationclick', (event) => {
      event.notification.close()
      event.waitUntil(
        clients
          .matchAll({
            type: 'window'
          })
          .then((clientList) => {
            for (const client of clientList) {
              if (client.url === '/' && 'focus' in client) return client.focus()
            }
            if (clients.openWindow) {
              return clients.openWindow(payload.data?.link_confirm || '/')
            }
          })
      )
    })

  }
})
