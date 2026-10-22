# 🌌 Cyberpunk / Glassmorphism Bio Profile Website

> Website Bio cá nhân siêu đẹp, hiện đại, mượt mà với đầy đủ hiệu ứng âm thanh, đồ họa và animation đỉnh cao theo phong cách zyo.lol / gbdev.

---

## ✨ Tính Năng Nổi Bật (Features)

1. **Hiệu ứng Không gian & Đồ họa (Visual & Canvas Animations)**:
   - **Bầu trời sao tương tác (Starfield Constellation Canvas)**: Các hạt bụi sao bay ngẫu nhiên, tự động kết nối mạng lưới khi ở gần nhau.
   - **Hiệu ứng Sao Băng (Shooting Stars)**: Những vệt sao băng phát sáng lướt qua bầu trời đêm.
   - **Vệt đuôi chuột Comet Ribbon & Bụi sao Stardust**: Con trỏ chuột lướt đến đâu tạo ra dải ánh sáng mượt mà và các hạt sao phát sáng lung linh đến đó.
   - **Con trỏ viễn tưởng (Cyber Reticle HUD Cursor)**: Con trỏ hình HUD 4 góc với tâm kim cương xoay và dấu thập ngắm bắn, tự động phóng to và khóa mục tiêu khi di chuột vào nút/liên kết.
   - **Hiệu ứng nghiêng 3D (3D Card Tilt & Glare Reflection)**: Khung Bio tự động tính toán góc nghiêng theo vị trí chuột cùng vệt phản quang kim loại (Specular Glare) sang trọng.

2. **Hệ thống Âm nhạc & Sóng âm (Audio Player & Visualizer)**:
   - **Sóng nhạc Neon chân trang (Bottom Audio Frequency Visualizer)**: Sóng nhạc Equalizer trải dài toàn màn hình phản hồi trực tiếp theo dải tần âm thanh thực tế khi phát nhạc.
   - **Trình phát nhạc Mini (Floating Glass Audio Widget)**:
     - Đĩa than Vinyl xoay đều khi phát nhạc.
     - Danh sách bài hát (Playlist) gồm 3 bài lofi / chill đỉnh cao kèm chức năng Next / Prev / Play / Pause.
     - 4 cột sóng nhạc mini chuyển động và thanh trượt điều chỉnh âm lượng (Volume Slider).
   - **Màn hình chào đón thẩm mỹ (Aesthetic Sanctuary Welcome Screen)**: Thiết kế giao diện mở Sanctuary vừa tinh tế, vừa mở khóa chính sách Autoplay âm thanh của trình duyệt một cách mượt mà nhất.

3. **Discord Realtime Presence (Thời gian thực qua Lanyard)**:
   - Tự động hiển thị trạng thái Discord: `Online` (Xanh lá), `Idle` (Vàng), `Do Not Disturb` (Đỏ), `Offline` (Xám).
   - Hiển thị bài hát đang nghe trên **Spotify** (tên bài, nghệ sĩ, ảnh album xoay, thanh tiến trình thời gian thực).
   - Hiển thị hoạt động game hoặc **Visual Studio Code** (tên project/file đang code).
   - Trạng thái fallback mô phỏng cực ngầu khi chưa kết nối Lanyard.

4. **Kỹ năng & Tech Stack (Skills Switcher)**:
   - Chuyển đổi giữa 2 chế độ xem: `skillWap (Lưới)` và `skillPc (Dài)` với hàng chục icon công nghệ sắc nét chuẩn SVG.

5. **Discord Communities & Mạng xã hội**:
   - Thẻ hiển thị server Discord liên kết (Red Block, Gacha City) tự động cập nhật số lượng thành viên và trạng thái Online.
   - Các nút kết nối mạng xã hội: Facebook, GitHub, TikTok, YouTube với hiệu ứng hover bóng loáng.

6. **Đồng hồ thời gian thực (Live Clock GMT+7)**:
   - Cập nhật từng giây chuẩn múi giờ GMT+7 kèm chỉ số trạng thái ping hệ thống.

