(function() {
    'use strict';

    // Задаем список источников: 'cub' – Каб, 'tmdb' – TMDB, 'aviamovie' – AVIAMOVIE.
    var sources = ['cub', 'tmdb', 'aviamovie'];

    // Определяем логотипы для каждого источника.
    // Для 'cub' и 'tmdb' используем простой текст, для 'aviamovie' – внешний SVG.
    var logos = {
        cub: '<div style="color: white; font-weight: bold;">Kab</div>',
        tmdb: '<div style="color: white; font-weight: bold;">TMDB</div>',
        aviamovie: '<img src="https://raw.githubusercontent.com/ARST113/M.S.I./refs/heads/main/AVIA.svg" alt="AVIAMOVIE" style="max-height: 24px;">'
    };

    // Функция добавления переключателя источников в шапку
    function addSourceSwitcher() {
        // Получаем текущий источник из Storage или устанавливаем первый
        var currentSource = Lampa.Storage.get('source') || sources[0];
        var currentIndex = sources.indexOf(currentSource);
        if (currentIndex === -1) {
            currentIndex = 0;
            currentSource = sources[0];
            Lampa.Storage.set('source', currentSource);
        }

        // Создаем элемент переключателя
        var switcher = $('<div>', {
            'class': 'head__action selector source-switcher',
            'style': 'margin-right: 10px; position: relative; cursor: pointer;',
            'html': '<div class="source-logo" style="text-align: center;">' + logos[currentSource] + '</div>'
        });

        // Определяем контейнер шапки (в зависимости от сборки, это может быть .head__actions или .header__actions)
        var $header = $('.head__actions');
        if ($header.length === 0) {
            $header = $('.header__actions');
        }
        if ($header.length === 0) {
            console.error('Контейнер шапки не найден!');
            return;
        }
        $header.prepend(switcher);

        // Функция для обновления логотипа (показываем логотип следующего источника)
        function updateLogo() {
            var nextIndex = (currentIndex + 1) % sources.length;
            var nextLogo = logos[sources[nextIndex]] || sources[nextIndex].toUpperCase();
            switcher.find('.source-logo').html(nextLogo);
        }
        updateLogo();

        // Обработчик события (в Lampa используется "hover:enter" вместо стандартного клика)
        switcher.on('hover:enter', function() {
            currentIndex = (currentIndex + 1) % sources.length;
            var newSource = sources[currentIndex];
            Lampa.Storage.set('source', newSource);

            // Обновляем настройки (как в стандартном переключении)
            Lampa.Settings.update();

            updateLogo();

            // Вызываем замену Activity для полноценного обновления контента
            Lampa.Activity.replace({
                source: newSource,
                title: 'Lampa - ' + newSource.toUpperCase()
            });
        });
    }

    // Инициализируем плагин после готовности приложения
    function initPlugin() {
        if (window.appready) {
            addSourceSwitcher();
        } else {
            Lampa.Listener.follow('app', function(e) {
                if (e.type === 'ready') {
                    addSourceSwitcher();
                }
            });
        }
    }

    // Добавляем описание плагина в Manifest (опционально, для отображения в списке плагинов)
    var manifest = {
        type: 'other',
        version: '1.0.0',
        name: 'Source Switcher Extended',
        description: 'Переключает источники между Kab (cub), TMDB и AVIAMOVIE (aviamovie), вызывая Lampa.Settings.update() для полной синхронизации.',
        author: 'YourName'
    };
    if (typeof Lampa !== 'undefined' && Lampa.Manifest) {
        Lampa.Manifest.plugins = Lampa.Manifest.plugins || [];
        Lampa.Manifest.plugins.push(manifest);
    }

    // Запуск плагина
    initPlugin();
})();
