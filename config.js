/**
 * ====================================================================
 *                 GIA BAO BIO - CẤU HÌNH TÙY CHỈNH (CONFIG)
 * ====================================================================
 * Bạn có thể dễ dàng thay đổi thông tin cá nhân, Discord, nhạc nền,
 * mạng xã hội và kỹ năng ngay tại file này mà không cần sửa HTML/CSS.
 */

const CONFIG = {
    // 1. DISCORD USER ID (Dùng để lấy trạng thái Online / Game / Spotify qua Lanyard):
    // Thay bằng ID Discord dạng số của bạn (Ví dụ: "696340645928763455")
    // Lưu ý: Cần tham gia server discord.gg/lanyard ít nhất 1 lần để Lanyard hoạt động.
    discordId: "1268007633781133312",

    // 2. THÔNG TIN PROFILE CÁ NHÂN:
    profile: {
        pageTitle: "Tm1nkk Profile",
        name: "Tm1nkk",
        username: "tm1nkk",
        title: "Full Stack Developer • Digital Creator • Tm1nkk Sanctuary",
        avatar: "avatar.jpg",           // Ảnh đại diện cá nhân
        banner: "banner.jpg",           // Ảnh bìa đầu trang
        avatarFrame: "logo.png",        // Khung viền avatar phong cách Nitro / Vương miện phát sáng
        bio: "A bad boy who is half-hearted and uneducated all day long, dreams of becoming a scholar in the fields. Full Stack Developer • Creative Engineer • Private Sanctuary.",
        location: "HaNoi City, Vietnam",
        
        // Danh sách câu trích dẫn hiển thị hiệu ứng máy đánh chữ (Terminal Typewriter):
        quotes: [
            "Hello, I'm Tm1nkk • Full Stack Developer.",
            "No Skills, no Money • Keep learning, keep evolving.",
            "Tiện ích quản lý API!",
            "Welcome to Tm1nkk's private sanctuary.",
            "Building smooth web experiences & high-performance apps."
        ],
        
        // Huy hiệu danh dự (Badges):
        badges: [
            { icon: "fa-solid fa-code", label: "Full Stack Dev", color: "#ffffff" },
            { icon: "fa-solid fa-laptop-code", label: "API Developer", color: "#e0e0e0" },
            { icon: "fa-solid fa-bolt", label: "Digital Creator", color: "#ffffff" },
            { icon: "fa-solid fa-location-dot", label: "HaNoi City", color: "#d1d5db" },
            { icon: "fa-solid fa-crown", label: "VIP Creator", color: "#ffffff" }
        ]
    },

    // 3. DANH SÁCH DISCORD SERVER LIÊN KẾT:
    servers: [
        {
            name: "Infector Team - DLL",
            role: "Gaming & Community",
            description: "Official community — Exclusive projects, gaming & networking.",
            inviteUrl: "https://discord.gg/DQGZrpdbvj",
            icon: "logocrew.jpg",
            banner: "infector_banner.png",
            useCustomAssets: true,
            members: "45 Members",
            online: "9 Online",
            tag: "DLL",
            featured: true
        },
        {
            name: "Tm1nkk • GitHub Hub",
            role: "Developer & Open Source",
            description: "Simple And Classic. Explore open-source projects, custom tools & digital craft.",
            inviteUrl: "https://github.com/tminkk",
            icon: "avatar.jpg",
            banner: "banner.jpg",
            useCustomAssets: true,
            btnIcon: "fa-brands fa-github",
            btnText: "Explore",
            members: "Public Repos",
            online: "Active Dev",
            tag: "Portfolio",
            featured: false
        }
    ],

    // 4. MẠNG XÃ HỘI & LIÊN HỆ TRỰC TIẾP (DIRECT CONNECTIONS):
    socials: [
        { name: "Facebook", icon: "fa-brands fa-facebook", url: "https://www.facebook.com/share/1DVhBqZCTN/?mibextid=wwXIfr" },
        { name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/tminkk" },
        { name: "TikTok", icon: "fa-brands fa-tiktok", url: "https://www.tiktok.com/@tminkkhaha" },
        { name: "YouTube", icon: "fa-brands fa-youtube", url: "https://www.youtube.com/@tminkktzm" }
    ],

    // 5. NHẠC NỀN & PLAYLIST ÂM THANH (AUDIO PLAYLIST):
    music: {
        autoplayOnEnter: true,
        volume: 0.4,
        playlist: [
            {
                title: "愛人錯過 - 告五人",
                artist: "1/3 • Tm1nkk Sanctuary",
                url: "accusefive.mp3"
            },
            {
                title: "Quá Khứ Không Quên",
                artist: "2/3 • Tm1nkk Sanctuary",
                url: "quakhukhongquen.mp3"
            },
            {
                title: "Lofi Chill",
                artist: "3/3 • Tm1nkk Sanctuary",
                url: "lofichill.mp3"
            }
        ]
    },

    // 6. HIỆU ỨNG TƯƠNG TÁC (EFFECTS):
    effects: {
        enableTilt: true,              // Hiệu ứng nghiêng 3D card theo chuột
        enableSpotlight: true,         // Đèn spotlight mờ theo chuột
        enableCustomCursor: true,      // Con trỏ chuột cyber reticle phong cách viễn tưởng
        enableCursorTrail: true,       // Vệt lấp lánh (sparkles) theo con trỏ chuột
        enableParticles: true,         // Bụi sao / chùm sao di chuyển ngẫu nhiên
        enableShootingStars: true,     // Sao băng lướt qua bầu trời
        enableEqualizerWave: true      // Sóng nhạc equalizer neon phản hồi âm thanh ở chân trang
    },

    // 7. KỸ NĂNG & TECH STACK:
    skills: {
        enabled: true,
        title: "𝑻𝑬𝑪𝑯 𝑺𝑻𝑨𝑪𝑲 & 𝑫𝑬𝑽𝑬𝑳𝑶𝑷𝑬𝑹",
        pcIcon: "skillPc.svg",
        wapIcon: "skillWap.svg"
    },

    // 8. TÙY CHỌN BẢO VỆ MÃ NGUỒN (SECURITY - Mặc định tắt để dễ chỉnh sửa):
    security: {
        enabled: false,                // Đổi thành true nếu muốn bật chặn chuột phải / F12 khi deploy
        blockContextMenu: false,
        blockDevTools: false,
        blockInspect: false
    },

    // 9. BỘ ĐẾM LƯỢT XEM THỰC TẾ TRÊN CLOUD (REAL-TIME VISITOR COUNTER):
    counter: {
        enabled: true,
        key: "tminkk_bioprofile"       // Key đếm lượt truy cập độc lập trên Cloud API
    },

    // 10. THÔNG SỐ WORKSPACE & KỸ NĂNG TRỌNG TÂM (DEV SPECS):
    specs: {
        ide: "VS Code Pro",
        environment: "Zsh • Cyber Shell",
        specialty: "Full Stack & C++",
        status: "Open for Work",
        focus: "High-Performance Apps & Custom Tools"
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
