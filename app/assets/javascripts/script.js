$(function(){
    var cvs = document.getElementById("cv1");
    var ctx = cvs.getContext("2d");
    var parentWidth;
    var parentHeight;
    var firstflg = true;
    var baseColor = '#FFF';
    var ColorCode = {
        "background": {
            "red" : "#ef9a9a",
            "pink" : "#F48FB1",
            "purple" : "#CE93D8",
            "deeppurple" : "#B39DDB",
            "indigo" : "#9FA8DA",
            "blue" : "#90CAF9",
            "lightblue" : "#81D4FA",
            "cyan" : "#80DEEA",
            "teal" : "#80CBC4",
            "green" : "#A5D6A7",
            "lightgreen" : "#C5E1A5",
            "lime" : "#E6EE9C",
            "yellow" : "#FFF59D",
            "amber" : "#FFE082",
            "orange" : "#FFCC80",
            "deeporange" : "#FFAB91",
            "brown" : "#BCAAA4",
            "grey" : "#EEEEEE",
            "bluegrey" : "#B0BEC5"    
        },
        "text" : {
            "red" : "#ef5350",
            "pink" : "#EC407A",
            "purple" : "#AB47BC",
            "deeppurple" : "#7E57C2",
            "indigo" : "#5C6BC0",
            "blue" : "#42A5F5",
            "lightblue" : "#29B6F6",
            "cyan" : "#26C6DA",
            "teal" : "#26A69A",
            "green" : "#66BB6A",
            "lightgreen" : "#9CCC65",
            "lime" : "#D4E157",
            "yellow" : "#FFEE58",
            "amber" : "#FFCA28",
            "orange" : "#FFA726",
            "deeporange" : "#FF7043",
            "brown" : "#8D6E63",
            "grey" : "#BDBDBD",
            "bluegrey" : "#78909C"
        }
    }
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
    $('input[name="base-radio"]:radio' ).change( function() {
        var chooseColor = $(this).attr('id').split('_')[1];
        baseColor = ColorCode.text[chooseColor]
        console.log(chooseColor);
    });
    $('input[name="back-radio"]:radio' ).change( function() {
        var backgroundColor = $(this).attr('id').split('_')[1];
        console.log(backgroundColor);
        $('canvas').drawRect({
            fillStyle: ColorCode.background[backgroundColor],
            x: 0,
            y: 0,
            width: parentWidth,
            height: parentHeight,
            fromCenter: false
        });

    });

    function chgCol(value){
        var width_min = 10;
        var height_min = 10;
        var width_max = parentWidth - 100 - width_min;
        var height_max = parentHeight - height_min;
        ctx.lineWidth = 2;
        ctx.fillStyle = "#000";
        height_random = Math.floor( Math.random() * height_max + 1 - height_min ) + height_min;
        width_random = Math.floor( Math.random() * width_max + 1 - width_min ) + width_min;

        // if (firstflg) {
        //     ctx.font = "100px cursive";
        //     width_random = (parentWidth / 2 ) - ((ctx.measureText(value).width)/ 2);
        //     height_random = parentHeight / 2;
        //     firstflg = false;
        // } else {
        //     width_random = Math.floor( Math.random() * width_max + 1 - width_min ) + width_min;
        //     height_random = Math.floor( Math.random() * height_max + 1 - height_min ) + height_min;
        //     ctx.font = "15px cursive";
        // }
        // ctx.fillText(value, width_random, height_random);

        $('canvas').drawText({
            layer: true,
            draggable: true,
            fillStyle: baseColor,
            x: width_random, y: height_random,
            fontSize: 48,
            fontFamily: 'Nico Moji',
            text: value
        });
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
