(function() {
    'use strict';

    // Определяем список источников: 
    // 'cub' – Каб, 'tmdb' – TMDB, 'avia' – AVIAMOVI.
    var sources = ['cub', 'tmdb', 'avia'];

    // Логотипы для источников. Для простоты используем текст для "cub" и "tmdb", 
    // а для "avia" вставляем изображение из внешнего файла.
    var logos = {
        cub: '<div style="color: white; font-weight: bold;">Kab</div>',
        tmdb: '<div style="color: white; font-weight: bold;">TMDB</div>',
        avia: '<img src="https://raw.githubusercontent.com/ARST113/M.S.I./refs/heads/main/AVIA.svg" alt="AVIAMOVI" style="max-height: 24px;">'
    };

    // Функция для добавления кнопки переключателя в шапку
    function addSourceSwitcher() {
        // Получаем текущий источник из Storage или устанавливаем первый из списка
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
            'html': '<div class="source-logo" style="text-align:center;">' + logos[currentSource] + '</div>'
        });

        // Ищем контейнер для кнопок в шапке
        var $header = $('.head__actions');
        if ($header.length === 0) {
            $header = $('.header__actions');
        }
        if ($header.length === 0) {
            console.error('Контейнер шапки не найден!');
            return;
        }
        $header.prepend(switcher);

        // Функция для обновления отображаемого логотипа – показывается логотип следующего источника
        function updateLogo() {
            var nextIndex = (currentIndex + 1) % sources.length;
            var nextLogo = logos[sources[nextIndex]] || sources[nextIndex].toUpperCase();
            switcher.find('.source-logo').html(nextLogo);
        }
        updateLogo();

        // Обработчик события (в Lampa вместо клика используется событие "hover:enter")
        switcher.on('hover:enter', function() {
            currentIndex = (currentIndex + 1) % sources.length;
            var newSource = sources[currentIndex];
            Lampa.Storage.set('source', newSource);
            updateLogo();
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

    // (Необязательно) Добавляем описание плагина в Manifest, чтобы он отображался в списке плагинов
    var manifest = {
        type: 'other',
        version: '1.0.0',
        name: 'Source Switcher',
        description: 'Переключает источники между Kab (cub), TMDB и AVIAMOVI (avia)',
        author: 'YourName'
    };
    if (typeof Lampa !== 'undefined' && Lampa.Manifest) {
        Lampa.Manifest.plugins = Lampa.Manifest.plugins || [];
        Lampa.Manifest.plugins.push(manifest);
    }

    // Запуск плагина
    initPlugin();
})();
