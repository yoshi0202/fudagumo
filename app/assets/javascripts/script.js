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
        var width_min = 10;
        var height_min = 10;
        var width_max = parentWidth - 100 - width_min;
        var height_max = parentHeight - height_min;
        ctx.lineWidth = 2;
        ctx.fillStyle = "#000";
        if (firstflg) {
            ctx.font = "100px cursive";
            width_random = (parentWidth /2 ) - ((ctx.measureText(value).width)/ 2);
            height_random = parentHeight / 2;
            firstflg = false;
        } else {
            width_random = Math.floor( Math.random() * width_max + 1 - width_min ) + width_min;
            height_random = Math.floor( Math.random() * height_max + 1 - height_min ) + height_min;
            ctx.font = "15px cursive";
        }
        ctx.fillText(value, width_random, height_random);
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
