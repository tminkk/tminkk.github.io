/**
 * ====================================================================
 *                 NHAT TAM BIO - SCRIPT CONTROLLER (zyo.lol style)
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initProfileUI();
    initDevSpecs();
    initTypewriter();
    initClickToEnter();
    initAudioController();
    initBottomAudioVisualizer();
    initMouseEffects();
    initParticleCanvas();
    initLanyardRealtime();
    initLocalClock();
    initViewCounter();
    initAvatarInteractiveFX();
});

/* ====================================================================
   1. PROFILE UI INITIALIZATION FROM CONFIG
   ==================================================================== */
function initProfileUI() {
    // Set Browser Document Title
    document.title = CONFIG.profile.pageTitle || CONFIG.profile.name || "Tm1nkk Profile";

    // Set Profile Text
    const nameEl = document.getElementById('user-display-name');
    const handleEl = document.getElementById('user-handle');
    const taglineEl = document.getElementById('user-tagline');
    const bioEl = document.getElementById('user-bio');
    const avatarEl = document.getElementById('profile-avatar');
    const bannerEl = document.getElementById('card-banner');

    if (nameEl) nameEl.textContent = CONFIG.profile.name;
    if (handleEl) handleEl.textContent = `@${CONFIG.profile.username}`;
    if (taglineEl) taglineEl.textContent = CONFIG.profile.title;
    if (bioEl) bioEl.textContent = CONFIG.profile.bio;
    if (avatarEl && CONFIG.profile.avatar) avatarEl.src = CONFIG.profile.avatar;
    if (bannerEl && CONFIG.profile.banner) bannerEl.style.backgroundImage = `url('${CONFIG.profile.banner}')`;

    // Synchronize Cute Welcome Overlay
    const enterAvatarEl = document.querySelector('.cute-avatar-img, .enter-avatar-img');
    const enterNameEl = document.querySelector('.cute-name, .enter-name');
    if (enterAvatarEl && CONFIG.profile.avatar) enterAvatarEl.src = CONFIG.profile.avatar;
    if (enterNameEl && CONFIG.profile.name) enterNameEl.textContent = CONFIG.profile.name;

    // Synchronize Avatar Frame Ring (logo.png)
    const frameEl = document.getElementById('avatar-frame-ring');
    const cuteFrameEl = document.getElementById('cute-avatar-frame-ring');
    if (CONFIG.profile.avatarFrame) {
        if (frameEl) frameEl.src = CONFIG.profile.avatarFrame;
        if (cuteFrameEl) cuteFrameEl.src = CONFIG.profile.avatarFrame;
    }

    // Render Badges
    const badgesContainer = document.getElementById('badges-container');
    if (badgesContainer && CONFIG.profile.badges) {
        badgesContainer.innerHTML = '';
        CONFIG.profile.badges.forEach(badge => {
            const pill = document.createElement('div');
            pill.className = 'badge-pill';
            pill.innerHTML = `<i class="${badge.icon}"></i> <span>${badge.label}</span>`;
            badgesContainer.appendChild(pill);
        });
    }

    // Render 2 Discord Servers (Ảnh Avatar & Banner thật 100% từ Discord)
    const serversGrid = document.getElementById('servers-grid');
    if (serversGrid && CONFIG.servers) {
        serversGrid.innerHTML = '';
        CONFIG.servers.forEach((srv, idx) => {
            const card = document.createElement('div');
            card.className = 'server-card';
            card.id = `server-card-${idx}`;
            card.innerHTML = `
                <img src="${srv.banner}" alt="${srv.name} Banner" class="server-banner-img" id="server-banner-${idx}">
                <div class="server-body">
                    <div class="server-icon-wrap">
                        <img src="${srv.icon}" alt="${srv.name} Icon" class="server-icon" id="server-icon-${idx}">
                    </div>
                    <div class="server-content">
                        <div class="server-top-line">
                            <span class="server-name" id="server-name-${idx}">${srv.name}</span>
                            <span class="server-tag">${srv.tag}</span>
                        </div>
                        <div class="server-stats" id="server-stats-${idx}" style="display:flex;align-items:center;gap:7px;font-size:0.7rem;color:var(--text-muted);font-family:var(--font-mono);margin-top:1px;">
                            <span style="display:inline-flex;align-items:center;gap:4px;"><i class="fa-solid fa-circle" style="color:var(--status-online);font-size:0.45rem;"></i> ${srv.online || 'Active Hub'}</span>
                            <span>•</span>
                            <span>${srv.members || 'Community'}</span>
                        </div>
                        <span class="server-role">${srv.role}</span>
                        <p class="server-desc">${srv.description}</p>
                    </div>
                    <a href="${srv.inviteUrl}" target="_blank" rel="noopener noreferrer" class="server-join-btn">
                        <i class="${srv.btnIcon || (srv.inviteUrl && srv.inviteUrl.includes('discord') ? 'fa-brands fa-discord' : 'fa-solid fa-arrow-up-right-from-square')}"></i> ${srv.btnText || (srv.inviteUrl && srv.inviteUrl.includes('discord') ? 'Join' : 'Explore')}
                    </a>
                </div>
            `;
            serversGrid.appendChild(card);

            // Fallback bindings if local or CDN image has network issues
            const bannerEl = card.querySelector('.server-banner-img');
            const iconEl = card.querySelector('.server-icon');
            if (bannerEl && srv.cdnBanner) {
                bannerEl.onerror = () => {
                    if (bannerEl.src !== srv.cdnBanner) bannerEl.src = srv.cdnBanner;
                };
            }
            if (iconEl && srv.cdnIcon) {
                iconEl.onerror = () => {
                    if (iconEl.src !== srv.cdnIcon) iconEl.src = srv.cdnIcon;
                };
            }

            // Fetch latest live Discord server data only if it is a Discord invite URL
            if (srv.inviteUrl && (srv.inviteUrl.includes('discord.gg') || srv.inviteUrl.includes('discord.com'))) {
                fetchDiscordInviteData(srv.inviteUrl, idx);
            }
        });
    }

    // Render Socials
    const socialsList = document.getElementById('socials-list');
    if (socialsList && CONFIG.socials) {
        socialsList.innerHTML = '';
        CONFIG.socials.forEach(soc => {
            const a = document.createElement('a');
            a.className = 'social-pill';
            a.href = soc.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.innerHTML = `<i class="${soc.icon}"></i> <span>${soc.name}</span>`;

            if (soc.copy) {
                a.addEventListener('click', (e) => {
                    // If it has copy tag, copy and toast
                    navigator.clipboard.writeText(soc.copy);
                    showToast(`Đã sao chép ${soc.name}: ${soc.copy}`);
                });
            }

            socialsList.appendChild(a);
        });
    }

    // Copy Tag Button Event
    const copyTagBtn = document.getElementById('copy-tag-btn');
    if (copyTagBtn) {
        copyTagBtn.addEventListener('click', () => {
            const textToCopy = CONFIG.profile.username || CONFIG.discordId;
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Đã sao chép Discord: ${textToCopy}`);
                playBeepSound(600, 0.08);
            });
        });
    }

    // Synchronize Skills Section from CONFIG
    if (CONFIG.skills) {
        const skillsSec = document.querySelector('.skills-section');
        if (CONFIG.skills.enabled === false) {
            if (skillsSec) skillsSec.style.display = 'none';
        } else {
            const skillPcEl = document.getElementById('skillPc');
            const skillWapEl = document.getElementById('skillWap');
            if (skillPcEl && CONFIG.skills.pcIcon) skillPcEl.src = CONFIG.skills.pcIcon;
            if (skillWapEl && CONFIG.skills.wapIcon) skillWapEl.src = CONFIG.skills.wapIcon;
        }
    }
}

/* ====================================================================
   1.1 DYNAMIC DISCORD GUILD INVITE FETCHER (Live Icon, Banner & Counts)
   ==================================================================== */
async function fetchDiscordInviteData(inviteUrl, idx) {
    try {
        const code = inviteUrl.split('/').pop().trim();
        if (!code) return;
        const res = await fetch(`https://discord.com/api/v9/invites/${code}?with_counts=true`);
        if (!res.ok) return;
        const data = await res.json();
        if (!data || !data.guild) return;

        const guild = data.guild;
        const iconEl = document.getElementById(`server-icon-${idx}`);
        const bannerEl = document.getElementById(`server-banner-${idx}`);
        const statsEl = document.getElementById(`server-stats-${idx}`);
        const nameEl = document.getElementById(`server-name-${idx}`);

        const srvConfig = (CONFIG.servers && CONFIG.servers[idx]) || {};

        // Update real server name if available and not custom
        if (nameEl && guild.name && !srvConfig.useCustomAssets) {
            nameEl.textContent = guild.name;
        }

        // Update real server icon from Discord CDN (nếu không bật useCustomAssets)
        if (iconEl && guild.icon && !srvConfig.useCustomAssets) {
            const isGif = guild.icon.startsWith('a_');
            const ext = isGif ? 'gif' : 'png';
            iconEl.src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${ext}?size=256`;
        }

        // Update real server banner or splash from Discord CDN (nếu không bật useCustomAssets)
        if (bannerEl && !srvConfig.useCustomAssets) {
            if (guild.banner) {
                const isGif = guild.banner.startsWith('a_');
                const ext = isGif ? 'gif' : 'png';
                bannerEl.src = `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.${ext}?size=1024`;
            } else if (guild.splash) {
                bannerEl.src = `https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.png?size=1024`;
            }
        }

        // Update real member and online counts
        if (statsEl && data.approximate_member_count) {
            const onlineCount = data.approximate_presence_count || 0;
            const memberCount = data.approximate_member_count;
            statsEl.innerHTML = `
                <span style="display:inline-flex;align-items:center;gap:4px;"><i class="fa-solid fa-circle" style="color:var(--status-online);font-size:0.45rem;"></i> ${onlineCount.toLocaleString()} Online</span>
                <span>•</span>
                <span>${memberCount.toLocaleString()} Members</span>
            `;
        }
    } catch (e) {
        // Silently use values defined in config.js
    }
}

/* ====================================================================
   2. TYPEWRITER EFFECT FOR QUOTES
   ==================================================================== */
function initTypewriter() {
    const textEl = document.getElementById('typewriter-quote');
    if (!textEl || !CONFIG.profile.quotes || CONFIG.profile.quotes.length === 0) return;

    let quoteIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const quotes = CONFIG.profile.quotes;

    function typeLoop() {
        const currentQuote = quotes[quoteIndex];
        
        if (isDeleting) {
            charIndex--;
            textEl.textContent = currentQuote.substring(0, charIndex);
        } else {
            charIndex++;
            textEl.textContent = currentQuote.substring(0, charIndex);
        }

        let typeSpeed = isDeleting ? 30 : 65;

        if (!isDeleting && charIndex === currentQuote.length) {
            typeSpeed = 2600; // Pause at end of quote
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            quoteIndex = (quoteIndex + 1) % quotes.length;
            typeSpeed = 500;
        }

        setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
}

/* ====================================================================
   3. CLICK TO ENTER OVERLAY (zyo.lol Iconic Experience)
   ==================================================================== */
function initClickToEnter() {
    const overlay = document.getElementById('enter-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', () => {
        overlay.classList.add('entered');
        playBeepSound(440, 0.12);

        // Start Audio Playback if enabled
        if (CONFIG.music && CONFIG.music.autoplayOnEnter) {
            const audio = document.getElementById('bg-audio');
            if (audio) {
                audio.play().then(() => {
                    updateAudioWidgetState(true);
                    if (playlist.length > 0 && playlist[currentTrackIndex]) {
                        showToast(`Đang phát: ${playlist[currentTrackIndex].title}`, 'fa-solid fa-music');
                    }
                }).catch(e => console.log('Audio autoplay prevented:', e));
            }
        }
    });
}

/* ====================================================================
   4. AUDIO PLAYER CONTROLLER (Playlist & Controls)
   ==================================================================== */
let currentTrackIndex = 0;
let playlist = [];

function initAudioController() {
    const audio = document.getElementById('bg-audio');
    const playBtn = document.getElementById('audio-play-btn');
    const prevBtn = document.getElementById('audio-prev-btn');
    const nextBtn = document.getElementById('audio-next-btn');
    const playIcon = document.getElementById('play-icon');
    const disc = document.getElementById('audio-disc');
    const eq = document.getElementById('equalizer');
    const volumeSlider = document.getElementById('volume-slider');
    const trackTitle = document.getElementById('audio-track-title');
    const artistName = document.getElementById('audio-artist-name');

    if (!audio || !CONFIG.music) return;

    // Load playlist from config or fallback
    if (Array.isArray(CONFIG.music.playlist) && CONFIG.music.playlist.length > 0) {
        playlist = CONFIG.music.playlist;
    } else if (CONFIG.music.url) {
        playlist = [{
            title: CONFIG.music.title || 'Lofi Chill',
            artist: CONFIG.music.artist || 'Sanctuary Beats',
            url: CONFIG.music.url
        }];
    }

    if (playlist.length === 0) return;

    audio.volume = CONFIG.music.volume || 0.4;
    if (volumeSlider) volumeSlider.value = audio.volume;

    function loadTrack(index, autoPlay = false) {
        if (index < 0) index = playlist.length - 1;
        if (index >= playlist.length) index = 0;
        currentTrackIndex = index;

        const track = playlist[currentTrackIndex];
        try {
            audio.pause();
            audio.currentTime = 0;
        } catch (e) {}
        audio.src = track.url;
        audio.load();

        if (trackTitle) {
            trackTitle.textContent = track.title;
            trackTitle.title = track.title;
        }
        if (artistName) {
            const countTag = playlist.length > 1 ? `${currentTrackIndex + 1}/${playlist.length} • ` : '';
            artistName.textContent = `${countTag}${track.artist}`;
        }

        if (autoPlay) {
            audio.play().then(() => {
                updateAudioWidgetState(true);
                showToast(`Đang phát: ${track.title}`, 'fa-solid fa-music');
            }).catch(err => {
                console.log('Audio play prevented:', err);
                updateAudioWidgetState(false);
            });
        }
    }

    function playNextTrack() {
        playBeepSound(560, 0.05);
        const nextIdx = (currentTrackIndex + 1) % playlist.length;
        loadTrack(nextIdx, true);
    }

    function playPrevTrack() {
        playBeepSound(480, 0.05);
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
            return;
        }
        const prevIdx = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(prevIdx, true);
    }

    // Set initial track metadata
    loadTrack(0, false);

    // Play/Pause button
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            playBeepSound(520, 0.05);
            if (audio.paused) {
                audio.play().then(() => {
                    updateAudioWidgetState(true);
                }).catch(e => console.log('Audio playback error:', e));
            } else {
                audio.pause();
                updateAudioWidgetState(false);
            }
        });
    }

    // Next track button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            playNextTrack();
        });
    }

    // Prev track button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            playPrevTrack();
        });
    }

    // Volume slider
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = parseFloat(e.target.value);
        });
    }

    // Audio Progress Tracker & Seeker
    const progressBar = document.getElementById('audio-progress-bar');
    const progressFill = document.getElementById('audio-progress-fill');
    const curTimeEl = document.getElementById('audio-current-time');
    const totTimeEl = document.getElementById('audio-total-time');

    function formatTimeSec(sec) {
        if (isNaN(sec) || sec < 0) return '0:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    audio.addEventListener('timeupdate', () => {
        if (!audio.duration) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        if (progressFill) progressFill.style.width = `${pct}%`;
        if (curTimeEl) curTimeEl.textContent = formatTimeSec(audio.currentTime);
        if (totTimeEl && !isNaN(audio.duration)) totTimeEl.textContent = formatTimeSec(audio.duration);
    });

    audio.addEventListener('loadedmetadata', () => {
        if (totTimeEl && !isNaN(audio.duration)) totTimeEl.textContent = formatTimeSec(audio.duration);
    });

    if (progressBar) {
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            if (audio.duration) {
                audio.currentTime = ratio * audio.duration;
            }
        });
    }

    // Audio events
    audio.addEventListener('play', () => updateAudioWidgetState(true));
    audio.addEventListener('pause', () => updateAudioWidgetState(false));
    audio.addEventListener('ended', () => {
        // Auto-advance to next song in playlist
        playNextTrack();
    });

    // Expose for external control or debugging
    window.bioPlayer = {
        next: playNextTrack,
        prev: playPrevTrack,
        load: loadTrack
    };
}

function updateAudioWidgetState(isPlaying) {
    const playIcon = document.getElementById('play-icon');
    const disc = document.getElementById('audio-disc');
    const eq = document.getElementById('equalizer');

    if (isPlaying) {
        if (playIcon) playIcon.className = 'fa-solid fa-pause';
        if (disc) disc.classList.add('playing');
        if (eq) eq.classList.add('active');
    } else {
        if (playIcon) playIcon.className = 'fa-solid fa-play';
        if (disc) disc.classList.remove('playing');
        if (eq) eq.classList.remove('active');
    }
}

/* ====================================================================
   4B. BOTTOM AUDIO BEAT VISUALIZER (Full-width Sleek Equalizer Wave)
   ==================================================================== */
function initBottomAudioVisualizer() {
    const canvas = document.getElementById('bottom-audio-visualizer');
    const audio = document.getElementById('bg-audio');
    if (!canvas || !audio) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Track state of each visualizer bar
    const barStates = [];

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = window.innerWidth;
        height = canvas.clientHeight || 44;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
    }
    window.addEventListener('resize', resize);
    resize();

    // Web Audio API & Analyser setup
    let audioCtx = null;
    let analyser = null;
    let sourceNode = null;
    let dataArray = null;
    let isWebAudioReady = false;

    function initWebAudio() {
        if (isWebAudioReady) return;
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;

            if (!audioCtx) {
                audioCtx = new AudioContextClass();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().catch(() => {});
            }

            if (!sourceNode) {
                sourceNode = audioCtx.createMediaElementSource(audio);
                analyser = audioCtx.createAnalyser();
                analyser.fftSize = 256;
                analyser.smoothingTimeConstant = 0.78;
                sourceNode.connect(analyser);
                analyser.connect(audioCtx.destination);

                dataArray = new Uint8Array(analyser.frequencyBinCount);
            }
            isWebAudioReady = true;
        } catch (e) {
            // Browsers may restrict MediaElementSource under file:// protocol
        }
    }

    const triggerAudioContext = () => {
        initWebAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
        }
    };

    // Listen to user interactions to unlock AudioContext
    ['click', 'touchstart', 'keydown'].forEach(evt => {
        window.addEventListener(evt, triggerAudioContext, { passive: true });
    });
    audio.addEventListener('play', triggerAudioContext);

    let animTime = 0;

    function render() {
        requestAnimationFrame(render);
        animTime += 0.035;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const isPlaying = !audio.paused && !audio.ended && audio.currentTime > 0;
        let hasRealData = false;

        if (isWebAudioReady && analyser && isPlaying) {
            analyser.getByteFrequencyData(dataArray);
            for (let i = 0; i < 20; i++) {
                if (dataArray[i] > 0) {
                    hasRealData = true;
                    break;
                }
            }
        }

        // Responsive bar count across the screen width (~13px per slot)
        const numBars = Math.max(36, Math.min(128, Math.floor(width / 13)));
        if (barStates.length !== numBars) {
            barStates.length = 0;
            for (let i = 0; i < numBars; i++) {
                barStates.push({
                    currentH: 2 * dpr,
                    peakH: 2 * dpr,
                    velocity: 0
                });
            }
        }

        const usableHeight = Math.max(10, (height - 6) * dpr);
        const totalW = width * dpr;
        const slotW = totalW / numBars;
        const barW = Math.max(2 * dpr, slotW * 0.58);
        const gap = slotW - barW;
        const half = numBars / 2;

        // Theme reactive colors
        const themeColor = typeof getActiveThemeColor === 'function' ? getActiveThemeColor() : { r: 192, g: 132, b: 252 };

        // Ambient floor line glow at the bottom edge
        ctx.fillStyle = isPlaying ? `rgba(${themeColor.r}, ${themeColor.g}, ${themeColor.b}, 0.25)` : 'rgba(255, 255, 255, 0.06)';
        ctx.fillRect(0, (height - 1.5) * dpr, totalW, 1.5 * dpr);

        // Gradient for equalizer bars
        const grad = ctx.createLinearGradient(0, height * dpr, 0, 0);
        grad.addColorStop(0, `rgba(${themeColor.r}, ${themeColor.g}, ${themeColor.b}, 0.2)`);
        grad.addColorStop(0.35, `rgba(${themeColor.r}, ${themeColor.g}, ${themeColor.b}, 0.75)`);
        grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.92)');
        grad.addColorStop(1, '#ffffff');

        // Bass energy calculation for dynamic rhythm boost
        let bassKick = 0;
        if (hasRealData && dataArray) {
            bassKick = (dataArray[1] + dataArray[2] + dataArray[3] + dataArray[4]) / (4 * 255);
        }

        for (let i = 0; i < numBars; i++) {
            const state = barStates[i];
            let targetH = 2 * dpr;

            if (isPlaying) {
                if (hasRealData && dataArray) {
                    // Symmetrical spectrum layout from center outward
                    const distFromCenter = Math.abs(i - half) / half;
                    const binIdx = Math.floor(distFromCenter * 52) + 1;
                    const freqVal = (dataArray[Math.min(binIdx, dataArray.length - 1)] || 0) / 255;

                    // Blend frequency with bass punch and audio volume
                    const combined = freqVal * 0.75 + bassKick * 0.25;
                    const punch = Math.pow(combined, 1.3) * (audio.volume || 0.4) * 2.4;
                    targetH = Math.max(2 * dpr, punch * usableHeight);
                } else {
                    // Procedural rhythm fallback
                    const t = animTime;
                    const beat = Math.abs(Math.sin(t * 3.6)) * 0.65 + Math.abs(Math.sin(t * 7.2 + i * 0.16)) * 0.35;
                    const wave = Math.sin(t * 2.4 + i * 0.2) * 0.3 + 0.7;
                    const punch = beat * wave * (audio.volume || 0.4) * usableHeight * 0.9;
                    targetH = Math.max(2 * dpr, punch);
                }
            } else {
                // Subtle gentle resting breath wave when paused
                const idleWave = (Math.sin(animTime * 1.5 + i * 0.16) + 1) * 0.5;
                targetH = (1.5 + idleWave * 2) * dpr;
            }

            // Smooth interpolation
            state.currentH += (targetH - state.currentH) * 0.26;

            // Studio peak falling dot mechanics
            if (state.currentH >= state.peakH) {
                state.peakH = state.currentH;
                state.velocity = 0;
            } else {
                state.velocity += 0.16 * dpr;
                state.peakH -= state.velocity;
                if (state.peakH < state.currentH) {
                    state.peakH = state.currentH;
                    state.velocity = 0;
                }
            }

            const x = i * slotW + gap / 2;
            const drawH = Math.max(1.5 * dpr, Math.min(state.currentH, usableHeight));
            const y = (height * dpr) - drawH;

            // Draw bar
            ctx.fillStyle = grad;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x, y, barW, drawH, [2 * dpr, 2 * dpr, 0, 0]);
            } else {
                ctx.rect(x, y, barW, drawH);
            }
            ctx.fill();

            // Draw glowing peak cap dash
            if (isPlaying && state.peakH > 4 * dpr) {
                const peakY = (height * dpr) - state.peakH - 2 * dpr;
                ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
                ctx.fillRect(x, Math.max(0, peakY), barW, 1.5 * dpr);
            }
        }
    }

    render();
}

/* ====================================================================
   5. MOUSE EFFECTS: SPOTLIGHT, 3D CARD TILT & CYBER RETICLE CURSOR
   ==================================================================== */
// Shared Stardust & Comet Trail arrays for particle canvas
const stardustSparks = [];
const cometRibbon = [];

function initMouseEffects() {
    const spotlight = document.getElementById('mouse-spotlight');
    const cyberCursor = document.getElementById('cyber-cursor');
    const tiltContainer = document.getElementById('tilt-container');
    const bioCard = document.getElementById('bio-card');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let cursorX = mouseX;
    let cursorY = mouseY;

    let currentAngle = 0;
    let targetAngle = 0;

    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    // Track Mouse Move
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const dx = mouseX - prevMouseX;
        const dy = mouseY - prevMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Calculate dynamic tilt angle for cyber reticle
        if (speed > 1.5) {
            targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        }

        // Add to Comet Ribbon Trail
        cometRibbon.push({
            x: mouseX,
            y: mouseY,
            age: 0,
            life: 24,
            width: Math.min(speed * 0.45 + 2.5, 9)
        });

        // Emit glowing stardust sparks
        if (speed > 3) {
            const count = Math.min(Math.floor(speed / 4), 3);
            for (let i = 0; i < count; i++) {
                stardustSparks.push({
                    x: mouseX + (Math.random() - 0.5) * 6,
                    y: mouseY + (Math.random() - 0.5) * 6,
                    vx: (Math.random() - 0.5) * 2 - dx * 0.1,
                    vy: (Math.random() - 0.5) * 2 - dy * 0.1,
                    size: Math.random() * 2.5 + 1,
                    alpha: 0.85,
                    decay: Math.random() * 0.03 + 0.025
                });
            }
        }

        prevMouseX = mouseX;
        prevMouseY = mouseY;

        // Update spotlight position
        if (CONFIG.effects.enableSpotlight && spotlight) {
            spotlight.style.setProperty('--mouse-x', `${mouseX}px`);
            spotlight.style.setProperty('--mouse-y', `${mouseY}px`);
        }

        // Calculate 3D Card Tilt relative to window center (Desktop only)
        if (CONFIG.effects.enableTilt && tiltContainer && window.innerWidth > 992) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const maxTilt = 8; // degrees

            const deltaX = (mouseX - centerX) / centerX;
            const deltaY = (mouseY - centerY) / centerY;

            targetTiltX = -deltaY * maxTilt;
            targetTiltY = deltaX * maxTilt;

            // Card Glare coordinates
            if (bioCard) {
                const rect = bioCard.getBoundingClientRect();
                const glareX = mouseX - rect.left;
                const glareY = mouseY - rect.top;
                bioCard.style.setProperty('--glare-x', `${glareX}px`);
                bioCard.style.setProperty('--glare-y', `${glareY}px`);
            }
        }
    });

    // Reset tilt and angle when cursor leaves window
    window.addEventListener('mouseleave', () => {
        targetTiltX = 0;
        targetTiltY = 0;
        targetAngle = 0;
    });

    // Cursor hover effects on interactive elements
    const interactiveElements = 'a, button, input, .badge-pill, .server-card, .activity-card, .enter-overlay';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveElements)) {
            document.body.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveElements)) {
            document.body.classList.remove('cursor-hover');
        }
    });

    // Smooth physics loop (Lerp)
    function renderPhysics() {
        if (window.innerWidth > 992) {
            // Elastic responsive Cyber Reticle Cursor
            cursorX += (mouseX - cursorX) * 0.28;
            cursorY += (mouseY - cursorY) * 0.28;

            // Smooth angle rotation
            let angleDiff = targetAngle - currentAngle;
            while (angleDiff > 180) angleDiff -= 360;
            while (angleDiff < -180) angleDiff += 360;
            currentAngle += angleDiff * 0.12;

            if (cyberCursor) {
                cyberCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) rotate(${currentAngle.toFixed(1)}deg)`;
            }

            // Smooth Card Tilt
            if (CONFIG.effects.enableTilt && tiltContainer) {
                currentTiltX += (targetTiltX - currentTiltX) * 0.08;
                currentTiltY += (targetTiltY - currentTiltY) * 0.08;
                tiltContainer.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
            }
        } else {
            if (tiltContainer && tiltContainer.style.transform) {
                tiltContainer.style.transform = '';
            }
        }

        requestAnimationFrame(renderPhysics);
    }
    requestAnimationFrame(renderPhysics);
}

/* ====================================================================
   6. MONOCHROME PARTICLE & FLUID STARDUST COMET CANVAS
   ==================================================================== */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || !CONFIG.effects.enableParticles) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Ambient floating particles
    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 65);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.35,
            speedY: (Math.random() - 0.5) * 0.35,
            alpha: Math.random() * 0.45 + 0.15
        });
    }

    // 4. Shooting Stars Generator (Lâu lâu có sao băng xẹt qua bầu trời)
    const shootingStars = [];
    let nextShootingStarTime = Date.now() + 1200; // Ngay sau khi vào 1.2s sẽ có 1 sao băng đầu tiên

    function spawnShootingStar() {
        if (CONFIG.effects.enableShootingStars === false) return;
        
        // Góc rơi tự nhiên chếch chéo từ 32° đến 52°
        const angleDeg = Math.random() * 20 + 32;
        const angle = (angleDeg * Math.PI) / 180;
        const speed = Math.random() * 12 + 18; // Tốc độ xẹt nhanh, mượt mà

        // Xuất phát từ cạnh trên hoặc mép trái phía trên
        const spawnFromTop = Math.random() > 0.35;
        const startX = spawnFromTop ? Math.random() * (width * 0.9) : -60;
        const startY = spawnFromTop ? -60 : Math.random() * (height * 0.45);

        // Chiều dài vệt đuôi sao băng phát sáng
        const trailLength = Math.random() * 160 + 220;

        shootingStars.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: trailLength,
            width: Math.random() * 1.5 + 2.2,
            alpha: 1.0,
            decay: Math.random() * 0.012 + 0.012,
            glowHue: Math.random() > 0.4 ? 'rgba(168, 85, 247, 0.85)' : 'rgba(255, 255, 255, 0.95)',
            sparkTimer: 0
        });

        // Hẹn giờ sao băng tiếp theo xuất hiện ngẫu nhiên sau 4.5s đến 9.5s
        nextShootingStarTime = Date.now() + (Math.random() * 5000 + 4500);
    }

    // Nhấn phím 'S' để gọi sao băng tức thì nếu muốn thử
    window.addEventListener('keydown', (e) => {
        if (e.key && e.key.toLowerCase() === 's') {
            spawnShootingStar();
        }
    });

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Ambient Floating Particles
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 105) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.07 * (1 - dist / 105)})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }

        // 2. Draw Fluid Glowing Comet Ribbon Trail (theo chuột)
        if (cometRibbon.length > 2) {
            ctx.save();
            for (let i = cometRibbon.length - 1; i > 0; i--) {
                const pt = cometRibbon[i];
                const prevPt = cometRibbon[i - 1];
                pt.age++;

                const progress = pt.age / pt.life;
                if (progress >= 1) {
                    cometRibbon.splice(i, 1);
                    continue;
                }

                const alpha = (1 - progress) * 0.4;
                const lineWidth = pt.width * (1 - progress * 0.7);

                ctx.beginPath();
                ctx.moveTo(prevPt.x, prevPt.y);
                ctx.lineTo(pt.x, pt.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = lineWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 8 * (1 - progress);
                ctx.stroke();
            }
            ctx.restore();
        }

        // 3. Draw Sparkling Stardust Particles
        for (let i = stardustSparks.length - 1; i >= 0; i--) {
            const s = stardustSparks[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.94;
            s.vy *= 0.94;
            s.alpha -= s.decay;

            if (s.alpha <= 0) {
                stardustSparks.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
        }

        // 4. Draw & Update Shooting Stars (Sao Băng Đằng Sau)
        if (CONFIG.effects.enableShootingStars !== false) {
            if (Date.now() >= nextShootingStarTime) {
                spawnShootingStar();
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];
                star.x += star.vx;
                star.y += star.vy;
                star.alpha -= star.decay;

                // Loại bỏ sao băng khi đã mờ hoặc bay ra khỏi khung nhìn
                if (star.alpha <= 0 || star.x > width + 450 || star.y > height + 450) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                // Phát sinh bụi sao lấp lánh dọc theo đường bay
                star.sparkTimer++;
                if (star.sparkTimer % 2 === 0) {
                    stardustSparks.push({
                        x: star.x - (star.vx * 0.25) + (Math.random() - 0.5) * 6,
                        y: star.y - (star.vy * 0.25) + (Math.random() - 0.5) * 6,
                        vx: (Math.random() - 0.5) * 1.2,
                        vy: (Math.random() - 0.5) * 1.2,
                        size: Math.random() * 2.0 + 0.8,
                        alpha: star.alpha * 0.9,
                        decay: Math.random() * 0.035 + 0.02
                    });
                }

                // Tọa độ đuôi sao băng
                const angle = Math.atan2(star.vy, star.vx);
                const tailX = star.x - Math.cos(angle) * star.length;
                const tailY = star.y - Math.sin(angle) * star.length;

                ctx.save();

                // Dải gradient phát quang từ đuôi mờ dần về đầu sáng rực
                const tailGrad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
                tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
                tailGrad.addColorStop(0.5, `rgba(255, 255, 255, ${star.alpha * 0.25})`);
                tailGrad.addColorStop(0.85, `rgba(255, 255, 255, ${star.alpha * 0.75})`);
                tailGrad.addColorStop(1, `rgba(255, 255, 255, ${star.alpha})`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(star.x, star.y);
                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = star.width;
                ctx.lineCap = 'round';
                ctx.shadowColor = star.glowHue;
                ctx.shadowBlur = 16;
                ctx.stroke();

                // Tâm đầu sao băng rực sáng lấp lánh
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.width * 1.3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 22;
                ctx.fill();

                ctx.restore();
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ====================================================================
   7. DISCORD REALTIME PRESENCE (Lanyard WebSocket & REST)
   ==================================================================== */
let spotifyProgressInterval = null;

function initLanyardRealtime() {
    if (!CONFIG.discordId || !/^\d{17,20}$/.test(CONFIG.discordId)) {
        const statusDot = document.querySelector('.status-dot');
        const headerStatusText = document.getElementById('header-status-text');
        const customStatusEmoji = document.getElementById('custom-status-emoji');
        const customStatusText = document.getElementById('custom-status-text');

        if (statusDot) statusDot.className = 'status-dot idle';
        if (headerStatusText) headerStatusText.textContent = 'DISCORD • STANDBY';
        if (customStatusEmoji) customStatusEmoji.innerHTML = '⚙️';
        if (customStatusText) customStatusText.innerHTML = 'Cần ID Discord dạng số (18-19 số) & tham gia <a href="https://discord.gg/lanyard" target="_blank" style="color:#ffffff;text-decoration:underline;font-weight:700;">discord.gg/lanyard</a>';
        return;
    }

    connectLanyardWebSocket();
}

function connectLanyardWebSocket() {
    const ws = new WebSocket('wss://api.lanyard.rest/socket');
    let heartbeatInterval = null;

    ws.onopen = () => {
        // Subscribe to Discord User ID
        ws.send(JSON.stringify({
            op: 2,
            d: {
                subscribe_to_id: CONFIG.discordId
            }
        }));
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const { op, t, d } = data;

            // Opcode 1: Hello from Lanyard -> start heartbeat
            if (op === 1) {
                const interval = d.heartbeat_interval;
                heartbeatInterval = setInterval(() => {
                    ws.send(JSON.stringify({ op: 3 }));
                }, interval);
            }

            // Presence update event
            if (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE') {
                updateDiscordPresenceUI(d);
            }
        } catch (e) {
            console.error('Lanyard WS parse error:', e);
        }
    };

    ws.onerror = () => {
        fetchLanyardREST();
    };

    ws.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        // Fallback to REST polling if WebSocket disconnects
        setTimeout(fetchLanyardREST, 5000);
    };
}

async function fetchLanyardREST() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${CONFIG.discordId}`);
        if (res.status === 404) {
            setMockDiscordState(true);
            setTimeout(fetchLanyardREST, 4000);
            return;
        }
        const json = await res.json();
        if (json && json.success && json.data) {
            updateDiscordPresenceUI(json.data);
        } else {
            setMockDiscordState(true);
            setTimeout(fetchLanyardREST, 4000);
        }
    } catch (e) {
        setMockDiscordState(false);
        setTimeout(fetchLanyardREST, 5000);
    }
}

function updateDiscordPresenceUI(data) {
    if (!data) return;

    const { discord_user, discord_status, activities, listening_to_spotify, spotify } = data;

    // 1. Update Avatar (preserve custom avatar if set)
    const avatarEl = document.getElementById('profile-avatar');
    if (avatarEl) {
        if (CONFIG.profile.avatar) {
            avatarEl.src = CONFIG.profile.avatar;
        } else if (discord_user && discord_user.avatar) {
            const isGif = discord_user.avatar.startsWith('a_');
            const ext = isGif ? 'gif' : 'png';
            avatarEl.src = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.${ext}?size=256`;
        }
    }

    // 2. Update Status Dot & Top Banner Status
    const statusDot = document.querySelector('.status-dot');
    const headerStatusText = document.getElementById('header-status-text');

    if (statusDot) {
        statusDot.className = `status-dot ${discord_status}`;
    }

    if (headerStatusText) {
        headerStatusText.textContent = `DISCORD • ${discord_status.toUpperCase()}`;
    }

    // 3. Custom Status (activity type 4)
    const customStatus = activities ? activities.find(a => a.type === 4) : null;
    const customStatusEmoji = document.getElementById('custom-status-emoji');
    const customStatusText = document.getElementById('custom-status-text');

    if (customStatus) {
        let emoji = '💬';
        if (customStatus.emoji) {
            if (customStatus.emoji.id) {
                emoji = `<img src="https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.png" style="width:20px;height:20px;vertical-align:middle;">`;
            } else if (customStatus.emoji.name) {
                emoji = customStatus.emoji.name;
            }
        }
        if (customStatusEmoji) customStatusEmoji.innerHTML = emoji;
        if (customStatusText) customStatusText.textContent = customStatus.state || 'Online on Discord';
    } else {
        if (customStatusEmoji) customStatusEmoji.textContent = '⚡';
        if (customStatusText) customStatusText.textContent = `Status: ${discord_status.toUpperCase()} • Available`;
    }

    // 4. Spotify Live Activity
    const spotifyCard = document.getElementById('spotify-card');
    const spotifyArt = document.getElementById('spotify-album-art');
    const spotifyTrack = document.getElementById('spotify-track');
    const spotifyArtist = document.getElementById('spotify-artist');
    const spotifyTimeCurrent = document.getElementById('spotify-time-current');
    const spotifyTimeTotal = document.getElementById('spotify-time-total');
    const spotifyProgressFill = document.getElementById('spotify-progress-fill');

    if (spotifyProgressInterval) clearInterval(spotifyProgressInterval);

    if (listening_to_spotify && spotify) {
        if (spotifyCard) spotifyCard.style.display = 'flex';
        if (spotifyArt) spotifyArt.src = spotify.album_art_url;
        if (spotifyTrack) spotifyTrack.textContent = spotify.song;
        if (spotifyArtist) spotifyArtist.textContent = `by ${spotify.artist}`;

        const duration = spotify.timestamps.end - spotify.timestamps.start;
        if (spotifyTimeTotal) spotifyTimeTotal.textContent = formatMs(duration);

        function updateProgress() {
            const elapsed = Date.now() - spotify.timestamps.start;
            const clamped = Math.max(0, Math.min(elapsed, duration));
            const pct = (clamped / duration) * 100;

            if (spotifyTimeCurrent) spotifyTimeCurrent.textContent = formatMs(clamped);
            if (spotifyProgressFill) spotifyProgressFill.style.width = `${pct}%`;

            if (elapsed >= duration) {
                clearInterval(spotifyProgressInterval);
            }
        }

        updateProgress();
        spotifyProgressInterval = setInterval(updateProgress, 1000);
    } else {
        if (spotifyCard) spotifyCard.style.display = 'none';
    }

    // 5. Game / Other Activity (type 0, 1, 2, 3, 5)
    const gameActivity = activities ? activities.find(a => a.type !== 4) : null;
    const gameCard = document.getElementById('game-card');
    const gameArt = document.getElementById('game-art');
    const gameName = document.getElementById('game-name');
    const gameState = document.getElementById('game-state');
    const gameDetails = document.getElementById('game-details-text');
    const gameBadge = document.getElementById('game-badge');

    if (gameActivity) {
        if (gameCard) gameCard.style.display = 'flex';
        if (gameName) gameName.textContent = gameActivity.name;
        if (gameState) gameState.textContent = gameActivity.state || 'Active now';
        if (gameDetails) gameDetails.textContent = gameActivity.details || '';

        // Resolve Image
        if (gameArt) {
            if (gameActivity.assets && gameActivity.assets.large_image) {
                let imgUrl = gameActivity.assets.large_image;
                if (imgUrl.startsWith('mp:external/')) {
                    imgUrl = 'https://media.discordapp.net/' + imgUrl.replace('mp:', '');
                } else if (gameActivity.application_id) {
                    imgUrl = `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${imgUrl}.png`;
                }
                gameArt.src = imgUrl;
                gameArt.style.display = 'block';
            } else {
                gameArt.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop';
            }
        }

        if (gameBadge) {
            let label = 'PLAYING GAME';
            let icon = 'fa-gamepad';
            if (gameActivity.name.toLowerCase().includes('visual studio code') || gameActivity.name.toLowerCase().includes('code')) {
                label = 'DEVELOPING';
                icon = 'fa-code';
            } else if (gameActivity.type === 2) {
                label = 'LISTENING';
                icon = 'fa-headphones';
            } else if (gameActivity.type === 3) {
                label = 'STREAMING / WATCHING';
                icon = 'fa-video';
            }
            gameBadge.innerHTML = `<i class="fa-solid ${icon}"></i> ${label}`;
        }
    } else {
        if (gameCard) gameCard.style.display = 'none';
    }
}

