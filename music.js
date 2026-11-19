/* Nhạc nền cho các trang trái tim.
   Cách dùng: đặt file nhạc cùng thư mục với tên nhac.mp3 (hoặc điền mã video YouTube vào CONFIG.youtube).
   Nếu chưa có nhạc, nút bật nhạc sẽ tự ẩn và trang vẫn chạy bình thường. */
(() => {
  if (window.self !== window.top) return;           // không phát trong khung xem trước

  const CONFIG = {
    mp3: 'nhac.mp3',      // đường dẫn file nhạc
    youtube: 'GSIkPUP1PoE', // hoặc mã video YouTube, ví dụ 'dQw4w9WgXcQ' (để trống nếu dùng mp3)
    volume: 0.7
  };

  // ---- Nút bật/tắt nhạc ----
  const css = document.createElement('style');
  css.textContent = `
    #nhac-btn{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));
      z-index:9999;display:none;align-items:center;gap:8px;padding:10px 16px;border:1px solid rgba(255,150,190,.55);
      border-radius:999px;background:rgba(40,8,26,.62);color:#ffe3ec;font:600 14px "Segoe UI",Arial,sans-serif;
      cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);box-shadow:0 0 18px rgba(255,45,107,.35)}
    #nhac-btn.show{display:flex}
    #nhac-btn:focus-visible{outline:2px solid #ff9ebc;outline-offset:2px}
    #nhac-btn.wait{animation:nhacPulse 1.6s ease-in-out infinite}
    #nhac-btn .ic{display:inline-block;font-size:16px}
    #nhac-btn.on .ic{animation:nhacSpin 3s linear infinite}
    @keyframes nhacPulse{0%,100%{box-shadow:0 0 12px rgba(255,45,107,.3)}50%{box-shadow:0 0 28px rgba(255,45,107,.85)}}
    @keyframes nhacSpin{to{transform:rotate(360deg)}}
    @media (prefers-reduced-motion:reduce){#nhac-btn.wait,#nhac-btn.on .ic{animation:none}}
  `;
  document.head.appendChild(css);

  const btn = document.createElement('button');
  btn.id = 'nhac-btn';
  btn.type = 'button';
  btn.innerHTML = '<span class="ic">♪</span><span class="tx">Bật nhạc</span>';
  document.body.appendChild(btn);
  const tx = btn.querySelector('.tx');

  let player = null;          // { play(), pause() }
  let isOn = false;           // đang phát
  let userPaused = false;     // người xem chủ động tắt
  let started = false;        // đã từng phát

  function paint() {
    btn.classList.toggle('on', isOn);
    btn.classList.toggle('wait', !isOn && !started);
    tx.textContent = isOn ? 'Tắt nhạc' : (started ? 'Bật nhạc' : 'Chạm để bật nhạc');
    btn.setAttribute('aria-pressed', String(isOn));
  }

  function setOn(v) {
    isOn = v;
    if (v) started = true;
    paint();
  }

  function ready(p, tryAuto = true) {
    player = p;
    btn.classList.add('show');
    paint();
    // thử phát ngay; trình duyệt thường chặn đến khi người xem chạm vào trang
    if (tryAuto) p.play().then(() => setOn(true), () => {});
  }

  // ---- Nguồn nhạc: mp3 ----
  function useMp3() {
    const a = new Audio();
    a.loop = true;
    a.volume = CONFIG.volume;
    a.preload = 'auto';
    a.addEventListener('error', () => btn.remove(), { once: true });   // chưa có file nhạc thì ẩn nút
    a.addEventListener('canplay', () => {
      if (!player) ready({
        play: () => a.play().then(() => setOn(true)),
        pause: () => { a.pause(); setOn(false); }
      });
    }, { once: true });
    a.src = CONFIG.mp3;
    a.load();
  }

  // ---- Nguồn nhạc: YouTube ----
  function useYouTube() {
    const holder = document.createElement('div');
    holder.style.cssText = 'position:fixed;width:2px;height:2px;left:-10px;top:-10px;opacity:0;pointer-events:none';
    holder.innerHTML = '<div id="nhac-yt"></div>';
    document.body.appendChild(holder);
    window.onYouTubeIframeAPIReady = () => {
      const yt = new YT.Player('nhac-yt', {
        width: 2, height: 2, videoId: CONFIG.youtube,
        playerVars: { loop: 1, playlist: CONFIG.youtube, playsinline: 1 },
        events: {
          onReady: () => {
            yt.setVolume(Math.round(CONFIG.volume * 100));
            // YouTube không cho tự phát: đợi người xem chạm, trạng thái nút theo onStateChange
            ready({
              play: () => { yt.playVideo(); return Promise.resolve(); },
              pause: () => { yt.pauseVideo(); }
            }, false);
          },
          onStateChange: e => {
            if (e.data === 1) setOn(true);                       // đang phát
            else if (e.data === 2 || e.data === 0) setOn(false); // tạm dừng / hết bài
          },
          onError: () => btn.remove()
        }
      });
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (!player) return;
    if (isOn) { userPaused = true; player.pause(); }
    else { userPaused = false; player.play(); }
  });

  // Lần chạm đầu tiên vào trang sẽ bật nhạc (trình duyệt không cho tự phát khi chưa chạm)
  document.addEventListener('pointerdown', e => {
    if (e.target.closest && e.target.closest('#nhac-btn')) return;
    if (player && !isOn && !userPaused && !started) player.play().catch(() => {});
  }, true);

  CONFIG.youtube ? useYouTube() : useMp3();
})();
