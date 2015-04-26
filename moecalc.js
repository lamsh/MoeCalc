// イメージファイル
frameFile = "./img/Frame.svg";    // 表示枠
buttonFile = "./img/Button.svg";  // ボタン

// 表示(置換)メッセージ
dispPlus = new Array("たす");               // +
dispMinus = new Array("ひく");              // -
dispMulti = new Array("かける");            // ×
dispDiv = new Array("わる");                // ÷
dispEqul = new Array("は");                 // =
dispAns = new Array("だよ","になったよ","じゃない？","くらいかな？");   // 結果

// 小数以下の省略表示
posLength = 4;  // 小数点以下表示桁数
posDisp = "…"; // 省略時の文字

myTotal = 0;       // 現在の合計値
myInput = "";      // 現在入力している値
myCalc  = "+";     // 合計と入力値の演算子
myFlg   = 1;       // １回前に入力したもの 0:数字 1:演算子
myWork  = "";
pointCheck = 0;

msg0 ="";	//計算中の文字列
msg1 ="";	//"たす"とか

function myValue(myData){     // 0〜9または小数点ボタンを押した
  myFlg = 0;
  if(myData == '.'){
    if(pointCheck == 1)
      return;
    pointCheck = 1;
  }
  
  myInput += myData;         // 現在入力している値に追加
  msg0 += myData; 
  Disp(msg0);

}

function myCalculate(myData){ // 演算ボタンを押した
  myWork = myWork + myCalc + myInput;    // 一連の計算式を作る

  if (myFlg==0){             // １回前に入力したものは数値か？
    myFlg = 1;
    if( myData == '+'){
      msg1 = dispPlus[Math.floor(Math.random() * dispPlus.length)];
    }else if( myData == '-'){
      msg1 = dispMinus[Math.floor(Math.random() * dispMinus.length)];
    }else if( myData == '*'){
      msg1 = dispMulti[Math.floor(Math.random() * dispMulti.length)];
    }else if( myData == '/'){
      msg1 = dispDiv[Math.floor(Math.random() * dispDiv.length)];
    }else if( myData == '='){
      msg1 = dispEqul[Math.floor(Math.random() * dispEqul.length)] + "</span>"
           + evalEx(myWork)
           + "<span class='dispFontSmall'>" + dispAns[ Math.floor(Math.random() * dispAns.length)] + "</span>";
    }
    else
      msg1 = "";
    msg0 += "<span class='dispFontSmall'>" + msg1 + "</span>";
    Disp(msg0);

    myInput = "";       // 現在入力している値をクリア
    pointCheck = 0;
  }
  if (myData == "="){   // 演算ボタンは[＝]か？
    myTotal = 0;        // 合計をクリア
    myCalc = "+";       // 演算子を[+]とする
    msg0 = "";          //表示バッファクリアでOK?
    myWork ="";
  } else {                 // 演算ボタンは[＝]以外である
    myCalc = myData;    // 演算子を退避させておく
  }
}

function myEtc(myData){ // その他ボタンを押した
}

function Disp(msg)
{
  document.getElementById("MsgDisp").innerHTML = msg; //innerHTMLで書き込み
}

function myC(){   // クリアボタンを押した
  myTotal = 0;    // 合計クリア
  myCalc = "+";   // 演算子クリア
  myInput = "";   // 現在入力している値をクリア
  msg0 = "";      // 表示バッファクリア
  myWork ="";
  pointCheck = 0;
  Disp("0");

}

function evalEx(myData)
{
  // 取りあえず計算
  ans = eval(myWork);
  
  // 小数以下ある？
  pos = String(ans).split(".");
  if(posLength > 0){
    if(pos.length >= 2){
      if(pos[1].length > posLength){
        pos[1] = pos[1].substr(1,posLength) + posDisp;
        ans = pos[0] + "."+ pos[1];
      }
    }
  }
  // 計算結果を返す
  return ans;
}


// http://www.nxworld.net/tips/button-mouseover-event.html からコピペ
function smartRollover() {
  // 表示枠設定
  document.getElementById("frame").style.backgroundImage = "url('" + frameFile + "')";
  
  // ボタン設定
  if(document.getElementsByTagName) {
    var btns = document.getElementsByTagName("span");
    for(var i=0; i < btns.length; i++) {
      if(btns[i].getAttribute("class").match("btnImg"))
      {
        // 通常状態
        btns[i].style.backgroundImage = "url('" + buttonFile + "')";
        
        // マウスオーバー
        btns[i].onmouseover = function() {
          this.className = this.getAttribute("class").replace("nomal", "hover");
        }
        
        // マウスアウト
        btns[i].onmouseout = function() {
          this.className = this.getAttribute("class").replace("hover", "nomal");
        }
        
        // マウスダウン
        btns[i].onmousedown = function() {
          this.className = this.getAttribute("class").replace("hover", "Down");
        }

        // マウスアップ
        btns[i].onmouseup = function() {
          this.className = this.getAttribute("class").replace("Down", "hover");
        }
      }
    }
	}
}

if(window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
}

// キーボード入力
document.onkeydown = function (e){
  // InternetExplorer 用
  if (e){
    var key_code = e.keyCode;
    var shift_key = e.shiftKey;
  }else{
    var key_code = event.keyCode;
    var shift_key = event.shiftKey;
  }

  // キーコード デバック表示
  var chr = String.fromCharCode(key_code);
  console.log("code:" + key_code +" Char:" +  chr + " Shift:" + shift_key);

  // 数値入力
  if(key_code >= 48 && key_code <= 57)
    myValue(String.fromCharCode(key_code));
  // 数値テンキー入力
  if(key_code >= 96 && key_code <= 105)
    myValue(String.fromCharCode(key_code - 48));
  // コンマ入力
  if(key_code == 190 || key_code == 110)
    myValue(".");
  // +
  if((key_code == 187 && shift_key) || key_code == 107)
    myCalculate('+');
  // -
  if((key_code == 189 && !shift_key) || key_code == 109)
    myCalculate('-');
  // *
  if((key_code == 186 && shift_key) || key_code == 106)
    myCalculate('*');
  // /
  if((key_code == 191 && !shift_key) || key_code == 111)
    myCalculate('/');
  // =
  if((key_code == 189 && shift_key) || key_code == 13)
    myCalculate('=');
  // (
  if(key_code == 56 && shift_key)
    myEtc('(');
  // )
  if(key_code == 57 && shift_key)
    myEtc(')');
  // )
  if(key_code == 27)
    myC();

};
