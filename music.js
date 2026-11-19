/* Nhạc nền cho các trang trái tim.
   Nguồn nhạc: mã video YouTube (CONFIG.youtube) hoặc file mp3 cùng thư mục (CONFIG.mp3).
   Trình duyệt không cho tự phát nhạc, nên trang hiện màn hình "Chạm để bắt đầu"; lần chạm đó bật nhạc.
   Nếu nhạc không tải được, màn hình mở đầu và nút nhạc tự ẩn, trang vẫn chạy bình thường. */
(() => {
  if (window.self !== window.top) return;           // không phát trong khung xem trước

  const CONFIG = {
    youtube: 'GSIkPUP1PoE',   // Cô Dâu - Ái Phương; để trống '' nếu dùng file mp3
    mp3: 'nhac.mp3',
    volume: 0.8
  };

  // ---- Giao diện: nút nhạc + màn hình mở đầu ----
  const css = document.createElement('style');
  css.textContent = `
    #nhac-btn{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));
      z-index:9999;display:none;align-items:center;gap:8px;padding:10px 16px;border:1px solid rgba(255,150,190,.55);
      border-radius:999px;background:rgba(40,8,26,.62);color:#ffe3ec;font:600 14px "Segoe UI",Arial,sans-serif;
      cursor:pointer;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);box-shadow:0 0 18px rgba(255,45,107,.35)}
    #nhac-btn.show{display:flex}
    #nhac-btn:focus-visible{outline:2px solid #ff9ebc;outline-offset:2px}
    #nhac-btn .ic{display:inline-block;font-size:16px}
    #nhac-btn.on .ic{animation:nhacSpin 3s linear infinite}
    #nhac-ov{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;flex-direction:column;
      gap:14px;text-align:center;padding:24px;cursor:pointer;color:#ffe3ec;font-family:"Segoe UI",Arial,sans-serif;
      background:radial-gradient(circle at 50% 45%,#3a0a24,#08020a);
      transition:opacity .6s ease}
    #nhac-ov.gone{opacity:0;pointer-events:none}
    #nhac-ov .h{font-size:min(22vmin,120px);line-height:1;color:#ff2d6b;text-shadow:0 0 30px rgba(255,45,107,.8);
      animation:nhacBeat 1.3s ease-in-out infinite}
    #nhac-ov .t{font-size:clamp(1.1rem,4.5vmin,1.6rem);font-weight:600}
    #nhac-ov .s{font-size:.9rem;color:#d89ab6;letter-spacing:.5px}
    #nhac-yt-box{position:fixed;left:-300px;top:0;width:200px;z-index:9998}
    #nhac-yt-box iframe{display:block;width:200px;height:200px;border:0;border-radius:12px;background:#000}
    #nhac-yt-box .cap{display:none;margin-bottom:6px;text-align:center;font:600 13px "Segoe UI",Arial,sans-serif;
      color:#ffe3ec;text-shadow:0 1px 6px #000}
    #nhac-yt-box.vis{left:auto;top:auto;right:max(16px,env(safe-area-inset-right,0px));
      bottom:calc(70px + env(safe-area-inset-bottom,0px));box-shadow:0 0 24px rgba(255,45,107,.5);border-radius:12px}
    #nhac-yt-box.vis .cap{display:block}
    @keyframes nhacSpin{to{transform:rotate(360deg)}}
    @keyframes nhacBeat{0%,100%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}42%{transform:scale(1.1)}70%{transform:scale(1)}}
    @media (prefers-reduced-motion:reduce){#nhac-btn.on .ic,#nhac-ov .h{animation:none}}
  `;
  document.head.appendChild(css);

  const btn = document.createElement('button');
  btn.id = 'nhac-btn';
  btn.type = 'button';
  btn.innerHTML = '<span class="ic">♪</span><span class="tx">Bật nhạc</span>';
  document.body.appendChild(btn);
  const tx = btn.querySelector('.tx');

  const ov = document.createElement('div');
  ov.id = 'nhac-ov';
  ov.innerHTML = '<div class="h">❤</div><div class="t">Chạm vào màn hình để bắt đầu</div><div class="s">♪ có nhạc nền, nhớ bật loa nhé</div>';
  document.body.appendChild(ov);

  let player = null;          // { play(), pause() }
  let isOn = false;           // đang phát
  let wantPlay = false;       // người xem đã chạm, đang chờ nhạc sẵn sàng

  function paint() {
    btn.classList.toggle('on', isOn);
    tx.textContent = isOn ? 'Tắt nhạc' : 'Bật nhạc';
    btn.setAttribute('aria-pressed', String(isOn));
  }
  function setOn(v) {
    isOn = v; paint();
    if (v) hideFallback();
  }

  // Nếu Chrome chặn phát tự động, hiện khung nhạc nhỏ để người xem bấm ▶ trực tiếp
  function ytBox() { return document.getElementById('nhac-yt-box'); }
  function showFallback() { const b = ytBox(); if (b && !isOn) b.classList.add('vis'); }
  function hideFallback() { const b = ytBox(); if (b) b.classList.remove('vis'); }
  function checkSoon() { setTimeout(() => { if (wantPlay && !isOn) showFallback(); }, 2000); }

  function fail() {           // không có nhạc: bỏ hết phần giao diện nhạc
    btn.remove();
    ov.remove();
    const b = ytBox(); if (b) b.remove();
  }

  function ready(p) {
    player = p;
    btn.classList.add('show');
    paint();
    if (wantPlay) { p.play().catch(() => {}); checkSoon(); }
  }

  // Chạm vào màn hình mở đầu: bật nhạc ngay trong cú chạm (để trình duyệt cho phép)
  ov.addEventListener('click', () => {
    wantPlay = true;
    if (player) { player.play().catch(() => {}); checkSoon(); }
    ov.classList.add('gone');
    setTimeout(() => ov.remove(), 700);
  });

  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (!player) return;
    if (isOn) { wantPlay = false; player.pause(); }
    else { wantPlay = true; player.play().catch(() => {}); checkSoon(); }
  });

  // ---- Nguồn nhạc: mp3 ----
  function useMp3() {
    const a = new Audio();
    a.loop = true;
    a.volume = CONFIG.volume;
    a.preload = 'auto';
    a.addEventListener('error', fail, { once: true });
    a.addEventListener('play', () => setOn(true));
    a.addEventListener('pause', () => setOn(false));
    a.addEventListener('canplay', () => {
      if (!player) ready({ play: () => a.play(), pause: () => a.pause() });
    }, { once: true });
    a.src = CONFIG.mp3;
    a.load();
  }

  // ---- Nguồn nhạc: YouTube ----
  function useYouTube() {
    // Player YouTube cần tối thiểu 200x200; đặt ngoài màn hình (không ẩn bằng display/opacity).
    // Tự tạo iframe với allow="autoplay" để Chrome cho phép phát.
    const id = encodeURIComponent(CONFIG.youtube);
    let src = `https://www.youtube.com/embed/${id}?enablejsapi=1&playsinline=1&loop=1&playlist=${id}&rel=0`;
    if (/^https?:$/.test(location.protocol)) src += '&origin=' + encodeURIComponent(location.origin);
    const holder = document.createElement('div');
    holder.id = 'nhac-yt-box';
    holder.innerHTML = '<div class="cap">Bấm ▶ để nghe nhạc</div>' +
      `<iframe id="nhac-yt" title="Nhạc nền" width="200" height="200" src="${src}" ` +
      'allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    document.body.appendChild(holder);
    window.onYouTubeIframeAPIReady = () => {
      const yt = new YT.Player('nhac-yt', {
        events: {
          onAutoplayBlocked: showFallback,
          onReady: () => {
            yt.setVolume(Math.round(CONFIG.volume * 100));
            ready({
              play: () => { yt.playVideo(); return Promise.resolve(); },
              pause: () => { yt.pauseVideo(); }
            });
          },
          onStateChange: e => {
            if (e.data === 1) setOn(true);                       // đang phát
            else if (e.data === 2 || e.data === 0) setOn(false); // tạm dừng / hết bài
          },
          onError: fail
        }
      });
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.onerror = fail;
    document.head.appendChild(s);
  }

  CONFIG.youtube ? useYouTube() : useMp3();
})();
