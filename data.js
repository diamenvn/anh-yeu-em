/* ============================================================
   NỘI DUNG CỦA TRANG "CÂU CHUYỆN CỦA CHÚNG MÌNH"
   Sửa các nội dung bên dưới thành câu chuyện thật của hai bạn.
   Nếu còn nội dung mẫu, đổi daDienThongTin thành false để hiện dòng "bản xem thử".
   ============================================================ */
window.TINH_YEU = {
  daDienThongTin: true,           // false = hiện dòng "bản xem thử với nội dung mẫu" ở đầu trang

  anh: 'anh iu',                  // cách xưng của người gửi
  em: 'em iu',                    // cách gọi người nhận

  // Ngày hai bạn bắt đầu yêu nhau (năm-tháng-ngày)
  ngayYeu: '2024-11-09',

  // Dòng thời gian kỷ niệm. "anh" là đường dẫn ảnh, ví dụ 'anh/ninh-binh.jpg' (để trống nếu chưa có ảnh).
  kyNiem: [
    { ngay: '09/11/2024', tieuDe: 'Ngày mình bắt đầu',
      noiDung: 'Từ hôm đó, mỗi ngày của anh iu đều có thêm một lý do để mong chờ.', anh: '' },
    { ngay: 'Kỷ niệm đầu tiên', tieuDe: 'Hai đứa đi ăn bún bò Huế',
      noiDung: 'Chỉ là một tô bún bò Huế thôi mà anh iu nhớ mãi. Ngồi cạnh em iu, món gì cũng ngon hơn.', anh: '' },
    { ngay: 'Một ngày thật vui', tieuDe: 'Ngày đi đạp vịt',
      noiDung: 'Chiếc vịt đạp hoài cũng không nhanh, nhưng có em iu bên cạnh nên anh iu chẳng muốn vào bờ.', anh: '' },
    { ngay: 'Chuyến đi đầu tiên', tieuDe: 'Tam Đảo',
      noiDung: 'Lần đầu hai đứa cùng nhau đi chơi xa. Anh iu nhận ra chỗ nào có em iu, chỗ đó là nhà.', anh: '' },
    { ngay: 'Chuyến đi của mình', tieuDe: 'Lý Sơn',
      noiDung: 'Biển, gió và em iu. Anh iu chỉ cần có vậy.', anh: '' },
    { ngay: 'Chuyến đi của mình', tieuDe: 'Ninh Bình',
      noiDung: 'Thêm một chuyến đi, thêm một trang kỷ niệm đẹp của hai đứa mình.', anh: '' },
    { ngay: 'Hôm nay', tieuDe: 'Và câu chuyện vẫn đang viết tiếp',
      noiDung: 'Cảm ơn em iu vì đã ở đây. Còn rất nhiều trang nữa chúng mình sẽ viết cùng nhau.', anh: '' }
  ],

  // Lá thư tình: mỗi phần tử là một đoạn.
  thu: [
    'Gửi em iu của anh iu,',
    'Có những điều anh iu hay ngại nói ra, nên anh iu làm trang này để nói thay.',
    'Từ ngày 9/11/2024, anh iu có thêm một người để nhớ, để thương và để cố gắng mỗi ngày. Cảm ơn em iu vì đã kiên nhẫn với anh iu, vì những lần em iu cười làm cả ngày của anh iu sáng lên.',
    'Anh iu không hứa sẽ hoàn hảo, nhưng anh iu hứa sẽ luôn ở bên em iu.'
  ],

  // Các lý do anh yêu em (thẻ lật).
  lyDo: [
    'Vì em iu cười rất xinh',
    'Vì em iu luôn lo cho anh iu',
    'Vì em iu đáng yêu cả khi giận',
    'Vì ở cạnh em iu, anh iu thấy bình yên',
    'Vì em iu nhớ những điều nhỏ nhặt',
    'Vì giọng nói của em iu',
    'Vì em iu làm anh iu muốn trở nên tốt hơn',
    'Vì em iu hay làm anh iu bật cười',
    'Vì em iu tin anh iu',
    'Vì chuyến đi nào có em iu cũng thành chuyến đi đẹp',
    'Vì em iu là em iu',
    'Vì anh iu không tưởng tượng nổi một ngày thiếu em iu'
  ],

  // Album ảnh. "src" là đường dẫn ảnh, ví dụ 'anh/anh-1.jpg' (để trống nếu chưa có ảnh).
  album: [
    { src: 'anh/anh-1.jpg', chuThich: 'Nụ cười anh iu thích nhất' },
    { src: 'anh/anh-2.jpg', chuThich: 'Mãi là của nhau' },
    { src: 'anh/anh-3.jpg', chuThich: 'Em iu của anh iu' },
    { src: 'anh/anh-4.jpg', chuThich: 'Hai đứa mình' },
    { src: 'anh/anh-5.jpg', chuThich: 'Một buổi tối thật đẹp' },
    { src: 'anh/anh-6.jpg', chuThich: 'Buổi tối của riêng mình' }
  ]
};
