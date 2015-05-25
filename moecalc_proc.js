/////////////////////////////////////////////////////////////////////////////
//
//  萌え電卓 JavaScript 動作ファイル
//
//    主にボタンを押した時の処理や計算・表示
//    処理内容を変更する必要が無ければ変更不要
//
/////////////////////////////////////////////////////////////////////////////


// 内部用
var inputBuff = "";         // 入力バッファ
var ParenthesesCount = 0;   // 括弧の数

// 定数
var ErrorString = "Error";  // エラー

// 演算子とか
var optCode = {
  Plus: '+',
  Sub: '-',
  Mul: '*',
  Div: '/',
  Po: '.'
};

// ボタン押下
function Push(PushData) {
  // デバック表示
  console.log("PushData : " + PushData);
  
  //
  var optChk = optCode[PushData];
  console.log("optChk : " + optChk);

  // 特殊ボタン
  if(PushData == "Eq") {
    // = 合計
    
    //
    if(inputBuff.length ==0) {
//      inputBuff = ErrorMessage3[ Math.floor(Math.random() * ErrorMessage3.length)];
      inputBuff = ErrorString + "3";
    } else {
      Calc();
    }

  } else if(PushData == "Cl") {
    // C（クリアボタン）
    InputDataClear();

  } else if(PushData == "Bs") {
    // ←（BSボタン）
    inputBuffBS();

  } else if(PushData == "PhL") {
    // (
    
    // 直前のコードチェック
    var ch = inputBuff.charAt(inputBuff.length - 1);
    console.log("ch : " + ch);
    if(inputBuff.length ==0 || OperatorCheck(ch) > 0 || ch == "(") {
      console.log("NG?");
    } else {
      return;
    }
    
    // 追加
    inputBuff += "(";
    ParenthesesCount++;

  } else if(PushData == "PhR") {
    // )
    
    //
    if (ParenthesesCount <= 0)
      return -1;
    
    // 追加
    inputBuff += ")";
    ParenthesesCount--;

  } else if(optChk != null) {
    // 演算子
    var chk = inputBuff.charAt(inputBuff.length-1);
    console.log("chk : " + chk);
    if(chk == "(") {
      if(optChk == "-") {
        inputBuff += optChk;
      }
    } else if(OperatorCheck(chk) == -1) {
      inputBuff += optChk;
    } else {
      if(optChk == "-") {
        if(OperatorCheck(inputBuff.charAt(inputBuff.length-1)) == 2) {
        } else {
          inputBuff += optChk;
        }
      }
    }
  } else {
    if(inputBuff.charAt(inputBuff.length-1) != ")") {
      // 入力バッファに追加
      inputBuff += PushData;
    }
  }

  // デバック表示
  console.log("inputBuff : " + inputBuff);
  
  // 表示
  Disp();
  
  //
  if(PushData == "Eq") {
    // 計算後クリア
    InputDataClear();
  }
}

// 入力情報クリア
function InputDataClear() {
  inputBuff = "";       // 入力バッファクリア
  ParenthesesCount = 0; // 括弧の数クリア
}

// 最後の入力文字削除
function inputBuffBS() {
  if(inputBuff.length <= 0)
    return;
  
  // 
  inputBuff = inputBuff.substr(0, inputBuff.length - 1);
}

// 演算子チェック
function OperatorCheck(code) {
  if(code == "+") return 1;
  if(code == "-") return 2;
  if(code == "*") return 3;
  if(code == "/") return 4;
  
 // それ以外
  return -1;
}

// 計算
function Calc()
{
  try
  {
    var ans = evalEx();
    if(ans == Number.POSITIVE_INFINITY || ans == Number.NEGATIVE_INFINITY) {
      inputBuff = ErrorString + "2";
    } else {
      inputBuff += "=" + ans;
    }
  } catch(ex) {
      inputBuff = ErrorString + "1";
  }
  // デバック表示
  console.log("ans > " + inputBuff);
}

