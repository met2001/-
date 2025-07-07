function msToTime(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    async function updateSpotifyWidget() {
      const res = await fetch("https://api.lanyard.rest/v1/users/182963955130564608");
      const data = await res.json();

      const widget = document.getElementById("spotify-widget");
      const songTitle = document.getElementById("song-title");
      const artistName = document.getElementById("artist-name");
      const albumArt = document.getElementById("album-art");
      const progress = document.getElementById("progress");
      const currentTimeEl = document.getElementById("current-time");
      const totalTimeEl = document.getElementById("total-time");

      if (data?.data?.listening_to_spotify) {
        const s = data.data.spotify;
        widget.style.display = "flex";
        songTitle.textContent = s.song;
        artistName.textContent = s.artist;
        albumArt.src = s.album_art_url;

        const now = Date.now();
        const total = s.timestamps.end - s.timestamps.start;
        const current = now - s.timestamps.start;
        const percent = Math.min((current / total) * 100, 100);
        console.log(percent);
        progress.style.width = `${percent}%`;
        progress.style.color = "green";
        currentTimeEl.textContent = msToTime(current);
        totalTimeEl.textContent = msToTime(total);
      } else {
        albumArt.src = "./assets/default.jpeg";
      }
    }

    updateSpotifyWidget();
    setInterval(updateSpotifyWidget, 1000);