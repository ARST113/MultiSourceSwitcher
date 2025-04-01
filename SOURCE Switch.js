function main$2() {
  // Добавляем новый источник «avia» в массив источников
  var allSources = ['tmdb', 'cub', 'avia'];
  
  // Определяем логотипы для каждого источника. Для «avia» используем тег <img> с ссылкой на внешний SVG.
  var logos = {
    tmdb: "<svg width=\"161\" height=\"37\" viewBox=\"0 0 161 37\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"> ... </svg>",
    cub: "<svg width=\"110\" height=\"39\" viewBox=\"0 0 110 39\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"> ... </svg>",
    avia: "<img src=\"https://raw.githubusercontent.com/ARST113/M.S.I./refs/heads/main/AVIA.svg\" alt=\"AVIA\" style=\"max-height: 100%;\">",
    // Если нужно добавить и другие источники, их можно добавить здесь.
    TMDBs: "<svg width=\"161\" height=\"37\" viewBox=\"0 0 161 37\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"> ... </svg>",
    pub: "<svg width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> ... </svg>",
    filmix: "<svg width=\"160\" height=\"48\" viewBox=\"0 0 160 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> ... </svg>"
  };

  // Если включены дополнительные настройки источников, они могут добавляться динамически
  var sources = allSources.slice(0, 3); // здесь по умолчанию берём три источника: tmdb, cub и avia

  // Получаем текущее выбранное значение источника из Storage
  var currentSource = Lampa.Storage.get('source');
  var currentSourceIndex = sources.indexOf(currentSource);

  // Если текущий источник не найден, устанавливаем первое значение по умолчанию
  if (currentSourceIndex === -1) {
    currentSourceIndex = 0;
    currentSource = sources[currentSourceIndex];
    Lampa.Storage.set('source', currentSource);
  }

  // Создаем новый div элемент для отображения переключателя источников в шапке
  var sourceDiv = $('<div>', {
    'class': 'head__action selector sources',
    'style': 'position: relative;',
    'html': "<div class=\"source-logo\" style=\"text-align: center;\"></div>"
  });

  // Добавляем новый элемент первым дочерним элементом контейнера '.head__actions'
  $('.head__actions').prepend(sourceDiv);

  // Определяем следующий источник и его логотип для отображения под переключателем
  var nextSourceIndex = (currentSourceIndex + 1) % sources.length;
  var nextSourceLogo = logos[sources[nextSourceIndex]];
  sourceDiv.find('.source-logo').html(nextSourceLogo);

  // Добавляем обработчик события для переключения источника при нажатии
  sourceDiv.on('hover:enter', function () {
    currentSourceIndex = (currentSourceIndex + 1) % sources.length;
    var selectedSource = sources[currentSourceIndex];
    // Сохраняем выбранный источник в Storage
    Lampa.Storage.set('source', selectedSource);

    // Обновляем логотип для следующего источника
    var nextLogo = logos[sources[(currentSourceIndex + 1) % sources.length]];
    sourceDiv.find('.source-logo').html(nextLogo);

    // Перезагружаем контент с новым источником, вызывая замену активности
    Lampa.Activity.replace({
      source: selectedSource,
      title: Lampa.Lang.translate("title_main") + ' - ' + selectedSource.toUpperCase()
    });
  });
}