function setMockDiscordState(is404 = false) {
    const statusDot = document.querySelector('.status-dot');
    const headerStatusText = document.getElementById('header-status-text');
    const customStatusEmoji = document.getElementById('custom-status-emoji');
    const customStatusText = document.getElementById('custom-status-text');
    const gameCard = document.getElementById('game-card');
    const gameArt = document.getElementById('game-art');
    const gameBadge = document.getElementById('game-badge');
    const gameName = document.getElementById('game-name');
    const gameState = document.getElementById('game-state');
    const gameDetailsText = document.getElementById('game-details-text');

    if (statusDot) statusDot.className = 'status-dot online';
    if (headerStatusText) headerStatusText.textContent = 'DISCORD • ONLINE';

    if (customStatusEmoji) customStatusEmoji.innerHTML = '⚡';
    if (customStatusText) {
        customStatusText.innerHTML = `Building next-gen digital experiences & sleek web apps 🚀`;
    }

    if (gameCard) {
        gameCard.style.display = 'flex';
        if (gameArt) gameArt.src = 'https://assets.stickpng.com/images/62a9d46006f0e4d023498ebc.png';
        if (gameBadge) gameBadge.innerHTML = `<i class="fa-solid fa-code"></i> RICH ACTIVITY`;
        if (gameName) gameName.textContent = 'Visual Studio Code';
        if (gameState) gameState.textContent = 'Editing config.js';
        if (gameDetailsText) gameDetailsText.textContent = 'Workspace: BioProfile • In The Zone';
    }
}

