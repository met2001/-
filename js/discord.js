async function fetchPresence() {
      const res = await fetch("https://api.lanyard.rest/v1/users/182963955130564608");
      const { data } = await res.json();

      const statusColors = {
        online: "bg-green-500",
        idle: "bg-yellow-500",
        dnd: "bg-red-500",
        offline: "bg-gray-500"
      };

      const avatarUrl = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;
      const spotify = data.spotify;
      const statusDot = statusColors[data.discord_status] || "bg-gray-500";

      const activitiesHtml = data.activities
        .filter(act => act.type === 0)
        .map(act => `
          <div class="bg-zinc-700 rounded-xl p-3 mb-2 popout">
            <p class="font-semibold text-white">${act.name}</p>
            <p class="text-sm text-zinc-300">${act.details || "No details"}</p>
          </div>
        `).join("");

      document.getElementById("widget").innerHTML = `
        <div class="flex items-center space-x-5 popout snap-center">
          <img src="${avatarUrl}" alt="Avatar" class="w-16 h-16 rounded-full border-2 border-white">
          <div>
            <div class="flex items-center space-x-2">
              <h2 class="text-xl font-bold">${data.discord_user.display_name}</h2>
              <span class="w-3 h-3 rounded-full ${statusDot}"></span>
            </div>
            <p class="text-sm text-zinc-400">@${data.discord_user.username}</p>
          </div>
        </div>

        ${spotify ? `
          <div class="bg-zinc-700 rounded-xl p-4 flex space-x-4 items-center popout">
            <img src="${spotify.album_art_url}" alt="Album Art" class="w-16 h-16 rounded-md">
            <div>
              <p class="font-semibold text-white">${spotify.song}</p>
              <p class="text-sm text-zinc-300">${spotify.artist} • ${spotify.album}</p>
              <a href="https://open.spotify.com/track/${spotify.track_id}" target="_blank" class="text-sm text-green-400 hover:underline">Listen on Spotify</a>
            </div>
          </div>
        ` : ''}

        ${activitiesHtml ? `
          <div class="popout">
            <h3 class="text-lg font-semibold mb-1">Active Apps</h3>
            ${activitiesHtml}
          </div>
        ` : ''}
      `;
    }

    fetchPresence();
    setInterval(fetchPresence, 10000);

    // Initialize tilt AFTER the page has loaded and scripts have rendered the widget
    $(document).ready(() => {
      $("[data-tilt]").tilt({
        maxTilt: 15,
        perspective: 1000,
        scale: 1.05,
        speed: 400,
        glare: true,
        "max-glare": 0.2
      });
    });