7. **Trung tâm cấu hình trực quan (`config.js`)**:
   - Dễ dàng thay đổi tên, avatar, bio, danh ngôn máy đánh chữ, playlist nhạc, link mạng xã hội chỉ trong 1 file cấu hình duy nhất.

---

## 📁 Cấu Trúc Thư Mục (File Structure)

```
BioProfile/
├── index.html              # Trang giao diện chính
├── style.css               # Toàn bộ CSS phong cách Dark Glassmorphism & Animations
├── config.js               # File cấu hình thông tin cá nhân, nhạc, discord, mạng xã hội
├── script.js               # Controller xử lý toàn bộ logic animation, audio, canvas & discord
├── security.js             # Module tùy chọn bảo vệ bản quyền (bật/tắt trong config)
├── avatar.gif              # Ảnh đại diện động
├── logo.png                # Khung viền avatar phong cách Nitro / Vương miện phát sáng
├── banner.jpg              # Ảnh bìa phong cách lụa viễn tưởng
├── skillWap.svg            # Ảnh SVG Tech Stack dạng lưới
├── skillPc.svg             # Ảnh SVG Tech Stack dạng dài
├── f8_icon.png / banner    # Icon & Banner Discord Red Block
├── gta_icon.png / banner   # Icon & Banner Discord Gacha City
├── quakhukhongquen.mp3     # Bài hát 1 trong playlist
├── lofichill.mp3           # Bài hát 2 trong playlist
├── emkhongcan.mp3          # Bài hát 3 trong playlist
└── README.md               # Hướng dẫn chi tiết
```

---

## 🚀 Hướng Dẫn Sử Dụng & Tùy Chỉnh

### 1. Chạy thử trên máy tính (Local)
- Mở thư mục này trong Visual Studio Code, cài extension **Live Server** rồi bấm **"Go Live"**.
- Hoặc mở terminal trong thư mục và gõ:
  ```bash
  npx serve .
  # hoặc
  python -m http.server 3000
  ```
  Sau đó mở trình duyệt tại: `http://localhost:3000`.

### 2. Tùy chỉnh thông tin trong `config.js`
Mở file [config.js](file:///c:/Users/tnmth/OneDrive/Documents/BioProfile/config.js) để chỉnh sửa:
- **`discordId`**: Đổi thành ID Discord dạng số của bạn (ví dụ: `"696340645928763455"`).
  *(Lưu ý: Bạn hãy tham gia server [discord.gg/lanyard](https://discord.gg/lanyard) để bot Lanyard tự động đọc trạng thái của bạn)*.
- **`profile`**: Đổi tên, username, tiểu sử bio, avatar, banner, danh sách câu nói máy đánh chữ (quotes).
- **`socials`**: Thay link Facebook, GitHub, TikTok, YouTube của bạn.
- **`music`**: Thêm bài hát hoặc đổi file nhạc trong danh sách phát `playlist`.
- **`security`**: Đặt `enabled: true` nếu bạn muốn bật tính năng chống F12 và chặn chuột phải khi đã hoàn thiện trang.

---

## 🌐 Hướng Dẫn Đưa Lên Mạng Miễn Phí (Deploy)

Bạn có thể đưa trang Bio này lên mạng hoàn toàn miễn phí với tên miền riêng hoặc subdomain siêu tốc độ:

1. **Cloudflare Pages (Khuyên dùng)**:
   - Vào [pages.cloudflare.com](https://pages.cloudflare.com/)
   - Kéo thả thư mục `BioProfile` vào hoặc kết nối với kho lưu trữ GitHub của bạn.
   - Nhận ngay link dạng `tencuaban.pages.dev` hỗ trợ HTTPS, CDN toàn cầu cực nhanh.

2. **Vercel**:
   - Đăng nhập [vercel.com](https://vercel.com/)
   - Import project từ GitHub hoặc dùng lệnh `npx vercel`.

3. **GitHub Pages**:
   - Đẩy toàn bộ source code lên một repository GitHub.
   - Vào mục **Settings** -> **Pages** -> Chọn Branch `main` -> **Save**.
