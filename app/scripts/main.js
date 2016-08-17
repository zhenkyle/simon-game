$(document).ready(function() {
  'use strict';
  var myGame = {
    onOff: 'off',
    start: 'off',
    strict: 'off',
    fullSequence: [],
    playerSequence: [],
    replayInterval: 1000,
    steps: 0,
    timeoutId: null,
    timeoutId1: null,
    replaying: false,
    audios: ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    "http://www.soundjay.com/button/beep-03.mp3"
  ],
  };

  function generateFullSequence() {
    var arr = [];
    for (var i = 0; i < 20; i++)
      arr.push(Math.floor(Math.random() * 4));
    myGame.fullSequence = arr;
  }

  function clearTimeout(timeoutId) {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  $("#on-off-button").click(function() {
    myGame.onOff = myGame.onOff === 'off' ? 'on' : 'off';
    if (myGame.onOff === 'off') {
      $(this).attr("x", -19);
      $("#step-box").attr("fill", "#430710");
      $("#step-box").text("--");
      clearTimeout(myGame.timeoutId);
    }
    if (myGame.onOff === 'on') {
      $(this).attr("x", 0);
      $("#step-box").attr("fill", "#c6070f");
    }
  });

  $("#start-button").mousedown(function() {
    $(this).attr("transform", "translate(0,2)");
  });

  $("#start-button").mouseup(function() {
    $(this).attr("transform", "translate(0,0)");
  });

  $("#start-button").click(function() {
    if (myGame.onOff === "on")
      alertMsg("--", function() {
        restart();
      });
  });

  function restart() {
    clearTimeout(myGame.timeoutId);
    generateFullSequence();
    myGame.start = "on";
    myGame.steps = 0;
    myGame.replayInterval = 1000;
    stepsPlusOne();
    myGame.playerSequence = [];
    startReplay();
  }

  function checkNum(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }

  function stepsPlusOne() {
    myGame.steps += 1;
    $("#step-box").text(checkNum(myGame.steps));
  }

  function startReplay() {
    myGame.replaying = true;
    clearTimeout(myGame.timeoutId);
    myGame.timeoutId = window.setTimeout(replay, myGame.replayInterval, myGame.fullSequence.slice(0, myGame.steps));
  }

  function replay(arr) {
    var a = arr[0];
    switch (a) {
      case 0:
        $("#blue-piece").addClass("pushed");
        myGame.timeoutId1 = window.setTimeout(function() {
          $("#blue-piece").removeClass("pushed")
        }, Math.floor(myGame.replayInterval * 0.9));
        break;
      case 1:
        $("#yellow-piece").addClass("pushed");
        myGame.timeoutId1 = window.setTimeout(function() {
          $("#yellow-piece").removeClass("pushed")
        }, Math.floor(myGame.replayInterval * 0.9));
        break;
      case 2:
        $("#green-piece").addClass("pushed");
        myGame.timeoutId1 = window.setTimeout(function() {
          $("#green-piece").removeClass("pushed")
        }, Math.floor(myGame.replayInterval * 0.9));
        break;
      case 3:
        $("#red-piece").addClass("pushed");
        myGame.timeoutId1 = window.setTimeout(function() {
          $("#red-piece").removeClass("pushed")
        }, Math.floor(myGame.replayInterval * 0.9));
        break;
    }
    new Audio(myGame.audios[a]).play();
    var newArr = arr.slice(1);
    if (newArr.length !== 0) {
      clearTimeout(myGame.timeoutId);
      myGame.timeoutId = window.setTimeout(replay, myGame.replayInterval, newArr);
    }
    else {
      myGame.replaying = false;
      clearTimeout(myGame.timeoutId);
      myGame.timeoutId = window.setTimeout(inputTimeout, 3000, myGame.playerSequence.slice());
    }
  }

  function alertMsg(msg, callback) {
    $("#step-box").text(msg);
    window.setTimeout(function() {
      $("#step-box").text("");
      window.setTimeout(function() {
        $("#step-box").text(msg);
        window.setTimeout(function() {
          $("#step-box").text("");
          window.setTimeout(function() {
            $("#step-box").text(msg);
            window.setTimeout(function() {
              $("#step-box").text(checkNum(myGame.steps));
              callback();
            }, 200);
          }, 200)
        }, 200);
      }, 200);
    }, 200);

  }

  function inputTimeout(arr) {
    if (arr.length === myGame.playerSequence.length)
      new Audio(myGame.audios[4]).play();
      alertMsg("!!", function() {
        myGame.playerSequence = [];
        startReplay();
      });
  }

  $("#strict-button").mousedown(function() {
    $(this).attr("transform", "translate(0,2)");
  });

  $("#strict-button").mouseup(function() {
    $(this).attr("transform", "translate(0,0)");
  });

  $("#strict-button").click(function() {
    myGame.strict = myGame.strict === 'off' ? 'on' : 'off';
    if (myGame.strict === 'off')
      $("#strict-light").attr("fill", "#430710")
    if (myGame.strict === 'on')
      $("#strict-light").attr("fill", "#c6070f")
  });

  $("#blue-piece").mousedown(mousedownPiece);
  $("#green-piece").mousedown(mousedownPiece);
  $("#yellow-piece").mousedown(mousedownPiece);
  $("#red-piece").mousedown(mousedownPiece);

function mousedownPiece() {
  if (myGame.replaying === false && myGame.playerSequence.length < myGame.steps) {
  $(this).addClass("pushed");
}
}

$("#blue-piece").mouseup(mouseupPiece);
$("#green-piece").mouseup(mouseupPiece);
$("#yellow-piece").mouseup(mouseupPiece);
$("#red-piece").mouseup(mouseupPiece);

function mouseupPiece() {
if (myGame.replaying === false && myGame.playerSequence.length < myGame.steps) {
$(this).removeClass("pushed");
}
}

  $("#blue-piece").click(clickPiece);
  $("#green-piece").click(clickPiece);
  $("#yellow-piece").click(clickPiece);
  $("#red-piece").click(clickPiece);

  function clickPiece() {
    if (myGame.replaying === false && myGame.playerSequence.length < myGame.steps) {
      var i;
      switch (this.id) {
        case 'blue-piece':
          i = 0;
          break;
        case 'yellow-piece':
          i = 1;
          break;
        case 'green-piece':
          i = 2;
          break;
        case 'red-piece':
          i = 3;
          break;
      }
      myGame.playerSequence.push(i);
      clearTimeout(myGame.timeoutId);
      var is_same = myGame.playerSequence.every(function(element, index) {
        return element === myGame.fullSequence[index];
      });

      if (is_same === false) {
        new Audio(myGame.audios[4]).play();
        alertMsg("!!", function() {
          myGame.playerSequence = [];
          if (myGame.strict === 'on')
            restart();
          else
            startReplay();
        });
      } else {
        new Audio(myGame.audios[i]).play();
        if (myGame.steps === 4)
          myGame.replayInterval = 700;
        else if (myGame.steps === 8)
          myGame.replayInterval = 500;
          else if (myGame.steps === 12)
            myGame.replayInterval = 300;
        if (myGame.playerSequence.length !== myGame.steps) {
          clearTimeout(myGame.timeoutId);
          myGame.timeoutId = window.setTimeout(inputTimeout, 3000, myGame.playerSequence.slice());
        } else if (myGame.steps === 20) {
          // playerSequence are same as fullSequence
          alertMsg("++",function() {
            restart();
          });
        } else {
          // step complet and playerSequence is same as fullSequence.slice(0,playerSequence.length)
          stepsPlusOne();
          myGame.playerSequence = [];
          startReplay();
        }
      }
    }
  }
});
