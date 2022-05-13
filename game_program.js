
let gCanvas;
let gCtx;

window.addEventListener('load', () => {
    onload();
}, false);

function onload(){
    gCanvas = document.getElementById("main_canvas");
    gCtx = gCanvas.getContext("2d");
    gCanvas.addEventListener('click', mouseClick,false);

    reset(); //最初にゲームをリセットしておく
    turnJikkou(); //ターンの実行へ
}

//変数　定数---------------------------------------------------
let board; //盤[][]
const Maru = 0; //〇　定数
const Batsu = 1; //☓　定数　
const Nashi = -1; //空　定数　何も置かれていない
const Kabe = -2; //壁　定数
let IroName = ["〇","☓"]; //駒の名前

let turn = Maru; //どちらのターンか？
let okareta = 0; //盤面にいくつの石があるか？　9なら終了

//****************************************************
//表示
// board[] のデータをGUI画面に表示する
function drawBoard(){
    //線を引く
    for(let i = 0; i <= 3; i++){
        drawLine(gCtx,0,i * 60,180,i * 60);
        drawLine(gCtx,i * 60,0,i * 60,180);
    }
    //board配列の中身を描画する
    for(let y = 1; y <= 3; y++){
        for(let x = 0; x <= 3; x++){
            if(board[y][x] == Maru){
                drawCircle(gCtx,(x - 1 + 0.05) * 60 + 29,(y - 1 + 0.05) * 60 + 28,26,"black");
            }
            else if(board[y][x] == Batsu){
                drawLine(gCtx,(x-1+0.04)*60,(y-1)*60,(x-1+1.0)*60,(y-1+1)*60,"black");
                drawLine(gCtx,(x-1+0.96)*60,(y-1)*60,(x-1)*60,(y-1+1)*60,"black");
            }
        }
    }
}

//**************************************
//初期化
function reset(){
    board = [];
    for(let i = 0; i < 5; i++){
        board[i] = [];
        for(let x = 0; x < 5; x++){
            board[i][x] = Nashi;
        }
    }
    for(let i = 0; i < 5; i++){ //四方を壁で囲む
        board[i][0] = Kabe;
        board[i][4] = Kabe;
        board[0][i] = Kabe;
        board[4][i] = Kabe;
    }

    //盤を表示する
    drawBoard();
}

//**********************************************
//ターン実行
function turnJikkou(){
    if(okareta >= 9){ //盤面の石の数が9ならおしまい
        syuuryou("最後まで行きました　");
        return ; //終了
    }
    else if(okareta < 9){ //ゲームの途中
        Totyuu("結果は・・・　");
        return;
    }
}

//***********************************************
//人の手番で　マウスがクリックされた時
function mouseClick(e){
    //クリックされた座標から、盤面のx,yを計算する
    let xi = Math.floor(e.offsetX / 60) + 1;
    let yi = Math.floor(e.offsetY / 60) + 1;
    console.log("クリックされた  x:" + xi + "  y:" + yi);
    if(marubatsukanousei(turn,xi,yi) <= 0){ //〇✕ができない
        alert(IroName[turn] + "さん  そこに〇☓はできません"); 
        return ; //やり直し
    }
    console.log("置いた");
    Marubatsu(turn, xi,yi); //〇✕を行う
    turn = hantai(turn);   //反対のターン
    turnJikkou();
}

//********************************************
//反対　〇と✕を反転させる
function hantai(iro){
    return Math.abs(iro - 1);
}

//*************************************************** 
//〇✕できるかどうかを調べる

function marubatsukanousei(iro,x,y){
    if(board[y][x]!= Nashi){ //この座標に〇か✕がある　つまり
        return 0; //ここには置けない
    }
}

//*********************************************
//石を置く
function Marubatsu(iro,x,y){
    board[y][x] = iro; //〇✕をおこなう
    okareta++; //〇✕の数を数える変数を＋＋する
    drawBoard(); //描画する
}

//************************************************ 
//keika領域に文字列を表示する
function printMsg(keika){
    document.getElementById("keika").innerHTML = keika;
}

