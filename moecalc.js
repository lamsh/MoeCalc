/////////////////////////////////////////////////////////////////////////////
//
//  萌え電卓 JavaScript 動作ファイル
//
//    主にボタンを押した時の処理や計算・表示
//    処理内容を変更する必要が無ければ変更不要
//
/////////////////////////////////////////////////////////////////////////////

// 内部用
var calcBuff = new Array();  // 計算用バッファ
var dispBuff = new Array();  // 表示用バッファ

// 定数
var ErrorString = "Error";  // エラー

// ボタン押下
function Push(PushData) {
  // デバック表示
  console.log("PushData : " + PushData);
  
  var idx = 0;              // 汎用インデックス
  var speekStr = PushData;  // 読み上げ文字保存
  var calcStr  = PushData;  // 計算用文字保存
  var dispStr  = PushData;  // 表示文字保存

  // 1文字前の文字を取り出す
  var chk = fBuf();

  // 各データに変換
  if(PushData == "Plus") {
    // ”+”
    if(calcBuff.length != 0 && chk != "(" && !isNaN(Number(chk)) || chk == ")") {
      // 表示文字列に置き換え
      idx = Math.floor(Math.random() * dispPlus.length);
      speekStr = PushData + idx; dispStr = dispPlus[idx]; calcStr = "+";
    } else {
      calcStr=""; dispStr=""; speekStr ="Err0";
    }

  } else if(PushData == "Sub") {
    // ”ｰ”
    if(chk == "(" || calcBuff.length == 0 || isNaN(Number(chk))) {
      // マイナス表示
      speekStr = "Mi"; dispStr ="-"; calcStr = "-";
    } else {
      // 演算子で表示
      // 表示文字列に置き換え
      idx = Math.floor(Math.random() * dispMinus.length);
      speekStr = PushData + idx; dispStr = dispMinus[idx]; calcStr = "-";
    }

  } else if(PushData == "Mul") {
    // "*"
    if(calcBuff.length != 0 && chk != "(" && !isNaN(Number(chk)) || chk == ")") {
      // 表示文字列に置き換え
      idx = Math.floor(Math.random() * dispMulti.length);
      speekStr = PushData + idx; dispStr = dispMulti[idx]; calcStr = "*";
    } else {
      calcStr = ""; dispStr = ""; speekStr = "Err0";
    }

  } else if(PushData == "Div") {
    if(calcBuff.length != 0 && chk != "(" && !isNaN(Number(chk)) || chk == ")") {
      // 表示文字列に置き換え
      idx = Math.floor(Math.random() * dispDiv.length);
      speekStr = PushData + idx; dispStr = dispDiv[idx]; calcStr = "/";
    } else {
      calcStr = ""; dispStr = ""; speekStr = "Err0";
    }

  } else if(PushData == "Eq") {
    // 表示文字列に置き換え
    idx =  Math.floor(Math.random() * dispEqul.length);
    speekStr = PushData + idx; dispStr = dispEqul[idx]; calcStr = "";

  } else if(PushData == "Cl") {
    // クリア
    calcBuff = new Array();
    dispBuff = new Array();
    calcStr = ""; dispStr = "";

  } else if(PushData == "PhL") {
    // ”(”
    if(calcBuff.length == 0 || isNaN(Number(chk))) {
      dispStr = "("; calcStr = "(";
    } else {
      calcStr = ""; dispStr = ""; speekStr = "Err0";
    }

  } else if(PushData == "PhR") {
    // ”）”
    if(calcBuff.length != 0) {
      dispStr = ")"; calcStr = ")";
    } else {
      calcStr = ""; dispStr = ""; speekStr = "Err0";
    }

  } else if(PushData == "Bs") {
    // ”Bs”
    if(calcBuff.length != 0) {
      // 計算用バッファに値があれば、バッファの最後を取り出して消す
      var c = calcBuff.pop();
      dispBuff.pop();
      if(!isNaN(Number(c))) {
        // 数値の場合は最後の1文字を消す
        calcStr = c.substr(0, c.length -1);
        dispStr = calcStr;
      } else {
        calcStr = ""; dispStr = "";
      }
    } else {
      calcStr = ""; dispStr = ""; speekStr = "Err0";
    }

  } else if(PushData == "Po") {
    // ”.”
    if(chk.length > 0 && !isNaN(Number(chk))) {
      // 最後のバッファが数値なら追加する
      var c = calcBuff.pop();
      dispBuff.pop();
      if(c.indexOf(".") == -1) {
        calcStr = c + "."; dispStr = c + ".";
      } else {
        // すでに”.”が入力されていたらエラー扱い
        calcStr = c; dispStr = c; speekStr ="Err0";
      }
    } else {
      calcStr = "0."; dispStr = "0."; speekStr = "Po";
    }

  } else {
    // 数値
    if(chk != ")") {
      if(chk.length > 0 && !isNaN(Number(chk))) {
        // 1つ前が数値の場合、取り出して追加する
        var c = calcBuff.pop();
        dispBuff.pop();
        calcStr = String(NumberOutZero(c + calcStr));
        dispStr = String(NumberOutZero(c + dispStr));
      }
    } else {
      calcStr = ""; dispStr = ""; speekStr = "Err0";
    }
  }

  // 読み上げ
  voiceSpeek(speekStr);

  // 表示用文字列が登録されている場合
  if(dispStr.length != 0) {
    calcBuff.push(calcStr);   // 入力バッファに追加
    if(isNaN(Number(dispStr)) && dispStr != "(" && dispStr != ")" && speekStr != "Mi")
      // 数値以外
      dispBuff.push("<span class='dispFontSmall'>" + dispStr + "</span>");   // 表示バッファに追加
    else
      // 数値　マイナスは数値扱い
      dispBuff.push(dispStr);   // 表示バッファに追加
  }
  
  console.log("calcBuff : " + calcBuff.join(','));
//  console.log("dispBuff : " + dispBuff.join(''));

  // 表示用バッファの内容も文字列化
  var dispStr = dispBuff.join('');
  if(dispStr.length == 0)
    dispStr = "0";
  // 表示内容を表示
  document.getElementById("MsgDisp").innerHTML = dispStr;
    
  // ここで計算
  if(PushData == "Eq") {
    // 計算結果を得る
    var ans = Calc();
    if(ans.substr(0,5) == ErrorString) {
      // 計算結果がエラーの場合各バッファクリア
      calcBuff = new Array();
      dispBuff = new Array();

      // エラーメッセージ取得
      ret = ErrorDisp(ans);
      ret2 = ret.split(",")

      // エラーメッセージ表示
      document.getElementById("MsgDisp").innerHTML = 
        "<span class='dispFontError'>" + ret2[2] + "</span>";
      voiceSpeek("Err" + ret2[0] + "_" + ret2[1]);

    } else {
      dispBuff.push(ans);   // 表示バッファに追加
//      console.log("dispBuff : " + dispBuff.join(''));
      // 計算結果を表示
      document.getElementById("MsgDisp").innerHTML = dispBuff.join('');
      
      // 計算結果読み上げ
      AnsSpeek(ans);
      
      // 最後のメッセージを読み上げ
      var idx = Math.floor(Math.random() * dispAns.length);
      dispBuff.push("<span class='dispFontSmall'>" + dispAns[idx] + "</span>");
//      console.log("dispBuff : " + dispBuff.join(''));
      document.getElementById("MsgDisp").innerHTML = dispBuff.join('');
      voiceSpeek("Ans" + idx);
    }

    // 計算が終わったので各バッファクリア
    calcBuff = new Array();
    dispBuff = new Array();
  }
}

