(function () {
    'use strict';

    function main() {
        const sources = ['cub', 'tmdb', 'kp', 'avia', 'filmix'];

        const logos = {
            cub: `<span style="font-weight:bold; font-size:14px;">CUB</span>`,
            tmdb: `<span style="font-weight:bold; font-size:14px;">TMDB</span>`,
            kp: `<img src="https://raw.githubusercontent.com/ARST113/M.S.I./refs/heads/main/KP.svg" style="height:20px;">`,
            avia: `<img src="https://raw.githubusercontent.com/ARST113/M.S.I./refs/heads/main/AVIA.svg" style="height:20px;">`,
            filmix: `<img src="https://raw.githubusercontent.com/ARST113/M.S.I./refs/heads/main/Filmix.svg" style="height:20px;">`
        };

        let currentIndex = sources.indexOf(Lampa.Storage.get('source'));
        if (currentIndex === -1) currentIndex = 0;

        const sourceDiv = $('<div>', {
            'class': 'head__action selector sources',
            'style': 'position: relative;',
            'html': `<div class="source-logo" style="text-align: center;"></div>`
        });

        $('.head__actions').prepend(sourceDiv);

        const updateLogo = () => {
            const nextIndex = (currentIndex + 1) % sources.length;
            const nextSource = sources[nextIndex];
            sourceDiv.find('.source-logo').html(logos[nextSource]);
        };

        updateLogo();

        sourceDiv.on('hover:enter', () => {
            currentIndex = (currentIndex + 1) % sources.length;
            const selectedSource = sources[currentIndex];

            Lampa.Storage.set('source', selectedSource);
            updateLogo();

            Lampa.Activity.replace({
                source: selectedSource,
                title: Lampa.Lang.translate("title_main") + ' - ' + selectedSource.toUpperCase()
            });
        });
    }

    if (window.appready) main();
    else {
        Lampa.Listener.follow("app", function (e) {
            if (e.type === "ready") main();
        });
    }
})();
