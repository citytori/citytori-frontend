var sounds = require("./sounds");
var api = require('./api');

// register name
function register(name) {
	api.sessionCreate({ name: name }).done(function (data) {
		console.log(data);
		if (data.status == "OK") {
			$.cookie("name", name);
			$.cookie("userId", data.userId);
			game.transition('selectPlayMode', 'ようこそ「' + $.cookie('name') + '」 プレイ人数を選択してね！');
		} else {
			$("#description").text("別の名前を入力してね！");
			$("#name").select();
		}
	});
};

// make room
function makeroom(userId, name, gameMode, wordNum, limitTime){
	sounds.sound_title_pause();

	api.roomsCreate({
		userId: userId, name: name, gameMode: gameMode, wordNum: wordNum, limitTime: limitTime
	}).done(function (data) {
		$.cookie("roomId", data.id);

		if (limitTime == 0) {
			//transition to timeattack
			$.cookie("resultType", 'Time');
			$.cookie("wordNum", wordNum);
			game.transition('playGameSingle', 'タイムアタック!');
		} else if (wordNum == 0) {
			//trainsition to scoreattack !!!!!!!!!!!!!!!!!!! need to change true link !!!!!!!!!!!!!!!!!!!!!!
			$.cookie("resultType", 'Score');
			$.cookie("limitTime", limitTime);
			game.transition('playGameSingle', 'タイムアタック!');
		}
	});
};

// send score and get ranking
function sendranking(){
	var userId = $("#userId").text();
	var roomId = $("#roomId").text();
	var resultTime = parseFloat($("#resulttime").val());
	var rankCount = parseInt($("#rankCount").val());
	userId = "565d957a575db0e4f23e25b6";
	roomId = "565d957b575db0e4f33e25b6";
	resultTime = 24;
	rankCount = 0;

	api.ranksIndex({
		userId: userId,
		roomId: roomId,
		resultTime: resultTime,
		rankCount: rankCount,
	}).done(function (data) {
		var arraySize = Object.keys(json.ranking).length;

		for (var i = 0; i < arraySize; i++) {
			if (json.ranking[i].name == "Mr. シティとり") {
				$("#ranking").append("<span id=\"myscore\">- 今回の成績 -<br>" + (i + 1) + "位</br>" + json.ranking[i].name + "</br>" + json.ranking[i].score + " 秒</br><HR></span>");
			} else {
				$("#ranking").append("<span>" + (i + 1) + "位</br>" + json.ranking[i].name + "</br>" + json.ranking[i].score + " 秒</br><HR></span>");
			}
		}

		$("#ranking").append("<br>");

		for (var i=0; i < arraySize; i++) {
			if(json.ranking[i].name == "Mr. シティとり") {
				v = i;
				break;
			}
		}
		var v = i * 131 * $("#main_in").width() / 1500;
		$("#rankingboard").scrollTop(v);
	});
};


// about register button
$("#register_off").mousedown(function(){
	$(this).css({
		"background": $(this).css("background").replace("_off","_on")
	});
	sounds.sound_button();
});

$("#register_off").mouseup(function(){
	$(this).css({
		"background": $(this).css("background").replace("_on","_off")
	});
	if($("#name").val() != ""){
		register($("#name").val());
	}
});

$("#register_off").mouseout(function(){
	$(this).css({
		"background": $(this).css("background").replace("_on","_off")
	});
});

// about ok button
$(document).on("mousedown", ".ok", function(){
	$(this).css({
		"background": $(this).css("background").replace(".png","_dummy.png")
	});
	sounds.sound_button();
});

$(document).on("mouseup", ".ok", function(){
	$(this).css({
		"background": $(this).css("background").replace("_dummy.png",".png")
	});
	if($(this).attr("id") == "playsingle"){
		game.transition('selectLimitTimeForSinglePlay', 'スコアアタックの制限時間を選択してね！');
	}else{
		game.transition('selectMultiPlayMode', '遊ぶモードを選んでね');
	}
});

$(document).on("mouseout", ".ok", function(){
	$(this).css({
		"background": $(this).css("background").replace("_dummy.png",".png")
	});
});

// about ok2 button
$(document).on("mousedown", ".ok2", function(){
	$(this).css({
		"background": $(this).css("background").replace(".png","_dummy.png")
	});
	sounds.sound_button();
});

$(document).on("mouseup", ".ok2", function(){

	$(this).css({
		"background": $(this).css("background").replace("_dummy.png",".png")
	});
	if($(this).attr("id") == "playsingle1minute"){
			makeroom($.cookie("userId"), $.cookie("name"), "Score", 0, 1);
	}else if($(this).attr("id") == "playsingle3minutes"){
			makeroom($.cookie("userId"), $.cookie("name"), "Score", 0, 3);
	}else if($(this).attr("id") == "playsingle5minutes"){
			makeroom($.cookie("userId"), $.cookie("name"), "Score", 0, 5);
	}else{
		game.transition('configMultiplayPlayMode', 'ゲームモードを選択してね');
	}
});

$(document).on("mouseout", ".ok2", function(){
	$(this).css({
		"background": $(this).css("background").replace("_dummy.png",".png")
	});
});

// about setting button
$(document).on("mousedown", ".setting", function(){
	$(this).css({
		"background": $(this).css("background").replace(".png","_dummy.png")
	});
	sounds.sound_button();
});

$(document).on("mouseup", ".setting", function(){

	sounds.sound_title_pause();

	$(this).css({
		"background": $(this).css("background").replace("_dummy.png",".png")
	});
	if($(this).attr("id") == "configedtimeattack"){
		if(parseInt($("#wordnum").val()) > 0){
			makeroom($.cookie("userId"), $.cookie("name"), "Time", parseInt($("#wordnum").val()), 0);
		}
	}else if($(this).attr("id") == "configedscoreattack"){
		if(parseInt($("#limittime").val()) > 0){
			makeroom($.cookie("userId"), $.cookie("name"), "Score", 0, parseInt($("#limittime").val()));
		}
	}
});

$(document).on("mouseout", ".setting", function(){
	$(this).css({
		"background": $(this).css("background").replace("_dummy.png",".png")
	});
});

// background scrool
$(function() {
	var bgscx1 = 3500;
	setInterval(function(){
		bgscx1 += 1;
		$("#main_cloud").css({
			"background-position": bgscx1 + "px"
		});
	},150);
	var bgscx2 = 1000;
	setInterval(function(){
		bgscx2 += 1;
		$("#main_bird").css({
			"background-position": bgscx2 + "px"
		});
	},75);
});
