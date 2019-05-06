$(function(){
    $.jCanvas.defaults.fromCenter = false;
    var cvs = document.getElementById("cv1");
    var ctx = cvs.getContext("2d");
    var parentWidth;
    var parentHeight;
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
    $('.addsentence').click(function(){
        chgCol($('.sentence').val(),$('select[name="sentenceLevel"]').val(),$('select[name="sentenceFont"]').val(),$('select[name="sentenceColor"]').val());
        if ($('#clearFlg:checked').val() === "checked"){
            $('.sentence').val("");
        }
    })

    $('.modal').on('shown.bs.modal', function () {
        //モーダル表示終了イベントをキャッチ
        parentWidth = $('.canvas-container').width();
        parentHeight = $('.canvas-container').height();
        changeCanvasSize();
    });

    //canvas内リセット処理
    $('.canvasreset').on('click', function(){
        $('canvas').removeLayers();
        $('canvas').drawLayers();
    })

    $(window).resize(function() {
        //リサイズされたときの処理
        changeCanvasSize();
    });
    $('input[name="back-radio"]:radio' ).change( function() {
        console.log($('canvas').getLayer('background'));
        if ($('canvas').getLayer('background') !== undefined) {
            //背景レイヤーが存在する場合は削除してから再描画
            $('canvas').removeLayer('background');
        }
        var backgroundColor = $(this).attr('id').split('_')[1];
        console.log(backgroundColor);
        $('canvas').drawRect({
            layer: true,
            name: 'background',
            index: -1000,
            fillStyle: ColorCode.background[backgroundColor],
            x: 0,
            y: 0,
            width: parentWidth,
            height: parentHeight
        });
        $('canvas').drawLayers();
    });

    function chgCol(sentence, level, font, color){
        var width_min = 10;
        var height_min = 10;
        var width_max = parentWidth - 100 - width_min;
        var height_max = parentHeight - height_min;
        var fontSize;
        if (level === 'strong') {
            fontSize = 70;
        } else if ( level === 'normal') {
            fontSize = 40;
        } else if ( level === 'weak') {
            fontSize = 25;
        }
        height_random = Math.floor( Math.random() * height_max + 1 - height_min ) + height_min;
        width_random = Math.floor( Math.random() * width_max + 1 - width_min ) + width_min;
        
        $('canvas').drawText({
            layer: true,
            draggable: true,
            fillStyle: ColorCode.text[color],
            x: width_random, y: height_random,
            fontSize: fontSize,
            fontFamily: font,
            text: sentence
        },function(){
            $('canvas').drawLayers();
        });
    }

    //canvas内リセット処理
    function clearCanvas(){
        
    }
    //canvasのサイズ変更処理
    function changeCanvasSize(){
        parentWidth = $('.canvas-container').width();
        parentHeight = $('.canvas-container').height();
        // console.log(parentWidth);
        // console.log(parentHeight);
        $('#cv1').attr('width', parentWidth);
        $('#cv1').attr('height', parentHeight);
        $('canvas').drawLayers();
    }
})
