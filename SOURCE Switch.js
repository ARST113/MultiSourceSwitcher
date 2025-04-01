(function () {
    'use strict';

    // Основная функция плагина переключения источников
    function main$2() {
        // Базовый список источников, который может расширяться в зависимости от настроек
        var allSources = ['tmdb', 'cub'];
        // Объект с логотипами для источников.
        // Для базовых источников (tmdb и cub) используем SVG из оригинального плагина,
        // для новых источников – ссылки на изображения, которые вы предоставили.
        var logos = {
            tmdb: "<svg width=\"161\" height=\"37\" viewBox=\"0 0 161 37\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M10.0846 35.8986H17.8727V7.01351H27.9572V0H0V6.99324H10.0846V35.8986ZM38.1417 35.8986H45.9298V8.36149H46.0296L54.9659 35.8784H60.9568L70.1927 8.36149H70.2925V35.8784H78.0806V0H66.3485L58.1611 23.4122H58.0612L49.9237 0H38.1417V35.8986ZM89.0039 0.121622H100.686C103.406 0.125865 106.115 0.466206 108.754 1.13514C111.157 1.7138 113.421 2.77522 115.414 4.25676C117.34 5.72744 118.892 7.64602 119.937 9.85135C121.118 12.4714 121.689 15.3326 121.604 18.2128C121.658 20.8662 121.104 23.4961 119.987 25.8953C118.946 28.0542 117.453 29.9565 115.613 31.4696C113.73 33.0023 111.579 34.1611 109.273 34.8851C106.835 35.6708 104.292 36.064 101.734 36.0507H89.0039V0.121622ZM96.792 28.7027H100.786C102.466 28.7143 104.141 28.5273 105.778 28.1453C107.239 27.8443 108.621 27.2329 109.832 26.3513C110.988 25.4631 111.908 24.2961 112.508 22.9561C113.209 21.335 113.55 19.5772 113.506 17.8074C113.536 16.2216 113.194 14.6514 112.508 13.2264C111.885 11.9635 110.987 10.8612 109.882 10.0034C108.733 9.13749 107.437 8.49491 106.058 8.10811C104.537 7.67642 102.964 7.46152 101.385 7.46959H96.792V28.7027ZM132.887 0.121622H146.067C147.613 0.122387 149.158 0.234152 150.69 0.456081C152.142 0.647089 153.551 1.09291 154.853 1.77365C156.07 2.41433 157.102 3.36414 157.849 4.5304C158.677 5.95358 159.076 7.59212 158.997 9.24324C159.065 11.0819 158.473 12.883 157.329 14.3108C156.163 15.6827 154.625 16.6765 152.906 17.1689V17.2297C154.012 17.39 155.084 17.7323 156.081 18.2432C157.002 18.7125 157.831 19.3479 158.528 20.1182C159.218 20.8897 159.75 21.7922 160.095 22.7736C160.467 23.8129 160.653 24.9112 160.644 26.0169C160.704 27.6822 160.288 29.3295 159.446 30.7601C158.663 32.0054 157.603 33.0468 156.351 33.8007C155.035 34.6026 153.593 35.1683 152.087 35.473C150.535 35.8108 148.952 35.9807 147.365 35.9797H132.887V0.121622ZM140.675 14.4628H146.316C146.914 14.4661 147.511 14.3981 148.094 14.2601C148.651 14.1373 149.182 13.9142 149.661 13.6014C150.129 13.2951 150.516 12.8776 150.789 12.3851C151.082 11.8239 151.226 11.1955 151.209 10.5608C151.241 9.91579 151.088 9.27513 150.769 8.71622C150.46 8.2373 150.038 7.8438 149.541 7.57095C148.985 7.28738 148.389 7.09253 147.774 6.99324C147.165 6.87376 146.547 6.81268 145.927 6.81081H140.635L140.675 14.4628ZM140.675 29.3108H147.664C148.279 29.3125 148.892 29.2445 149.491 29.1081C150.087 28.9843 150.654 28.7433 151.159 28.3986C151.663 28.0612 152.083 27.6103 152.387 27.0811C152.715 26.4768 152.877 25.7943 152.856 25.1047C152.883 24.3773 152.664 23.6623 152.237 23.0777C151.818 22.5517 151.276 22.1405 150.66 21.8818C150.02 21.6112 149.349 21.4239 148.663 21.3243C147.985 21.2266 147.301 21.1758 146.616 21.1723H140.725L140.675 29.3108Z\" fill=\"currentColor\"/></svg>",
            pub: "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M16 22.6666C19.6819 22.6666 22.6666 19.6818 22.6666 15.9999C22.6666 12.318 19.6819 9.33325 16 9.33325C12.3181 9.33325 9.33331 12.318 9.33331 15.9999C9.33331 19.6818 12.3181 22.6666 16 22.6666Z\" fill=\"currentColor\"/> <path d=\"M8.66665 9.99992C9.40303 9.99992 9.99998 9.40297 9.99998 8.66659C9.99998 7.93021 9.40303 7.33325 8.66665 7.33325C7.93027 7.33325 7.33331 7.93021 7.33331 8.66659C7.33331 9.40297 7.93027 9.99992 8.66665 9.99992Z\" fill=\"currentColor\"/> <path d=\"M9.33331 16H16L9.33331 29.3333V16Z\" fill=\"currentColor\"/> <path d=\"M16 18C17.1046 18 18 17.1046 18 16C18 14.8954 17.1046 14 16 14C14.8954 14 14 14.8954 14 16C14 17.1046 14.8954 18 16 18Z\" fill=\"currentColor\"/> </svg>",
            filmix: '<img src="https://goo.su/l1enT4" alt="Filmix" style="max-height:100%; max-width:100%;">',
            // Новые источники, для которых используем предоставленные ссылки
            kinopoisk: '<img src="https://goo.su/HTPZ8KN" alt="Kinopoisk" style="max-height:100%; max-width:100%;">',
            aviamovie: '<img src="https://goo.su/7hIi94" alt="Aviamovie" style="max-height:100%; max-width:100%;">'
        };

        // В зависимости от настроек плагина MovieEnhancer, расширяем список источников.
        var sources = allSources.slice(0, 2); // По умолчанию берем первые два источника
        if (Lampa.Storage.get('lme_switchsource_modss') === true) {
            sources.push.apply(sources, ['pub', 'filmix']);
        }
        if (Lampa.Storage.get('lme_switchsource_lmenc') === true) {
            sources.push('TMDBs');
        }
        // Добавляем новые источники, если их нет
        if (sources.indexOf('kinopoisk') === -1) sources.push('kinopoisk');
        if (sources.indexOf('aviamovie') === -1) sources.push('aviamovie');

        // Получаем текущее значение источника из Storage
        var currentSource = Lampa.Storage.get('source');
        var currentSourceIndex = sources.indexOf(currentSource);
        if (currentSourceIndex === -1) {
            currentSourceIndex = 0;
            currentSource = sources[currentSourceIndex];
            Lampa.Storage.set('source', currentSource);
        }

        // Создаем новый div элемент для кнопки переключения источников
        var sourceDiv = $('<div>', {
            'class': 'head__action selector sources',
            'style': 'position: relative;',
            'html': "<div class=\"source-logo\" style=\"text-align: center;\"></div>"
        });

        // Добавляем новый элемент как первый дочерний элемент контейнера '.head__actions'
        $('.head__actions').prepend(sourceDiv);

        // Отображаем логотип следующего источника под кнопкой
        var nextSourceIndex = (currentSourceIndex + 1) % sources.length;
        var nextSourceLogo = logos[sources[nextSourceIndex]];
        sourceDiv.find('.source-logo').html(nextSourceLogo);

        // Обработчик события для переключения источника
        sourceDiv.on('hover:enter', function () {
            currentSourceIndex = (currentSourceIndex + 1) % sources.length;
            var selectedSource = sources[currentSourceIndex];
            Lampa.Storage.set('source', selectedSource);
            var nextLogo = logos[sources[(currentSourceIndex + 1) % sources.length]];
            sourceDiv.find('.source-logo').html(nextLogo);
            Lampa.Activity.replace({
                source: selectedSource,
                title: Lampa.Lang.translate("title_main") + ' - ' + selectedSource.toUpperCase()
            });
        });
    }

    // Инициализация плагина после загрузки приложения
    function addPlugin() {
        main$2();
    }

    if (!window.plugin_multi_source_switcher) {
        window.plugin_multi_source_switcher = true;
        if (window.appready) addPlugin();
        else {
            Lampa.Listener.follow("app", function (e) {
                if (e.type === "ready") addPlugin();
            });
        }
    }
})();
