document.addEventListener('DOMContentLoaded', function () {
  $(document).ready(function() {
    $.getJSON("https://api-ipv4.ip.sb/geoip", function(data) {
      var ipAddress = data.ip;
      var country = data.country;
      var region = data.region;
      var city = data.city;
      var isp = data.isp;

      $("#ip-address").text(ipAddress);
      $("#country").text(country);
      $("#region").text(region);
      $("#city").text(city);
      $("#isp").text(isp);
    });

    var count = 0;
    function toggleContent() {
      var content = document.getElementById('content');
      var content1 = document.getElementById('content1');
      if (count % 2 === 0) {
        content.classList.remove('hidden');
        content1.classList.add('hidden1');
      } else {
        content.classList.add('hidden');
        content1.classList.remove('hidden1');
      }
      count++; 
    } 
    setInterval(toggleContent, 2000);
  });

  // script.js
  let isPlaying = false;
  let isToastVisible = false;

  // Tạo một đối tượng Howl để quản lý âm thanh
  let sound;

  // Hàm để chơi bài hát và xử lý sự kiện khi kết thúc
  function playSong() {
    sound.play();
    isPlaying = true;

    // Lắng nghe sự kiện khi bài hát kết thúc
    sound.on('end', function () {
      isPlaying = false;
      playNextSong();
    });
  }

  // Hàm để chơi bài hát tiếp theo
  function playNextSong() {
    // Chọn một bài hát ngẫu nhiên mới
    const nextSong = getRandomSong();

    // Tạo một đối tượng Howl mới
    sound = new Howl({
      src: [nextSong.url],
      html5: true,
      volume: 0.4,
    });

    // Chơi bài hát mới
    sound.on('end', function () {
    playNextSong();
  });

  playSong();
}
  
 // Kết nối và lấy thông tin từ thư viện nhạc
  fetch('https://tuasan-vn.glitch.me/music.json')
    .then(response => response.json())
    .then(data => {
      // Kiểm tra nếu API trả về một đối tượng chứa mảng
      const songs = Array.isArray(data) ? data : data.songs || [];

      // Lấy một bài hát ngẫu nhiên từ thư viện
      const randomSong = getRandomSong(songs);

      // Tạo đối tượng Howl để phát bài hát
      sound = new Howl({
        src: [randomSong.url],
        html5: true,
        volume: 0.4,
      });

      // Phát bài hát khi có sự kiện click, chỉ phát khi chưa phát trước đó
      document.addEventListener('click', function () {
        if (!isPlaying) {
          playSong();
        }
      });
    })
    .catch(error => console.error('Error fetching music library:', error)); 
  
  // Hàm để ẩn toast
  function hideToast() {
    // Ẩn logic toast ở đây
  }

  // Hiển thị toast và làm mờ nền khi trang web được tải
  showToast("Welcome to Tuasan's website!!!");

  // Ẩn toast khi click bất kỳ nơi nào trên trang
  document.addEventListener('click', function () {
    if (isToastVisible) {
      hideToast();
    }
  });

  // Hàm hiển thị toast và làm mờ nền
  function showToast(text) {
    // Tạo lớp mờ (overlay) và thêm vào trang
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Hiển thị toast
    Toastify({
      text: text,
      duration: 1000000, // Thời gian hiển thị toast (1000 giây trong ví dụ này)
      newWindow: true,
      close: false, // Tắt nút đóng
      gravity: 'top', // Vị trí của toast (có thể là "top", "bottom", "left", "right")
      position: 'center', // Vị trí chính xác của toast (có thể là "left", "center", "right")
    }).showToast();

    // Đặt trạng thái toast thành true
    isToastVisible = true;
  }

  // Hàm ẩn toast và làm mờ nền
  function hideToast() {
    document.querySelector('.toastify').remove();
    document.querySelector('.overlay').remove();
    // Đặt trạng thái toast thành false
    isToastVisible = false;
  }

  // Hàm để lấy một bài hát ngẫu nhiên từ thư viện
  function getRandomSong(library) {
    const randomIndex = Math.floor(Math.random() * library.length);
    return library[randomIndex];
  }
});
