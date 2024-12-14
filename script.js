async function downloadVideo() {
            const url = document.getElementById('url').value.trim();
            const message = document.getElementById('message');

            if (!url) {
                message.textContent = "Masukkan tautan TikTok terlebih dahulu!";
                return;
            }

            message.textContent = "Memproses... Silakan tunggu.";

            try {
                const response = await axios.post('https://tikwm.com/api/', {
                    url: url,
                    hd: 1
                });

                const videoData = response.data.data;

                if (videoData && videoData.play) {
                    const videoUrl = videoData.play;
                    const a = document.createElement('a');
                    a.href = videoUrl;
                    a.download = "tiktok-video.mp4";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    message.textContent = "Video berhasil diunduh!";
                } else {
                    throw new Error("Data video tidak ditemukan.");
                }
            } catch (error) {
                console.error(error);
                message.textContent = "Terjadi kesalahan. Pastikan tautan valid dan coba lagi.";
            }
        }