function formatMs(ms) {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/* ====================================================================
   8. REALTIME CLOCK IN FOOTER
   ==================================================================== */
function initLocalClock() {
    const clockEl = document.getElementById('local-time');
    if (!clockEl) return;

    function updateClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        clockEl.textContent = `${timeStr} (GMT+7)`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* ====================================================================
   9. TOAST NOTIFICATIONS & AUDIO EFFECTS
   ==================================================================== */
function showToast(message, icon = 'fa-solid fa-circle-check') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}

function playBeepSound(freq = 520, duration = 0.08) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        // Silent catch for audio context restrictions
    }
}

/* ====================================================================
   SKILL VIEW SWITCHER (skillWap & skillPc)
   ==================================================================== */
function switchSkillView(mode) {
    const wapImg = document.getElementById('skillWap');
    const pcImg = document.getElementById('skillPc');
    const wapBtn = document.getElementById('tab-skill-wap');
    const pcBtn = document.getElementById('tab-skill-pc');

    if (mode === 'pc') {
        if (wapImg) wapImg.style.setProperty('display', 'none', 'important');
        if (pcImg) pcImg.style.setProperty('display', 'block', 'important');
        if (pcBtn) pcBtn.classList.add('active');
        if (wapBtn) wapBtn.classList.remove('active');
    } else {
        if (wapImg) wapImg.style.setProperty('display', 'block', 'important');
        if (pcImg) pcImg.style.setProperty('display', 'none', 'important');
        if (wapBtn) wapBtn.classList.add('active');
        if (pcBtn) pcBtn.classList.remove('active');
    }
}
window.switchSkillView = switchSkillView;

