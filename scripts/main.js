"use strict";$(document).ready(function(){function e(){for(var e=[],t=0;t<20;t++)e.push(Math.floor(4*Math.random()));f.fullSequence=e}function t(e){null!==e&&(window.clearTimeout(e),e=null)}function o(){t(f.timeoutId),e(),f.start="on",f.steps=0,f.replayInterval=1e3,s(),f.playerSequence=[],i()}function n(e){return e<10&&(e="0"+e),e}function s(){f.steps+=1,$("#step-box").text(n(f.steps))}function i(){f.replaying=!0,t(f.timeoutId),f.timeoutId=window.setTimeout(u,f.replayInterval,f.fullSequence.slice(0,f.steps))}function u(e){var o=e[0];switch(o){case 0:$("#blue-piece").addClass("pushed"),f.timeoutId1=window.setTimeout(function(){$("#blue-piece").removeClass("pushed")},Math.floor(.9*f.replayInterval));break;case 1:$("#yellow-piece").addClass("pushed"),f.timeoutId1=window.setTimeout(function(){$("#yellow-piece").removeClass("pushed")},Math.floor(.9*f.replayInterval));break;case 2:$("#green-piece").addClass("pushed"),f.timeoutId1=window.setTimeout(function(){$("#green-piece").removeClass("pushed")},Math.floor(.9*f.replayInterval));break;case 3:$("#red-piece").addClass("pushed"),f.timeoutId1=window.setTimeout(function(){$("#red-piece").removeClass("pushed")},Math.floor(.9*f.replayInterval))}new Audio(f.audios[o]).play();var n=e.slice(1);0!==n.length?(t(f.timeoutId),f.timeoutId=window.setTimeout(u,f.replayInterval,n)):(f.replaying=!1,t(f.timeoutId),f.timeoutId=window.setTimeout(c,3e3,f.playerSequence.slice()))}function a(e,t){$("#step-box").text(e),window.setTimeout(function(){$("#step-box").text(""),window.setTimeout(function(){$("#step-box").text(e),window.setTimeout(function(){$("#step-box").text(""),window.setTimeout(function(){$("#step-box").text(e),window.setTimeout(function(){$("#step-box").text(n(f.steps)),t()},200)},200)},200)},200)},200)}function c(e){e.length===f.playerSequence.length&&new Audio(f.audios[4]).play(),a("!!",function(){f.playerSequence=[],i()})}function l(){f.replaying===!1&&f.playerSequence.length<f.steps&&$(this).addClass("pushed")}function r(){f.replaying===!1&&f.playerSequence.length<f.steps&&$(this).removeClass("pushed")}function p(){if(f.replaying===!1&&f.playerSequence.length<f.steps){var e;switch(this.id){case"blue-piece":e=0;break;case"yellow-piece":e=1;break;case"green-piece":e=2;break;case"red-piece":e=3}f.playerSequence.push(e),t(f.timeoutId);var n=f.playerSequence.every(function(e,t){return e===f.fullSequence[t]});n===!1?(new Audio(f.audios[4]).play(),a("!!",function(){f.playerSequence=[],"on"===f.strict?o():i()})):(new Audio(f.audios[e]).play(),4===f.steps?f.replayInterval=700:8===f.steps?f.replayInterval=500:12===f.steps&&(f.replayInterval=300),f.playerSequence.length!==f.steps?(t(f.timeoutId),f.timeoutId=window.setTimeout(c,3e3,f.playerSequence.slice())):20===f.steps?a("++",function(){o()}):(s(),f.playerSequence=[],i()))}}var f={onOff:"off",start:"off",strict:"off",fullSequence:[],playerSequence:[],replayInterval:1e3,steps:0,timeoutId:null,timeoutId1:null,replaying:!1,audios:["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3","https://s3.amazonaws.com/freecodecamp/simonSound2.mp3","https://s3.amazonaws.com/freecodecamp/simonSound3.mp3","https://s3.amazonaws.com/freecodecamp/simonSound4.mp3","http://www.soundjay.com/button/beep-03.mp3"]};$("#on-off-button").click(function(){f.onOff="off"===f.onOff?"on":"off","off"===f.onOff&&($(this).attr("x",-19),$("#step-box").attr("fill","#430710"),$("#step-box").text("--"),t(f.timeoutId)),"on"===f.onOff&&($(this).attr("x",0),$("#step-box").attr("fill","#c6070f"))}),$("#start-button").mousedown(function(){$(this).attr("transform","translate(0,2)")}),$("#start-button").mouseup(function(){$(this).attr("transform","translate(0,0)")}),$("#start-button").click(function(){"on"===f.onOff&&a("--",function(){o()})}),$("#strict-button").mousedown(function(){$(this).attr("transform","translate(0,2)")}),$("#strict-button").mouseup(function(){$(this).attr("transform","translate(0,0)")}),$("#strict-button").click(function(){f.strict="off"===f.strict?"on":"off","off"===f.strict&&$("#strict-light").attr("fill","#430710"),"on"===f.strict&&$("#strict-light").attr("fill","#c6070f")}),$("#blue-piece").mousedown(l),$("#green-piece").mousedown(l),$("#yellow-piece").mousedown(l),$("#red-piece").mousedown(l),$("#blue-piece").mouseup(r),$("#green-piece").mouseup(r),$("#yellow-piece").mouseup(r),$("#red-piece").mouseup(r),$("#blue-piece").click(p),$("#green-piece").click(p),$("#yellow-piece").click(p),$("#red-piece").click(p)});