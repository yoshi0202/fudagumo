$(function(){
    var cvs = document.getElementById("cv1");
    var ctx = cvs.getContext("2d");
    var parentWidth;
    var parentHeight;
    var firstflg = true;
    $('.sentence').on("change",function(){
        console.log($(this).val());
        chgCol($(this).val());
    })

    $('.modal').on('shown.bs.modal', function () {
        //モーダル表示終了イベントをキャッチ
        parentWidth = $('.canvas-container').width();
        parentHeight = $('.canvas-container').height();
        changeCanvasSize();
    });
    $('.canvasreset').click(function(){
        clearCanvas();
    })

    $(window).resize(function() {
        //リサイズされたときの処理
        changeCanvasSize();
    });

    function chgCol(value){
        let minX = 10;
        let minY = 10;
        let maxX = parentWidth - 100 - minX;
        let maxY = parentHeight - minY;
        let randomX;
        let randomY;
        ctx.lineWidth = 2;
        ctx.fillStyle = "#000";
        if (firstflg) {
            ctx.font = "100px cursive";
            randomX = (parentWidth /2 ) - ((ctx.measureText(value).width)/ 2);
            randomY = parentHeight / 2;
            firstflg = false;
        } else {
            randomX = Math.floor( Math.random() * maxX + 1 - minX ) + minX;
            randomY = Math.floor( Math.random() * maxY + 1 - minY ) + minY;
            ctx.font = "15px cursive";
        }
        ctx.fillText(value, randomX, randomY);
    }

    //canvas内リセット処理
    function clearCanvas(){
        ctx.clearRect(0, 0, parentWidth, parentHeight);
    }
    //canvasのサイズ変更処理
    function changeCanvasSize(){
        parentWidth = $('.canvas-container').width();
        parentHeight = $('.canvas-container').height();
        // console.log(parentWidth);
        // console.log(parentHeight);
        $('#cv1').attr('width', parentWidth);
        $('#cv1').attr('height', parentHeight);
    }
})