/* ====================================================================
   REAL-TIME CLOUD VISITOR COUNTER (Đếm Lượt Xem Thực Tế Qua Cloud API)
   ==================================================================== */
async function initViewCounter() {
    const counterKey = (CONFIG.counter && CONFIG.counter.key) || 'tminkk_bioprofile';
    const baseUrl = 'https://countapi.mileshilliard.com/api/v1';

    const viewEl = document.getElementById('view-count');
    const viewBannerEl = document.getElementById('view-count-banner');

    function updateDisplays(count) {
        if (typeof count === 'undefined' || isNaN(count)) return;
        const formatted = Number(count).toLocaleString();
        if (viewEl) viewEl.textContent = formatted;
        if (viewBannerEl) viewBannerEl.textContent = formatted;
    }

    try {
        // Chỉ đếm +1 lần đầu tiên cho mỗi phiên trình duyệt (tránh F5 spam lượt xem ảo)
        const hasCounted = sessionStorage.getItem('tminkk_session_counted');
        const endpoint = hasCounted ? `${baseUrl}/get/${counterKey}` : `${baseUrl}/hit/${counterKey}`;

        const res = await fetch(endpoint);
        if (res.ok) {
            const data = await res.json();
            if (data && typeof data.value !== 'undefined') {
                updateDisplays(data.value);
                sessionStorage.setItem('tminkk_session_counted', 'true');
            }
        }
    } catch (err) {
        console.warn('Realtime Counter API unreachable, using cached value.');
    }

    // Tự động kiểm tra và cập nhật thời gian thực mỗi 15 giây (nếu có khách khác ghé thăm)
    setInterval(async () => {
        try {
            const res = await fetch(`${baseUrl}/get/${counterKey}`);
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data.value !== 'undefined') {
                    updateDisplays(data.value);
                }
            }
        } catch (e) {}
    }, 15000);
}

