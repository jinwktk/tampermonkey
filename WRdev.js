(function () {
    'use strict';

    // jQueryが読み込めていなければ
    if ( typeof $ != 'function' ) return;

    // テキストエリアがない場合は、空を返す。
    if( !$('#odiv textarea[id="scrr"]').length ) return;

    $(window).load(function() {

        // スタイルシートを読み込む
        var style = GM_getResourceText('style');
        GM_addStyle(style);

        // テーマの読み込み「monokai.css」
        var theme = GM_getResourceText('theme');
        GM_addStyle(theme);

        // foldgutter.cssを読み込む
        var foldTheme = GM_getResourceText('foldTheme');
        GM_addStyle(foldTheme);

        // foldgutter.cssを読み込む
        var full = GM_getResourceText('full');
        GM_addStyle(full);

        // dialog.cssを読み込む
        var dialog = GM_getResourceText('dialog');
        GM_addStyle(dialog);

        var width = $('#scrw').css('width');

        // エディタをWebReleaseに、組み込む為のcss
        GM_addStyle(`
            .CodeMirror {
                position: absolute !important;
                height: 100%;
                right: 0;
                width: calc(100% - ${width});
            }
        `);

        // メソッドタブで入力できるようにするCSS
        if ( $('#methdef').length ) {
            GM_addStyle(`
                .CodeMirror {
                    margin-top: 3em;
                }
            `);
        }

        // codeMirrorのsetting
        var editor = CodeMirror.fromTextArea($('#odiv textarea[id="scrr"]').get(0), {
            // 行番号
            lineNumbers: true,
            // 行の折り返し
            lineWrapping: true,

            // 書式のモード
            mode: "text/html",
            // キーバインド
            keyMap: "sublime",
            // フォントテーマ
            theme: "monokai",
            // インデントのスペース量
            indentUnit: 4,
            autofocus:true,

            // 選択時にカーソルを表示する
            showCursorWhenSelecting: true,
            // カッコの強調表示する
            matchBrackets: true,
            // カッコを自動で閉じる
            autoCloseBrackets: true,
            // タグの強調表示
            matchTags: { bothTags: true },
            // 自動終了タグ挿入
            autoCloseTags: true,
            // HTMLなどを簡略表示可にする
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            // アクティブな列を強調表示する
            styleActiveLine: true,

            // ショートカットキー
            extraKeys: {
                // 終了タグにジャンプ
                "Ctrl-J": "toMatchingTag",
                // コメント
                'Ctrl-/' : 'toggleComment',
                // フォルダをとじる、開く
                "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
                // 検索
                "Ctrl-F": "findPersistent",
                // Shift-Ctrl-F 置換
                // Shift-Ctrl-R 全置換
                "Ctrl-S": function(cm){
                    $.cookie("page_y", $('#odiv div.CodeMirror .CodeMirror-scroll').scrollTop());
                    $.cookie("line", editor.doc.getCursor().line);
                    $.cookie("ch", editor.doc.getCursor().ch);
                },
            }
        });

        // Cookieからスクロール座標取得し、移動
        if ( $.cookie('page_y') ) {
            $('#odiv div.CodeMirror .CodeMirror-scroll').scrollTop($.cookie('page_y'));
        }
        if ( $.cookie('line') && $.cookie('ch') ) {
            editor.doc.setCursor({line: $.cookie('line'), ch: $.cookie('ch')})
        }

        // エディタ保存
        editor.save();

        // Cookie削除
        $.removeCookie("page_y");
        $.removeCookie("line");
        $.removeCookie("ch");
    });
})();
