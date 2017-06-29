 var canvas = document.getElementById('sketch');
 var context = canvas.getContext('2d');

 canvas.width = $('#sketchContainer').outerWidth();
 canvas.height = (canvas.width / 800) * 400;
 $('#sketchContainer').outerHeight(String(canvas.height) + "px", true);

 var oWidth = canvas.width;
 var oHeight = canvas.height;
 var lines = [];

 var lastMouse = {
     x: 0,
     y: 0
 };

 var ongoingTouches = [];

 context.lineWidth = 2;
 context.lineJoin = 'round';
 context.lineCap = 'round';
 context.strokeStyle = '#000';

 canvas.addEventListener('mousedown', function(e) {
     lastMouse = {
         x: e.pageX - this.offsetLeft,
         y: e.pageY - this.offsetTop
     };
     canvas.addEventListener('mousemove', move, false);
 }, false);

 canvas.addEventListener('mouseout', function() {
     canvas.removeEventListener('mousemove', move, false);
 }, false);

 canvas.addEventListener('mouseup', function() {
     canvas.removeEventListener('mousemove', move, false);
 }, false);

 canvas.addEventListener('touchstart', touchstart, false);
 canvas.addEventListener('touchend', touchend, false);
 canvas.addEventListener('touchcancel', touchcancel, false);
 canvas.addEventListener('touchleave', touchend, false);
 canvas.addEventListener('touchmove', touchmove, false);

 function setSize(size) {
     context.lineWidth = size;
 }

 function setColor(color) {
     context.globalCompositeOperation = 'source-over';
     context.strokeStyle = color;
 }

 function eraser() {
     context.globalCompositeOperation = 'destination-out';
     context.strokeStyle = 'rgba(0,0,0,1)';
 }

 function clear(send) {
     var m = confirm("Do you want to clear the picture?");
     if (m) {
         context.clearRect(0, 0, canvas.width, canvas.height);
         lines = [];
         if (send && TogetherJS.running) {
             TogetherJS.send({
                 type: 'clear'
             });
         }
     }
 }

 function reDraw(lines) {
     for (var i in lines) {
         draw(lines[i][0], lines[i][1], lines[i][2], lines[i][3], lines[i][4], false);
     }
 }

 function draw(start, end, color, size, compositeOperation, save) {
     context.save();
     context.lineJoin = 'round';
     context.lineCap = 'round';
     context.scale(canvas.width / 800, canvas.height / 400);
     context.strokeStyle = color;
     context.globalCompositeOperation = compositeOperation;
     context.lineWidth = size;
     context.beginPath();
     context.moveTo(start.x, start.y);
     context.lineTo(end.x, end.y);
     context.closePath();
     context.stroke();
     context.restore();
     if (save) {
         lines.push([{
             x: start.x,
             y: start.y
         }, {
             x: end.x,
             y: end.y
         }, color, size, compositeOperation]);
     }
 }

 function move(e) {
     var mouse = {
         x: e.pageX - this.offsetLeft,
         y: e.pageY - this.offsetTop
     };
     sendMouse = {
         x: (800 / canvas.width) * mouse.x,
         y: (400 / canvas.height) * mouse.y
     };
     sendLastMouse = {
         x: (800 / canvas.width) * lastMouse.x,
         y: (400 / canvas.height) * lastMouse.y
     };
     draw(sendLastMouse, sendMouse, context.strokeStyle, context.lineWidth, context.globalCompositeOperation, true);
     if (TogetherJS.running) {
         TogetherJS.send({
             type: 'draw',
             start: sendLastMouse,
             end: sendMouse,
             color: context.strokeStyle,
             size: context.lineWidth,
             compositeOperation: context.globalCompositeOperation
         });
     }
     lastMouse = mouse;
 }

 function convertTouch(touch) {
     return {
         x: (800 / canvas.width) * (touch.pageX - canvas.offsetLeft),
         y: (400 / canvas.height) * (touch.pageY - canvas.offsetTop),
         identifier: touch.identifier
     };
 }

 function searchOngoingTouches(identifier) {
     for (var i = 0; i < ongoingTouches.length; i++) {
         if (ongoingTouches[i].identifier == identifier) {
             return i;
         }
     }
     return -1;
 }

 function touchstart(e) {
     e.preventDefault();
     var touches = e.changedTouches;
     for (var i = 0; i < touches.length; i++) {
         var idx = searchOngoingTouches(touches[i].identifier);
         ongoingTouches.push(convertTouch(touches[i]));
     }
 }

 function touchmove(e) {
     e.preventDefault();
     var touches = e.changedTouches;
     for (var i = 0; i < touches.length; i++) {
         var idx = searchOngoingTouches(touches[i].identifier);
         if (idx >= 0) {
             var lastTouch = ongoingTouches[idx];
             var touch = convertTouch(touches[i]);
             draw(lastTouch, touch, context.strokeStyle, context.lineWidth, context.globalCompositeOperation, true);
             if (TogetherJS.running) {
                 TogetherJS.send({
                     type: 'draw',
                     start: lastTouch,
                     end: touch,
                     color: context.strokeStyle,
                     size: context.lineWidth,
                     compositeOperation: context.globalCompositeOperation
                 });
             }
             ongoingTouches.splice(idx, 1, touch);
         }
     }
 }

 // Called whenever touchend or touchleave events are fired
 function touchend(e) {
     e.preventDefault();
     var touches = e.changedTouches;
     for (var i = 0; i < touches.length; i++) {
         var idx = searchOngoingTouches(touches[i].identifier);
         if (idx >= 0) {
             var lastTouch = ongoingTouches[idx];
             var touch = convertTouch(touches[i]);
             draw(lastTouch, touch, context.strokeStyle, context.lineWidth, context.globalCompositeOperation, true);
             if (TogetherJS.running) {
                 TogetherJS.send({
                     type: 'draw',
                     start: lastTouch,
                     end: touch,
                     color: context.strokeStyle,
                     size: context.lineWidth,
                     compositeOperation: context.globalCompositeOperation
                 });
             }
             ongoingTouches.splice(idx, 1);
         }
     }
 }

 function touchcancel(e) {
     e.preventDefault();
     var touches = e.changedTouches;
     for (var i = 0; i < touches.length; i++) {
         var idx = searchOngoingTouches(touches[i].identifier);
         if (idx >= 0) {
             ongoingTouches.splice(idx, 1);
         }
     }
 }

 TogetherJS.hub.on('draw', function(msg) {
     if (!msg.sameUrl) {
         return;
     }
     draw(msg.start, msg.end, msg.color, msg.size, msg.compositeOperation, true);
 });


 TogetherJS.hub.on('clear', function(msg) {
     if (!msg.sameUrl) {
         return;
     }
     clear(false);
 });

 TogetherJS.hub.on('togetherjs.hello', function() {
     TogetherJS.send({
         type: 'init',
         lines: lines
     });
 });

 TogetherJS.hub.on('init', function(msg) {
     reDraw(msg.lines);
     lines = msg.lines;
 });

 $(document).ready(function() {
     function changeMouse() {
         var cursorSize = context.lineWidth * (canvas.width / 800);
         if (cursorSize < 10) {
             cursorSize = 10;
         }
         var cursorColor = context.strokeStyle;
         var cursorGenerator = document.createElement('canvas');
         cursorGenerator.width = cursorSize;
         cursorGenerator.height = cursorSize;
         var ctx = cursorGenerator.getContext('2d');

         var centerX = cursorGenerator.width / 2;
         var centerY = cursorGenerator.height / 2;

         ctx.beginPath();
         ctx.arc(centerX, centerY, (cursorSize / 2) - 4, 0, 2 * Math.PI, false);
         ctx.lineWidth = 3;
         ctx.strokeStyle = cursorColor;
         ctx.stroke();
         $('#sketch').css('cursor', 'url(' + cursorGenerator.toDataURL('image/png') + ') ' + cursorSize / 2 + ' ' + cursorSize / 2 + ',crosshair');
     }
     changeMouse();

     $(window).resize(function() {
         if ($('#sketchContainer').width() != oWidth) {
             canvas.width = $('#sketchContainer').width();
             canvas.height = (canvas.width / 800) * 400;
             $('#sketchContainer').outerHeight(String(canvas.height) + "px", true);
             var ratio = canvas.width / oWidth;
             oWidth = canvas.width;
             oHeight = canvas.height;
             reDraw(lines);
             changeMouse();
         }
     });

     $('.clear').click(function() {
         clear(true);
     });

     $('.color-picker').click(function() {
         var $this = $(this);
         console.log($this);
         setColor($this.css("background-color"));
         changeMouse();
     });

     $('.eraser').click(function() {
         eraser();
         changeMouse();
     });
     // TogetherJS user color:
     $('.user-color-pick').click(function() {
         setColor(TogetherJS.require('peers').Self.color);
         changeMouse();
     });

     // Increase/decrease brush size:
     $('.plus-size').click(function() {
         setSize(context.lineWidth + 3);
         changeMouse();
     });

     $('.minus-size').click(function() {
         if (context.lineWidth > 3) {
             setSize(context.lineWidth - 3);
         }
         changeMouse();
     });
 });