/* ====================================================================
   AVATAR INTERACTIVE BURST FX (Click avatar for magical sparkles)
   ==================================================================== */
function initAvatarInteractiveFX() {
    const avatarWrapper = document.getElementById('avatar-wrapper');
    const cuteAvatar = document.querySelector('.cute-avatar-wrap');

    function triggerSparkleBurst(e, element) {
        playBeepSound(784, 0.08);
        setTimeout(() => playBeepSound(1046, 0.1), 80);

        if (element) {
            element.classList.remove('avatar-spark-pop');
            void element.offsetWidth; // trigger reflow
            element.classList.add('avatar-spark-pop');
        }

        const rect = (element || document.body).getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;

        if (typeof stardustSparks !== 'undefined') {
            for (let i = 0; i < 20; i++) {
                const angle = (Math.PI * 2 / 20) * i;
                const speed = Math.random() * 4 + 2.5;
                stardustSparks.push({
                    x: originX,
                    y: originY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: Math.random() * 3.5 + 1.5,
                    alpha: 1,
                    decay: Math.random() * 0.02 + 0.02
                });
            }
        }

        showToast('✨ Tm1nkk Sanctuary Sparkle Aura! 💖', 'fa-solid fa-wand-magic-sparkles');
    }

    if (avatarWrapper) {
        avatarWrapper.addEventListener('click', (e) => triggerSparkleBurst(e, avatarWrapper));
    }
    if (cuteAvatar) {
        cuteAvatar.addEventListener('click', (e) => triggerSparkleBurst(e, cuteAvatar));
    }
}

