
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, initializeFirestore, persistentLocalCache } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHEgghO0D11XDLhg_trJlbOncZO7P9HfA",
  authDomain: "cast-app-7ddf6.firebaseapp.com",
  projectId: "cast-app-7ddf6",
  storageBucket: "cast-app-7ddf6.firebasestorage.app",
  messagingSenderId: "461458023553",
  appId: "1:461458023553:web:50b4eadc30605fb06ed980"
};

const app = initializeApp(firebaseConfig);

// ✅ Firestore 永続キャッシュ有効化
export const db = initializeFirestore(app, { localCache: persistentLocalCache() });
export const auth = getAuth(app);

