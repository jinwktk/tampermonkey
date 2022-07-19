var url = window.location.href;

// DOM

if ( url.match(new RegExp(/issues/)) == null ) {
    $('table.list').before(`<button type="button" onclick="toggle()" class="btn btn--orange">対応済みトグル</button>`);
    $('table.list').before(`<button type="button" onclick="feedtoggle()" class="btn btn--orange">フィードバックトグル</button>`);
} else {
    $('#issue_tree').before(`<button type="button" onclick="toggle()" class="btn btn--orange">対応済みトグル</button>`);
    $('#issue_tree').before(`<button type="button" onclick="feedtoggle()" class="btn btn--orange">フィードバックトグル</button>`);
    $('#issue_tree').before(`<button type="button" onclick="endtoggle()" class="btn btn--orange">終了トグル</button>`);

}

// Script
var scriptText=`

function toggle () {
    $('.tracker, .status').each(function(index) {
        if ( $(this).text() === '対応済み' ) {
            $(this).parent().toggle();
        }
    });
}

function feedtoggle () {
    $('.tracker, .status').each(function(index) {
        if ( $(this).text() === 'フィードバック' ) {
            $(this).parent().toggle();
        }
    });
}

function endtoggle () {
    $('.status').each(function(index) {
        if ( $(this).text() === '修正確認完了' || $(this).text() === 'クローズ' ) {
            $(this).parent().toggle();
        }
    });
}
`;

var newScript = document.createElement("script");
var inlineScript = document.createTextNode(scriptText);
newScript.appendChild(inlineScript);
document.body.appendChild(newScript);

// CSS
GM_addStyle(`

*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 62.5%;
}

.btn,
a.btn,
button.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

.btn--orange,
button.btn--orange {
  color: #fff;
  background-color: #eb6100;
  width: 100%;
  margin-bottom: 1em;
}

.btn--orange:hover,
button.btn--orange:hover {
  color: #fff;
  background: #f56500;
}

`)
