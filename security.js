/**
 * ====================================================================
 *                 GIA BAO BIO - OPTIONAL SECURITY SHIELD
 * ====================================================================
 * Tính năng bảo vệ trang web (chống chuột phải, phím tắt F12, v.v.).
 * Được cấu hình bật/tắt trong file config.js: CONFIG.security.enabled
 */

(function () {
    'use strict';

    window.addEventListener('load', function () {
        if (typeof CONFIG === 'undefined' || !CONFIG.security || !CONFIG.security.enabled) {
            return; // Bảo vệ đã tắt trong config.js
        }

        let lastToastTime = 0;
        function showNotice(msg) {
            const now = Date.now();
            if (now - lastToastTime < 2000) return;
            lastToastTime = now;

            let container = document.getElementById('toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'toast-container';
                document.body.appendChild(container);
            }

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.style.borderColor = 'rgba(239, 68, 68, 0.45)';
            toast.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.25)';
            toast.innerHTML = `<i class="fa-solid fa-shield-halved" style="color:#ef4444;"></i> <span style="color:#fecaca;">${msg || 'Thao tác bị vô hiệu hóa để bảo vệ bản quyền!'}</span>`;
            container.appendChild(toast);

            setTimeout(function () {
                toast.classList.add('toast-out');
                setTimeout(function () { toast.remove(); }, 400);
            }, 2200);
        }

        if (CONFIG.security.blockContextMenu) {
            window.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                showNotice('Chuột phải đã bị vô hiệu hóa!');
                return false;
            }, true);
        }

        if (CONFIG.security.blockDevTools || CONFIG.security.blockInspect) {
            window.addEventListener('keydown', function (e) {
                const key = e.key ? e.key.toUpperCase() : '';
                const keyCode = e.keyCode || e.which;
                const ctrlOrMeta = e.ctrlKey || e.metaKey;
                const shift = e.shiftKey;

                if (keyCode === 123 || key === 'F12') {
                    e.preventDefault();
                    showNotice('Phím F12 đã bị vô hiệu hóa!');
                    return false;
                }
                if (ctrlOrMeta && shift && (keyCode === 73 || key === 'I')) {
                    e.preventDefault();
                    showNotice('Inspect đã bị chặn!');
                    return false;
                }
                if (ctrlOrMeta && shift && (keyCode === 74 || key === 'J')) {
                    e.preventDefault();
                    showNotice('Console đã bị chặn!');
                    return false;
                }
                if (ctrlOrMeta && (keyCode === 85 || key === 'U')) {
                    e.preventDefault();
                    showNotice('Xem mã nguồn đã bị chặn!');
                    return false;
                }
            }, true);
        }
    });
})();
