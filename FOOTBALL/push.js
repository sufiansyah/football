var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKz0AaPc3ttOL_goqayBIlDQVNPQN1-Z3CAuwNyLNpdoOIb1-c-_d5ADEYVQ7vvDGtkqS7-McuqnWnc6YHtE5pc",
   "privateKey": "6GqEyyMk38GC2z016QtMcUcA886CyThXzUslDy_nsYs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fjCdABgRgPw:APA91bEP8rvGkmBKk3FbsVk-SysyIKtlWzVJTnDIgIddhBnvj6u_jBlX5dzcGLw6Jo-xkALqy2_buu6cRCRZFRUHTrcjnjCeZfXpg3FThC0VY2cPLRC1GixPYhBUbgfcCeVQdzl5ZxkR",
   "keys": {
       "p256dh": "BCMNVAoOUfPMZG5VMxZrSBKwNVfzDbnbDwKU0jJI0S9i9iW05zG9+EEYruFjevNducbEx5h7ZK2k8IWDY5mt6ik=",
       "auth": "wD5/SWQIIPrSIyGz9KwuxA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '467233180487',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);