// 計算
function Calc()
{
  // 計算バッファを文字列化
  if(calcBuff.join('').length == 0) {
    // 文字列が取得できない場合はエラー扱い
    return ErrorString + "3";
  }
  
  try
  {
    // 計算
    var ans = evalEx();
    console.log("ans : " + ans);
    if(ans == Number.POSITIVE_INFINITY || ans == Number.NEGATIVE_INFINITY || String(ans) == "NaN") {
      // 正常な計算結果が得られない場合はエラー扱い
      return ErrorString + "2";
    } else {
      // 計算結果を返す
      return String(ans);
    }
    
  } catch(ex) {
    // 予想外のエラーが発生した場合はエラー扱い
    return ErrorString + "1";
  }
}

// 小数点以下切り捨て
function evalEx()
{
  // 取りあえず計算
  ans = eval(calcBuff.join(''));
  
  // 小数以下ある？
  pos = String(ans).split(".");
  
  // 小数点が存在する場合、指定した桁数意向を削除し、指定された文字を追加する
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

// ひとつ前のバッファ
function fBuf() {
  if(calcBuff.length == 0)
    return "";

  return calcBuff[calcBuff.length - 1];
}

// 文字列の前０を除去
function NumberOutZero(str) {
  // 戦闘が”0”で次が”.”以外の場合、洗脳の1文字を消す
  if(str.charAt(0) == "0" && str.charAt(1) != ".")
    return str.substr(1);
  
  return str;
}

/* エラーメッセージ表示 */
function ErrorDisp(str) {
  var i = str.substr(5,1);
  var j = 0;
  var DispMsg ="";
  switch(i) {
    case "1":
      j = Math.floor(Math.random() * ErrorMessage1.length);
      msg = ErrorMessage1[j];
      break;
    case "2":
      j = Math.floor(Math.random() * ErrorMessage2.length);
      msg = ErrorMessage2[j];
      break;
    case "3":
      j = Math.floor(Math.random() * ErrorMessage3.length);
      msg = ErrorMessage3[j];
      break;
    default:
      j = -1;
      msg = "想定外";
      break;
  }
  
  return i + "," + j + "," + msg;
}

// 計算結果読み上げ処理
function AnsSpeek(ans) {
  // 符号除去
  var f = "";
  if(ans.charAt(0) =="-") {
    ans = ans.substr(1);
    f ="-";
  }

  // 整数部と小数部に分割
  var ansWork = ans.split(".");

  // 一時保管用
  var sp = new Array();

  // ansに前０を付け4桁枚に切り出しやすくする。
  ansLen = ansWork[0].length;
  ansLen = Math.ceil(ansLen / 4) * -4 ;
  ans2 = ("000" + ansWork[0]).slice(ansLen);
  console.log("ansLen:" + ansLen + "  ans2:" + ans2);

  // 命数変換用
  var uni = 0;
  var num = 0;

  // 4桁ごとに処理を行う
  for(i = ans2.length-4; i >= 0 ; i-=4) {
    console.log("i:" + i);
    // 4文字取り出し
    var ans4 = ans2.substr(i,4);
    console.log("ans4:" + ans4 );

    // 4文字とも０なら何もしない
    var spNum = "";
    if(ans4 != "0000") {
      if(num > 0) sp.push("Num" + num);
      // 下位から順に
      uni = 0;
      for(l = 3; l >= 0; l--) {
        // 1文字取り出し
        ch = ans4.charAt(l);
        
        // 各位の読みを取得
        spUni = (uni > 0) ? "Uni" + uni : "";
        
        if(ch != "0") {
          if(spUni.length != 0) sp.push(spUni);
          if(ch != "1" || l == 3) sp.push(ch);
        }
        //
        uni++;
      }
    }
    
    // 
    num++;
  }

//  // １つ余分に入るので削除
//  sp.pop();

  // 整数部が”0”の場合”0”を保存
  if(sp.length == 0) sp.push("0");

  // 一時保管用から取り出して、符号と小数点以下を追加する
  if(f.length !=0) sp.push("-");
  var s = sp.reverse();
  if(ansWork.length >= 2) {
    s.push(".");
    for(i = 0; i < ansWork[1].length; i++)
      s.push(ansWork[1].charAt(i));
  }
  console.log("s : " + s.join());
  
  // 読み上げ
  for( i = 0; i < s.length; i++)
    voiceSpeek(s[i]);
}
