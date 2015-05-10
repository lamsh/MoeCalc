
MoeCalc v0.6

ライセンス GPLv3+

Author：TOY 「萌え萌えmoebuntu」（http://moebuntu.blog48.fc2.com/）

この萌え電卓は「ちる９のメモ帳」（http://cir9prog.seesaa.net/）さんからいただいたデータを改変したものです。

インストーラーはsenopenさん「My Future Sight for Past」（http://myfuturesightforpast.blogspot.jp/）が提供してくださいました。

イラストにはジュエルセイバー（FREEhttp://www.jewel-s.jp/）を利用しています。著作権は株式会社ブリリアントサービスに帰属します。

This program is based on Chromium. Chromium is licensed by the MIT License, the LGPL, the BSD, the Ms-PL and an MPL/GPL/LGPL tri-license. 



【インストールの仕方】

●端末を開いて解凍した「MoeCalc」フォルダ内に移動します。「MoeCalc」フォルダがホームにあれば以下の操作になります。
（$ は含まない）

    $ cd MoeCalc


●インストールは以下の操作をするだけです。

    $ sudo ./installer-linux.sh 


●アンインストールしたい場合は同様にしてアンインストーラーを走らせます。

    $ sudo ./uninstaller-linux.sh


＊アンインストールの操作をした場合「/opt/MoeCalc」の「MoeCalc」がフォルダごと削除されます。中に差し替えた壁紙がある場合など必要に応じてバックアップを取っておおきましょう。
＊動作確認はUbuntu 14.04でしています。
＊インストールせずに中の「index.html」をFirefoxなどで開いて試すこともできます。


【注意事項】

起動できない場合はエラーが出ている可能性があります。その際は端末を開いて以下の操作を試してみてください。

$ sudo ln -sf /lib/x86_64-linux-gnu/libudev.so.1 /lib/x86_64-linux-gnu/libudev.so.0

＊詳しくは（新）「萌え電卓」HTML版とそのアプリ化（http://moebuntu.blog48.fc2.com/blog-entry-789.html）。内『「app.nw」のパッケージング』の項目をご覧ください。
