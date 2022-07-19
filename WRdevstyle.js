(function() {
    'use strict';

    // サイト名に特定の文字列が入っていれば特定の背景色を適用する
    const devRegex = /デモ|テスト|開発|ステージング/;
    // 適用する背景色
    const devStyle = {'background-color': 'rgb(233,174,42)'};

    if(typeof $ != 'function')
      return;

    // サイト名を取得
    const $title = $('.hm0 .hm1 span');
    if( ! $title)
      return;

    // サイト一覧に適用
    if($title.text().match(/WebRelease/)) {
      $('#scrollable .sl .sll').each(function(i, e) {
        if($(e).text().match(devRegex)) {
          $(e).css(devStyle);
        }
      });
    }

    // サイト内の各ページに適用
    if($title.text().match(devRegex)) {
      if($('.panel')) {
        $('.panel').css(devStyle);
        $('.panel .leg').css(devStyle);
        $('.panel .legl').css(devStyle);
        $('.panel .legr').css(devStyle);
      }
      $('#scrollable') && $('#scrollable').css(devStyle);
    }
})();