// 小数点以下切り捨て
function evalEx()
{
  // "//"が含まれている場合はエラーとする
  if(inputBuff.indexOf("//") != -1) {
    throw "Error";
    return;
  }
  
  // 取りあえず計算
  ans = eval(inputBuff);
  
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

// 表示
function Disp() {
  var DispMsg = ""; // 表示メッセージ
  var EqFlg = 0;    // イコール出現フラグ
  
  // エラーメッセージ表示の場合は別処理
  if(inputBuff.substr(0,5) == ErrorString) {
    ErrorDisp(inputBuff);
    return;
  }
  
  for(i = 0; i < inputBuff.length; i++) {
    // 1文字取り出し
    var ch = inputBuff.charAt(i);
    
    // 演算子？
    var op = OperatorCheck(ch);
    if(op >= 1 && EqFlg == 0) {
      switch(op)
      {
        case 1: // +
            DispMsg += "<span class='dispFontSmall'>"
            + dispPlus[Math.floor(Math.random() * dispPlus.length)] + "</span>";
          break;
        case 2: // -
          if(OperatorCheck(inputBuff.charAt(i-1)) == -1 && i > 0) {
            if(inputBuff.charAt(i-1) == "(") {
              DispMsg += "-";
            } else {
              DispMsg += "<span class='dispFontSmall'>"
                + dispMinus[Math.floor(Math.random() * dispMinus.length)] + "</span>";
            }
          } else {
            DispMsg += "-";
          }
          break;
        case 3: // *
          DispMsg += "<span class='dispFontSmall'>"
            + dispMulti[Math.floor(Math.random() * dispMulti.length)] + "</span>";
          break;
        case 4: // /
          DispMsg += "<span class='dispFontSmall'>"
            + dispDiv[Math.floor(Math.random() * dispDiv.length)] + "</span>";
          break;
      }
    } else if(ch == "="){
      // ＝
      DispMsg += "<span class='dispFontSmall'>"
        + dispEqul[Math.floor(Math.random() * dispEqul.length)] + "</span>";
      
      EqFlg = 1;
    } else {
      DispMsg += ch;
    }
  }
  
  //
  if(EqFlg == 1) {
    DispMsg += "<span class='dispFontSmall'>"
      + dispAns[ Math.floor(Math.random() * dispAns.length)] ;
  }

  // 表示
  if(DispMsg.length ==0)
    DispMsg = "0";
  document.getElementById("MsgDisp").innerHTML = DispMsg; //innerHTMLで書き込み
}

/* エラーメッセージ表示 */
function ErrorDisp() {
  var i = inputBuff.substr(5,1);
  
  var DispMsg ="";
  switch(i) {
    case "1":
      DispMsg = ErrorMessage1[ Math.floor(Math.random() * ErrorMessage3.length)];
      break;
    case "2":
      DispMsg = ErrorMessage2[ Math.floor(Math.random() * ErrorMessage3.length)];
      break;
    case "3":
      DispMsg = ErrorMessage3[ Math.floor(Math.random() * ErrorMessage3.length)];
      break;
    default:
      DispMsg = "想定外";
      break;
  }
  
  DispMsg = "<span class='dispFontError'>"
    + DispMsg
    + "</span>";
  
  document.getElementById("MsgDisp").innerHTML = DispMsg; //innerHTMLで書き込み
}

// http://www.nxworld.net/tips/button-mouseover-event.html からコピペ
function smartRollover() {
  // ボタン設定
  if(document.getElementsByTagName) {
    var btns = document.getElementsByTagName("span");
    for(var i=0; i < btns.length; i++) {
      if(btns[i].getAttribute("class").match("btnImg"))
      {
        // マウスオクリック
        var btnCode = btns[i].getAttribute("class").replace("btnImg", "");
        btns[i].onclick =  new Function("Push('" + btnCode + "')");
        
        // 通常状態と背景の設定
        btns[i].className = btns[i].getAttribute("class") +"nomal btnBg";
        
        // マウスオーバー
        btns[i].onmouseover = function() {
          this.className = this.getAttribute("class").replace("nomal", "hover");
        }
        
        // マウスアウト
        btns[i].onmouseout = function() {
          this.className = this.getAttribute("class").replace("hover", "nomal");
          this.className = this.getAttribute("class").replace("Down", "nomal");
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
	window.addEventListener("load", ResizeMain, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
	window.attachEvent("onload", ResizeMain);
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
  if(key_code >= 48 && key_code <= 57 && !shift_key)
    Push(String.fromCharCode(key_code));
  // 数値テンキー入力
  if(key_code >= 96 && key_code <= 105 && !shift_key)
    Push(String.fromCharCode(key_code - 48));
  // コンマ入力
  if(key_code == 190 || key_code == 110)
    Push("Po");
  // +
  if((key_code == 187 && shift_key) || key_code == 107)
    Push("Plus");
  // -
  if((key_code == 189 && !shift_key) || key_code == 109)
    Push("Sub");
  // *
  if((key_code == 186 && shift_key) || key_code == 106)
    Push("Mul");
  // /
  if((key_code == 191 && !shift_key) || key_code == 111)
    Push("Div");
  // =
  if((key_code == 189 && shift_key) || key_code == 13)
    Push("Eq");
  // (
  if(key_code == 56 && shift_key)
    Push("PhL");
  // )
  if(key_code == 57 && shift_key)
    Push("PhR");
  // )
  if(key_code == 27)
    Push("Cl");
  // DEL BS代用
  if(key_code == 46)
    Push("Bs");
};