/* ====================================================================
   1. CYBER THEME SWITCHER (4 VIBE PRESETS)
   ==================================================================== */
const THEMES = [
    { id: 'purple', name: 'SANCTUARY', class: '', rgb: { r: 192, g: 132, b: 252 } },
    { id: 'matrix', name: 'MATRIX', class: 'theme-matrix', rgb: { r: 34, g: 197, b: 94 } },
    { id: 'crimson', name: 'BLOODMOON', class: 'theme-crimson', rgb: { r: 239, g: 68, b: 68 } },
    { id: 'cyan', name: 'CYBERICE', class: 'theme-cyan', rgb: { r: 6, g: 182, b: 212 } }
];
let currentThemeIndex = 0;

function getActiveThemeColor() {
    return THEMES[currentThemeIndex].rgb;
}

function applyTheme(index, notify = false) {
    currentThemeIndex = (index + THEMES.length) % THEMES.length;
    const theme = THEMES[currentThemeIndex];

    THEMES.forEach(t => { if (t.class) document.body.classList.remove(t.class); });
    if (theme.class) document.body.classList.add(theme.class);

    const labelEl = document.getElementById('current-theme-name');
    if (labelEl) labelEl.textContent = theme.name;

    localStorage.setItem('tm1nkk_theme_index', currentThemeIndex);

    if (notify) {
        showToast(`🎨 Vibe Changed: ${theme.name}`, 'fa-solid fa-palette');
    }
}

