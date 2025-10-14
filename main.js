// ===== CAST風スケジュールアプリ JS =====

// アカウント情報
const users = {
  "2406": { ps: "0625", name: "まさき" },
  "2409": { ps: "0926", name: "みさと" },
  "0000": { ps: "0000", name: "ゲスト" }
};

// ログイン処理
function login() {
  const id = document.getElementById("userId").value.trim();
  const ps = document.getElementById("userPs").value.trim();
  const error = document.getElementById("error-message");

  if (users[id] && users[id].ps === ps) {
    localStorage.setItem("currentUser", users[id].name);
    window.location.href = "main.html";
  } else {
    error.textContent = "IDまたはパスワードが間違っています。";
  }
}

// メイン画面読み込み時
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("currentUser");
  if (!user) return;

  const header = document.getElementById("header-user");
  if (header) header.textContent = `CASTスケジュール（${user}）`;

  // ログイン時にアラーム再生
  const audio = new Audio("JR-Nishi.mp3");
  audio.play().catch(() => console.log("自動再生はユーザー操作が必要です"));

  renderSchedules(user);
});

// ダミー予定データ
const schedules = [
  { user: "まさき", title: "311コース", start: "09:00", end: "17:30" },
  { user: "みさと", title: "外勤", start: "10:00", end: "15:00" },
  { user: "ゲスト", title: "休み", start: "", end: "" }
];

// 予定表示
function renderSchedules(user) {
  const list = document.getElementById("schedule-list");
  if (!list) return;
  list.innerHTML = "";

  schedules.forEach(s => {
    const card = document.createElement("div");
    card.className = `schedule-card ${s.user === user ? "my-schedule" : "other-schedule"}`;
    card.innerHTML = `
      <h3>${s.title === "311コース" ? "CAST" : s.title}</h3>
      <p>${s.start ? `${s.start}〜${s.end}` : ""}</p>
      <p>担当：${s.user}</p>
    `;
    list.appendChild(card);
  });
}
