(function() {
    'use strict';

    // Функция, добавляющая кнопку-переключатель источников в шапку
    function addSourceSwitcher() {
        // Задаем список источников (имена должны совпадать с тем, как Lampa их обрабатывает)
        var sources = ['cub', 'tmdb', 'avia'];
        // Определяем логотипы для источников. Для avia используется внешний SVG
        var logos = {
            cub: '<svg width="110" height="39" viewBox="0 0 110 39" fill="currentColor" xmlns="http://www.w3.org/2000/svg">...Ваш SVG-код для Каб...</svg>',
            tmdb: '<svg width="161" height="37" viewBox="0 0 161 37" fill="currentColor" xmlns="http://www.w3.org/2000/svg">...Ваш SVG-код для TMDB...</svg>',
            avia: '<img src="https://raw.githubusercontent.com/ARST113/M.S.I./refs/heads/main/AVIA.svg" alt="AVIA" style="max-height: 24px;">'
        };

        // Получаем текущий источник из Storage или устанавливаем первый по умолчанию
        var currentSource = Lampa.Storage.get('source') || sources[0];
        var currentIndex = sources.indexOf(currentSource);
        if (currentIndex === -1) {
            currentIndex = 0;
            currentSource = sources[0];
            Lampa.Storage.set('source', currentSource);
        }

        // Создаем элемент кнопки-переключателя
        var switcher = $('<div>', {
            'class': 'head__action selector source-switch',
            'style': 'position: relative; margin-right: 10px;',
            'html': '<div class="source-logo" style="text-align: center;">' + logos[currentSource] + '</div>'
        });

        // Определяем контейнер шапки: попробуйте сначала .head__actions, если его нет – .header__actions
        var headerActions = $('.head__actions');
        if (headerActions.length === 0) {
            headerActions = $('.header__actions');
        }
        if (headerActions.length === 0) {
            console.error("Контейнер шапки не найден");
            return;
        }
        headerActions.prepend(switcher);

        // Обновляем отображение логотипа для следующего источника
        var nextIndex = (currentIndex + 1) % sources.length;
        var nextLogo = logos[sources[nextIndex]];
        switcher.find('.source-logo').html(nextLogo);

        // Обработчик события (в Lampa используется событие "hover:enter" вместо клика)
        switcher.on('hover:enter', function() {
            currentIndex = (currentIndex + 1) % sources.length;
            var selectedSource = sources[currentIndex];
            Lampa.Storage.set('source', selectedSource);

            // Обновляем логотип на кнопке для следующего источника
            var nextLogo = logos[sources[(currentIndex + 1) % sources.length]];
            switcher.find('.source-logo').html(nextLogo);

            // Вызываем замену Activity для полноценного переключения источника
            Lampa.Activity.replace({
                source: selectedSource,
                title: 'Lampa - ' + selectedSource.toUpperCase()
            });
        });
    }

    // Инициализация плагина после готовности приложения
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

    // Манифест плагина (опционально, для отображения в списке плагинов)
    var manifest = {
        type: "other",
        version: "1.0",
        author: "YourName",
        name: "Source Switcher",
        description: "Переключатель источников: Каб (cub), TMDB и AVIAMOVI (avia)"
    };

    if (typeof Lampa !== 'undefined' && Lampa.Manifest) {
        Lampa.Manifest.plugins = Lampa.Manifest.plugins || [];
        Lampa.Manifest.plugins.push(manifest);
    }

    // Запуск плагина
    initPlugin();
})();
