// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// ★ あなたのFirebaseプロジェクト情報を貼り付けてください
const firebaseConfig = {
  apiKey: "（あなたのAPIキー）",
  authDomain: "（あなたのauthDomain）",
  projectId: "（あなたのprojectId）",
  storageBucket: "（あなたのstorageBucket）",
  messagingSenderId: "（あなたのmessagingSenderId）",
  appId: "（あなたのappId）"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
