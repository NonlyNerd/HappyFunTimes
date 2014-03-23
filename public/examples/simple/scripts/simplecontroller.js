/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

// Require will call this with input and GameClient once input.js and gameclient.js have loaded
var main = function(input, GameClient) {
  var score = 0;
  var statusElem = document.getElementById("status");
  var inputElem = document.getElementById("input");
  var gameName = "simple"
  var client = new GameClient(gameName);

  var randInt = function(range) {
    return Math.floor(Math.random() * range);
  };

  client.addEventListener('connect', function() {
    statusElem.innerHTML = "you've connected to the relayserver";
  });

  client.addEventListener('disconnect', function() {
    statusElem.innerHTML = "you were disconnected from the relayserver";
  });

  // Sends a move command to the game.
  //
  // This will generate a 'move' event in the corresponding
  // NetPlayer object in the game.
  var sendMoveCmd = function(position) {
    client.sendCmd('move', {
      x: position.x,
      y: position.y,
    });
  };

  // Pick a random color
  var color =  'rgb(' + randInt(256) + "," + randInt(256) + "," + randInt(256) + ")";
  // Send the color to the game.
  //
  // This will generate a 'color' event in the corresponding
  // NetPlayer object in the game.
  client.sendCmd('color', {
    color: color,
  });
  inputElem.style.backgroundColor = color;

  // Send a message to the game when the screen is touched
  inputElem.addEventListener('touchmove', function(event) {
    sendMoveCmd(input.getRelativeCoordinates(event.target, event.touches[0]));
    event.preventDefault();
  });

  inputElem.addEventListener('mousemove', function(event) {
    sendMoveCmd(input.getRelativeCoordinates(event.target, event));
  });

  // Update our score when the game tells us.
  client.addEventListener('scored', function(cmd) {
    score += cmd.points;
    statusElem.innerHTML = "You scored: " + cmd.points + " total: " + score;
  });
};

// Start the main app logic.
requirejs(
  [ '../../scripts/input',
    '../../../scripts/gameclient',
  ],
  main
);


