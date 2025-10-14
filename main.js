// ------------------------------
// CASTアプリ メインロジック
// ------------------------------

const userNameEl = document.getElementById("userName");
const scheduleList = document.getElementById("scheduleList");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const forgetContainer = document.getElementById("forgetContainer");
const forgetList = document.getElementById("forgetList");
const forgetCloseBtn = document.getElementById("forgetCloseBtn");
const alarmSound = document.getElementById("alarmSound");
const forgetSound = document.getElementById("forgetSound");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const switchViewBtn = document.getElementById("switchViewBtn");

// 忘れ物リスト（固定）
const forgetItems = [
  "免許証", "財布", "水筒",
  "ハンカチ", "スタンプブック", "エコバック",
  "リップ", "歯ブラシ", "お風呂セット"
];

// ログインユーザー情報取得
const currentUser = localStorage.getItem("loggedInUser") || "ゲスト";
userNameEl.textContent = `${currentUser} さん`;

// localStorageから予定を読み込み
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

// ------------------------------
// 予定表示関数
// ------------------------------
function renderSchedules() {
  scheduleList.innerHTML = "";

  const now = new Date();

  schedules.forEach((s, i) => {
    const card = document.createElement("div");
    card.classList.add("schedule-card");
    card.classList.add(s.user === currentUser ? "card-self" : "card-others");

    // 時刻点滅
    const startTime = new Date(s.start);
    const diffMin = (startTime - now) / 60000;

    if (diffMin <= 0 && diffMin > -((s.end ? (new Date(s.end) - startTime) / 60000 : 0))) {
      card.classList.add("blink-blue"); // 現在進行中
    } else if (diffMin <= 40 && diffMin > 0) {
      card.classList.add("blink-orange"); // 開始40分前
    }

    card.innerHTML = `
      <div class="schedule-title">${s.title}</div>
      <div class="schedule-time">${formatTime(s.start)}〜${formatTime(s.end)}</div>
    `;

    // 詳細クリック
    card.addEventListener("click", () => {
      alert(`【予定詳細】\n\nタイトル：${s.title}\n時間：${formatTime(s.start)}〜${formatTime(s.end)}\nメモ：${s.memo || "（なし）"}`);
    });

    // 2回タップで削除確認
    let tapTimeout;
    card.addEventListener("click", () => {
      if (tapTimeout) {
        clearTimeout(tapTimeout);
        if (confirm("この予定を終わらせますか？")) {
          schedules.splice(i, 1);
          saveSchedules();
          renderSchedules();
        }
      } else {
        tapTimeout = setTimeout(() => (tapTimeout = null), 300);
      }
    });

    scheduleList.appendChild(card);
  });
}

// ------------------------------
// 予定追加ダイアログ
// ------------------------------
addScheduleBtn.addEventListener("click", () => {
  const title = prompt("予定タイトルを入力してください：");
  if (!title) return;

  const start = prompt("開始時刻（例: 2025-10-14T09:00）：");
  const end = prompt("終了時刻（例: 2025-10-14T17:30）：");
  const memo = prompt("メモ（任意）：");

  const alarmYN = confirm("アラームをセットしますか？");
  let alarmMin = 0;
  if (alarmYN) {
    alarmMin = parseInt(prompt("予定開始の何分前にアラームを鳴らしますか？"), 10) || 0;
  }

  const forgetYN = confirm("忘れ物リストを表示しますか？");

  const newSchedule = {
    title,
    start,
    end,
    memo,
    user: currentUser,
    alarm: alarmYN,
    alarmMin,
    forget: forgetYN
  };

  schedules.push(newSchedule);
  saveSchedules();
  renderSchedules();
  setupAlarms();
});

// ------------------------------
// アラーム＆忘れ物リスト設定
// ------------------------------
function setupAlarms() {
  const now = new Date();

  schedules.forEach((s) => {
    const startTime = new Date(s.start);

    if (s.alarm) {
      const alarmTime = new Date(startTime - s.alarmMin * 60000);
      const diff = alarmTime - now;
      if (diff > 0) {
        setTimeout(() => {
          alarmSound.play();
          alert(`🔔「${s.title}」の時間が近づいています`);
        }, diff);
      }
    }

    if (s.forget) {
      const forgetTime = new Date(startTime - 10 * 60000);
      const diff = forgetTime - now;
      if (diff > 0) {
        setTimeout(() => {
          forgetSound.play();
          showForgetList();
        }, diff);
      }
    }
  });
}

// ------------------------------
// 忘れ物リスト表示
// ------------------------------
function showForgetList() {
  forgetList.innerHTML = "";
  forgetItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "forget-item";
    div.textContent = item;
    forgetList.appendChild(div);
  });
  forgetContainer.classList.add("active");
}

forgetCloseBtn.addEventListener("click", () => {
  forgetContainer.classList.remove("active");
});

// ------------------------------
// データ保存
// ------------------------------
function saveSchedules() {
  localStorage.setItem("schedules", JSON.stringify(schedules));
}

// ------------------------------
// 日時フォーマット
// ------------------------------
function formatTime(dateStr) {
  const d = new Date(dateStr);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// ------------------------------
// フルスクリーン切り替え
// ------------------------------
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// ------------------------------
// 共有カレンダー切替（仮表示）
// ------------------------------
switchViewBtn.addEventListener("click", () => {
  alert("共有カレンダー表示（開発中）");
});

// ------------------------------
// 初期化
// ------------------------------
renderSchedules();
setupAlarms();