//*************************************************** 
//途中判定用
function Totyuu(keika){
    let k = 0;
    let s = 0;

    if((board[1][1] == board[1][2])&&(board[1][1] == board[1][3])&&(board[1][1] != Nashi)&&(board[1][1] == Maru) ||
       (board[2][1] == board[2][2])&&(board[2][1] == board[2][3])&&(board[2][1] != Nashi)&&(board[2][1] == Maru) ||
       (board[3][1] == board[3][2])&&(board[3][1] == board[3][3])&&(board[3][1] != Nashi)&&(board[3][1] == Maru) ||
       (board[1][1] == board[2][1])&&(board[1][1] == board[3][1])&&(board[1][1] != Nashi)&&(board[1][1] == Maru) ||
       (board[1][2] == board[2][2])&&(board[1][2] == board[3][2])&&(board[1][2] != Nashi)&&(board[1][2] == Maru) ||
       (board[1][3] == board[2][3])&&(board[1][3] == board[3][3])&&(board[1][3] != Nashi)&&(board[1][3] == Maru) ||
       (board[1][1] == board[2][2])&&(board[1][1] == board[3][3])&&(board[1][1] != Nashi)&&(board[1][1] == Maru) ||
       (board[1][3] == board[2][2])&&(board[1][3] == board[3][1])&&(board[1][3] != Nashi)&&(board[1][3] == Maru) ){
        k = 1;
    }
    else if((board[1][1] == board[1][2])&&(board[1][1] == board[1][3])&&(board[1][1] != Nashi)&&(board[1][1] == Batsu) ||
            (board[2][1] == board[2][2])&&(board[2][1] == board[2][3])&&(board[2][1] != Nashi)&&(board[2][1] == Batsu) ||
            (board[3][1] == board[3][2])&&(board[3][1] == board[3][3])&&(board[3][1] != Nashi)&&(board[3][1] == Batsu) ||
            (board[1][1] == board[2][1])&&(board[1][1] == board[3][1])&&(board[1][1] != Nashi)&&(board[1][1] == Batsu) ||
            (board[1][2] == board[2][2])&&(board[1][2] == board[3][2])&&(board[1][2] != Nashi)&&(board[1][2] == Batsu) ||
            (board[1][3] == board[2][3])&&(board[1][3] == board[3][3])&&(board[1][3] != Nashi)&&(board[1][3] == Batsu) ||
            (board[1][1] == board[2][2])&&(board[1][1] == board[3][3])&&(board[1][1] != Nashi)&&(board[1][1] == Batsu) ||
            (board[1][3] == board[2][2])&&(board[1][3] == board[3][1])&&(board[1][3] != Nashi)&&(board[1][3] == Batsu)){
                s = 1;
    }

    if(k > s){
        printMsg(keika + " 〇の勝ちです");
        return;
    }
    else if(k < s){
        printMsg(keika + " ✕の勝ちです");
        return;
    }
    else {
        printMsg(keika + " まだわかりません、続けてください。\n");
        return;
    }

}

//***************************************** 
//終了のメッセージを表示する
function syuuryou(keika){
    let k = 0;
    let s = 0;

    if((board[1][1] == board[1][2])&&(board[1][1] == board[1][3])&&(board[1][1] != Nashi)&&(board[1][1] == Maru) ||
       (board[2][1] == board[2][2])&&(board[2][1] == board[2][3])&&(board[2][1] != Nashi)&&(board[2][1] == Maru) ||
       (board[3][1] == board[3][2])&&(board[3][1] == board[3][3])&&(board[3][1] != Nashi)&&(board[3][1] == Maru) ||
       (board[1][1] == board[2][1])&&(board[1][1] == board[3][1])&&(board[1][1] != Nashi)&&(board[1][1] == Maru) ||
       (board[1][2] == board[2][2])&&(board[1][2] == board[3][2])&&(board[1][2] != Nashi)&&(board[1][2] == Maru) ||
       (board[1][3] == board[2][3])&&(board[1][3] == board[3][3])&&(board[1][3] != Nashi)&&(board[1][3] == Maru) ||
       (board[1][1] == board[2][2])&&(board[1][1] == board[3][3])&&(board[1][1] != Nashi)&&(board[1][1] == Maru) ||
       (board[1][3] == board[2][2])&&(board[1][3] == board[3][1])&&(board[1][3] != Nashi)&&(board[1][3] == Maru) ){
        k = 1;
    }
    else if((board[1][1] == board[1][2])&&(board[1][1] == board[1][3])&&(board[1][1] != Nashi)&&(board[1][1] == Batsu) ||
            (board[2][1] == board[2][2])&&(board[2][1] == board[2][3])&&(board[2][1] != Nashi)&&(board[2][1] == Batsu) ||
            (board[3][1] == board[3][2])&&(board[3][1] == board[3][3])&&(board[3][1] != Nashi)&&(board[3][1] == Batsu) ||
            (board[1][1] == board[2][1])&&(board[1][1] == board[3][1])&&(board[1][1] != Nashi)&&(board[1][1] == Batsu) ||
            (board[1][2] == board[2][2])&&(board[1][2] == board[3][2])&&(board[1][2] != Nashi)&&(board[1][2] == Batsu) ||
            (board[1][3] == board[2][3])&&(board[1][3] == board[3][3])&&(board[1][3] != Nashi)&&(board[1][3] == Batsu) ||
            (board[1][1] == board[2][2])&&(board[1][1] == board[3][3])&&(board[1][1] != Nashi)&&(board[1][1] == Batsu) ||
            (board[1][3] == board[2][2])&&(board[1][3] == board[3][1])&&(board[1][3] != Nashi)&&(board[1][3] == Batsu)){
                s = 1;
    }

    //勝敗を書く
    if(k > s){
        printMsg(keika + " 〇の勝ちです");
        return;
    }
    else if(k < s){
        printMsg(keika + " ✕の勝ちです");
        return;
    }
    else {
        printMsg(keika + " 引き分けです");
        return;
    }

}


