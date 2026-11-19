/* ============================================================
   NỘI DUNG CỦA TRANG "CÂU CHUYỆN CỦA CHÚNG MÌNH"
   Sửa các nội dung bên dưới thành câu chuyện thật của hai bạn.
   Khi sửa xong, đổi daDienThongTin thành true để ẩn dòng "bản xem thử".
   ============================================================ */
window.TINH_YEU = {
  daDienThongTin: false,          // đổi thành true khi đã thay nội dung thật

  anh: 'anh iu',                  // cách xưng của người gửi
  em: 'em iu',                    // cách gọi người nhận

  // Ngày hai bạn bắt đầu yêu nhau (năm-tháng-ngày). ĐÂY LÀ NGÀY MẪU, hãy sửa.
  ngayYeu: '2025-02-14',

  // Dòng thời gian kỷ niệm. "anh" là đường dẫn ảnh, ví dụ 'anh/lan-dau-gap.jpg' (để trống nếu chưa có ảnh).
  kyNiem: [
    { ngay: '14/02/2025', tieuDe: 'Lần đầu mình gặp nhau',
      noiDung: 'Hôm đó em iu cười một cái, thế là anh iu quên mất mình định nói gì.', anh: '' },
    { ngay: '02/03/2025', tieuDe: 'Buổi hẹn hò đầu tiên',
      noiDung: 'Mình ngồi quán cà phê rất lâu, nói đủ thứ chuyện mà vẫn thấy chưa đủ.', anh: '' },
    { ngay: '20/04/2025', tieuDe: 'Chuyến đi đầu tiên',
      noiDung: 'Lần đầu hai đứa đi xa cùng nhau. Anh iu nhận ra chỗ nào có em iu, chỗ đó là nhà.', anh: '' },
    { ngay: '10/06/2025', tieuDe: 'Ngày em iu nói yêu anh',
      noiDung: 'Câu nói nhỏ xíu thôi nhưng anh iu nhớ mãi đến giờ.', anh: '' },
    { ngay: 'Hôm nay', tieuDe: 'Và câu chuyện vẫn đang viết tiếp',
      noiDung: 'Cảm ơn em iu vì đã ở đây. Còn rất nhiều trang nữa chúng mình sẽ viết cùng nhau.', anh: '' }
  ],

  // Lá thư tình: mỗi phần tử là một đoạn.
  thu: [
    'Gửi em iu của anh iu,',
    'Có những điều anh iu hay ngại nói ra, nên anh iu làm trang này để nói thay.',
    'Cảm ơn em iu vì đã kiên nhẫn với anh iu, vì những lần em iu cười làm cả ngày của anh iu sáng lên. Có em iu, chuyện bình thường nào cũng trở nên đặc biệt.',
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
    'Vì cái cách em iu ăn món em thích',
    'Vì em iu là em iu',
    'Vì anh iu không tưởng tượng nổi một ngày thiếu em iu'
  ],

  // Album ảnh. "src" là đường dẫn ảnh, ví dụ 'anh/dalat.jpg' (để trống nếu chưa có ảnh).
  album: [
    { src: '', chuThich: 'Ngày đầu mình đi cùng nhau' },
    { src: '', chuThich: 'Nụ cười anh iu thích nhất' },
    { src: '', chuThich: 'Một buổi chiều bình thường mà đẹp' },
    { src: '', chuThich: 'Chuyến đi nhớ mãi' },
    { src: '', chuThich: 'Lần em iu giận anh iu (xin lỗi nha)' },
    { src: '', chuThich: 'Mình của hôm nay' }
  ]
};
