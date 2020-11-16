'use strict'
const slotScreen1 = document.getElementById('slot-screen1');
const slotScreen2 = document.getElementById('slot-screen2');
const slotScreen3 = document.getElementById('slot-screen3');
const stopButton1 = document.getElementById('stop-button1');
const stopButton2 = document.getElementById('stop-button2');
const stopButton3 = document.getElementById('stop-button3');
const spinButton  = document.getElementById('spin-button');
const resultJudge = document.getElementById('result-judge');

//slotscreenに表示する値
const values1 = ['あ','た','さ'];
const values2 = ['た','さ','て'];
const values3 = ['り','み','い'];

//setInterval制御用変数
var spinControl1;
var spinControl2;
var spinControl3;

//spin状態確認用変数
var spinStatus1;
var spinStatus2;
var spinStatus3;
var spinStatus;

var resultJudg;

//spinボタン押下時の処理
spinButton.onclick = () => {
    //spin結果のコメントの削除
    removeAllChildren(resultJudge);

    spinControl1 = startSpin(values1, slotScreen1);
    spinControl2 = startSpin(values2, slotScreen2);
    spinControl3 = startSpin(values3, slotScreen3);

    spinStatus1 = 'start';
    spinStatus2 = 'start';
    spinStatus3 = 'start';
    spinStatus  = 'start';
}

//stopボタン押下時の処理
stopButton1.onclick = () => {
    clearInterval(spinControl1);
    spinStatus1 = 'fin';
    spinStatusUpdate()
    resultJudgment() 
}
stopButton2.onclick = () => {
    clearInterval(spinControl2);
    spinStatus2 = 'fin';
    spinStatusUpdate()
    resultJudgment()
}
stopButton3.onclick = () => {
    clearInterval(spinControl3);
    spinStatus3 = 'fin';
    spinStatusUpdate()
    resultJudgment()
}

/**
 * spin終了後の結果にコメントを出力する関数
 */
function resultJudgment(){
    if(spinStatus === 'fin'){
        //記入エリアの作成
        var resultJudgeArea = document.createElement('h2');
        var resultText = slotScreen1.innerText + slotScreen2.innerText + slotScreen3.innerText;

        //spin結果ごとに判定を記載（辞書も検討）
        if(resultText === 'あたり'){
            resultJudg = 'GameClear!!!';
        }else if(resultText === 'たたり'){
            resultJudg = 'GameOver...';
        }else{
            resultJudg = 'GameContinue?(push Spinbutton)';
        }

        //記入エリアへresultJudgを記入
        resultJudgeArea.innerText = resultJudg;
        resultJudge.appendChild(resultJudgeArea);
    }

}

/**
 * 全体のspin状態を更新する関数
 */
function spinStatusUpdate(){
    if(
        spinStatus1 === 'fin' 
        && spinStatus2 === 'fin'
        && spinStatus3 === 'fin'){
            spinStatus = 'fin';
    }
}

/**
 * spinを実行する関数
 */
function startSpin(values, slotScreen){
    let id = setInterval(function(){
        let value = slotValueRandom(values);
        slotScreen.innerHTML='<h4>' + value + '</h4>';
    } , 1000);
    return id;
}

/**
 * spinに表示する値をランダムに抽出する関数
 */
function slotValueRandom(values){
    let result = values[Math.floor(Math.random() * values.length)];    
    return result;
}

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        //子どもの要素がある限り削除
        element.removeChild(element.firstChild);
        }
}