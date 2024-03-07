３つの画面用コンポーネントを mode の state で切り替えている
video なら映像
image なら静止画
canvas は画像と座標の描画

デフォルトはビデオ
ビデオ時撮影ボタンをクリックしたら mode が image に切り替わり image の state に base64 の画像データが保存される
送信ボタンを押したときに image が送信し mode を canvas に変更
canvas 上に image と api から取得された座標データを描画する
