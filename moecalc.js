
// 表示(置換)メッセージ
dispPlus = new Array("たす");               // +
dispMinus = new Array("ひく");              // -
dispMulti = new Array("かける");            // ×
dispDiv = new Array("わる");                // ÷
dispEqul = new Array("は");                 // =
dispAns = new Array("だよ","になったよ","じゃない…かな？","くらいだよ");   // 結果


myTotal = 0;       // 現在の合計値
myInput = "";      // 現在入力している値
myCalc  = "+";     // 合計と入力値の演算子
myFlg   = 1;       // １回前に入力したもの 0:数字 1:演算子
myWork  = "";

msg0 ="";	//計算中の文字列
msg1 ="";	//"たす"とか

function myValue(myData){     // 0〜9または小数点ボタンを押した
  myFlg = 0;
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
           + eval(myWork) + "<span class='dispFontSmall'>"
           + "<span class='dispFontSmall'>" + dispAns[ Math.floor(Math.random() * dispAns.length)] + "</span>";
    }
    else
      msg1 = "";
    msg0 += "<span class='dispFontSmall'>" + msg1 + "</span>";
    Disp(msg0);

    myInput = "";       // 現在入力している値をクリア
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
  Disp("0");

}