function initThemeSwitcher() {
    const saved = localStorage.getItem('tm1nkk_theme_index');
    if (saved !== null) {
        applyTheme(parseInt(saved, 10), false);
    }

    const themeBtn = document.getElementById('theme-switch-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            applyTheme(currentThemeIndex + 1, true);
        });
    }
}

/* ====================================================================
   2. DEVELOPER SPECS & WORKSPACE SYNC
   ==================================================================== */
function initDevSpecs() {
    if (!CONFIG.specs) return;
    const ideEl = document.getElementById('spec-ide');
    const envEl = document.getElementById('spec-env');
    const specialtyEl = document.getElementById('spec-specialty');
    const statusEl = document.getElementById('spec-status');
    const focusEl = document.getElementById('spec-focus');

    if (ideEl && CONFIG.specs.ide) ideEl.textContent = CONFIG.specs.ide;
    if (envEl && CONFIG.specs.environment) envEl.textContent = CONFIG.specs.environment;
    if (specialtyEl && CONFIG.specs.specialty) specialtyEl.textContent = CONFIG.specs.specialty;
    if (statusEl && CONFIG.specs.status) statusEl.innerHTML = `<i class="fa-solid fa-circle"></i> ${CONFIG.specs.status}`;
    if (focusEl && CONFIG.specs.focus) focusEl.textContent = CONFIG.specs.focus;
}



