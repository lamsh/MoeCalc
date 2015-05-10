/////////////////////////////////////////////////////////////////////////////
//
//  萌え電卓 JavaScript リサイズ実験ファイル
//
//    ウィンドウリサイズ時の処理です。
//    暫定実装なので固定値多いです。
//    たぶん、480ｘ300以外の画像だと上手く動作しないと思います。
//
/////////////////////////////////////////////////////////////////////////////
  
/* リサイズ時 */
window.onresize = function() {
  ResizeMain();
}

/* リサイズ処理メイン */
function ResizeMain() {
  // ウィンドウサイズ取得
  sizeWidth = window.innerWidth;
  sizeHeight = window.innerHeight;
  
  // ウィンドウサイズ デバック表示
  console.log("resize w : " +  sizeWidth + " h : " + sizeHeight);
  
  // 各高さ計算
  var h1 = 0.21 * sizeHeight; // 表示枠
  var h2 = 0.31 * sizeHeight; // ロゴ?
  var h3 = 0.48 * sizeHeight; // 数値枠

  // 各幅再計算
  var w1 = (311 / 63) * h1;
  var w3 = (192 / 144) * h3;
  
  // 各幅計算
  var fWidth1 = sizeWidth * 0.647916667;
  var fWidth3 = sizeWidth * 0.4;

  // 幅が一定画面から超えそうなら修正
  if(w1 > fWidth1) {
    h1 = fWidth1 / (311 / 63);
  }
  if(w3 > fWidth3) {
    h3 = fWidth3 / (192 / 144);
  }

  // 拡大率計算
  var z1 = h1 / 63 * 100 + "%";
  var z3 = h3 / 144 * 100 + "%";

  document.getElementById("frame").style.zoom = z1 ;
  document.getElementById("inpFrom").style.zoom = z3 ;
};
