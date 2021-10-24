export const drawTrebleClef = (outerCtx, x, y, y_size, fillStyleForeground, fillStyleBackground) => {
  /*
      (retrieved ~2021-10-23 18:00:00 EDT from https://www.mobilefish.com/popupwindow/html_canvas_help_all.php?help=treble_clef)
      Music symbol treble clef v. 2.0
      Author: Robert Lie
      www.mobilefish.com
      
      This file is public domain. You can use it for any purpose without restriction.
      I do not guarantee that it is correct, so use it at your own risk. 
      If you use it for something interesting, I'd appreciate hearing about it. 
      If you find any bugs or make any improvements, I'd appreciate hearing about those too.
      It would also be nice if my name and URL were left in the comments. But none of that is required.
  */
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 890;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = fillStyleForeground;
  ctx.beginPath();
  ctx.moveTo(159,3);
  ctx.quadraticCurveTo(129,50,117,93);
  ctx.quadraticCurveTo(107,126,102,167);
  ctx.quadraticCurveTo(101,192,102,210);
  ctx.quadraticCurveTo(107,255,116,297);
  ctx.quadraticCurveTo(63,351,44,375);
  ctx.quadraticCurveTo(24,401,15,429);
  ctx.quadraticCurveTo(2,464,3,503);
  ctx.quadraticCurveTo(5,540,20,575);
  ctx.quadraticCurveTo(29,596,48,615); 
  ctx.quadraticCurveTo(62,630,87,645); 
  ctx.quadraticCurveTo(113,660,150,666);
  ctx.quadraticCurveTo(177,668,194,665); 
  ctx.quadraticCurveTo(204,720,213,776);
  ctx.quadraticCurveTo(216,795,216,813);
  ctx.quadraticCurveTo(203,849,158,857);
  ctx.quadraticCurveTo(132,857,120,842);
  ctx.quadraticCurveTo(152,845,166,813);
  ctx.quadraticCurveTo(165,821,168,802); 
  ctx.quadraticCurveTo(166,775,151,765); 
  ctx.quadraticCurveTo(132,750,107,758);
  ctx.quadraticCurveTo(86,768,78,789);
  ctx.quadraticCurveTo(71,818,90,840);
  ctx.quadraticCurveTo(105,857,129,865); 
  ctx.quadraticCurveTo(149,872,177,865); 
  ctx.quadraticCurveTo(194,860,209,846);
  ctx.quadraticCurveTo(231,828,230,803);
  ctx.quadraticCurveTo(221,735,207,662);
  ctx.quadraticCurveTo(248,650,267,626);
  ctx.quadraticCurveTo(293,599,296,566);
  ctx.quadraticCurveTo(300,527,285,494);
  ctx.quadraticCurveTo(270,462,234,444);
  ctx.quadraticCurveTo(215,435,189,435);
  ctx.quadraticCurveTo(177,435,164,438);
  ctx.quadraticCurveTo(155,396,146,354);
  ctx.quadraticCurveTo(183,315,203,275);
  ctx.quadraticCurveTo(219,243,222,210);
  ctx.quadraticCurveTo(227,167,221,137);
  ctx.quadraticCurveTo(213,93,192,51);
  ctx.quadraticCurveTo(180,29,159,3);

  ctx.fill();

  ctx.globalCompositeOperation = 'xor';
  ctx.fillStyle = fillStyleBackground;
  ctx.beginPath();
  ctx.moveTo(191,93);
  ctx.quadraticCurveTo(179,83,171,93);
  ctx.quadraticCurveTo(126,162,131,281);
  ctx.quadraticCurveTo(188,239,203,188);
  ctx.quadraticCurveTo(209,162,204,135);
  ctx.quadraticCurveTo(200,111,191,93);
  ctx.fill();

  ctx.fillStyle = fillStyleBackground;
  ctx.beginPath();
  ctx.moveTo(171,473);
  ctx.quadraticCurveTo(188,555,206,648); 
  ctx.quadraticCurveTo(237,639,255,620);
  ctx.quadraticCurveTo(283,588,283,558);
  ctx.quadraticCurveTo(285,525,269,501);
  ctx.quadraticCurveTo(252,476,216,470);
  ctx.quadraticCurveTo(194,465,171,473);

  ctx.fill();

  ctx.fillStyle = fillStyleBackground;
  ctx.beginPath();
  ctx.moveTo(147,446);
  ctx.quadraticCurveTo(141,411,132,369);
  ctx.quadraticCurveTo(90,401,68,435);
  ctx.quadraticCurveTo(45,467,39,503);
  ctx.quadraticCurveTo(30,540,45,576);
  ctx.quadraticCurveTo(60,612,92,633);
  ctx.quadraticCurveTo(123,651,161,654);
  ctx.quadraticCurveTo(174,654,188,653);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  ctx.fillStyle = fillStyleForeground;
  ctx.beginPath();
  ctx.moveTo(147,444);
  ctx.quadraticCurveTo(120,456,101,480);
  ctx.quadraticCurveTo(83,504,84,536);
  ctx.quadraticCurveTo(86,567,107,588);
  ctx.quadraticCurveTo(114,597,126,605);
  ctx.quadraticCurveTo(116,593,107,581);
  ctx.quadraticCurveTo(95,560,99,537);
  ctx.quadraticCurveTo(105,509,132,491);
  ctx.quadraticCurveTo(143,482,164,476);

  ctx.fill();
  outerCtx.drawImage(canvas, x, y, 320*(y_size/890), y_size);
};

export const drawBassClef = (outerCtx, x, y, y_size, fillStyleForeground, fillStyleBackground) => {
  /*
      (retrieved ~2021-10-23 18:00:00 EDT from https://www.mobilefish.com/popupwindow/html_canvas_help_all.php?help=bass_clef)
      Music symbol bass clef v. 2.0
      Author: Robert Lie
      www.mobilefish.com
      
      This file is public domain. You can use it for any purpose without restriction.
      I do not guarantee that it is correct, so use it at your own risk. 
      If you use it for something interesting, I'd appreciate hearing about it. 
      If you find any bugs or make any improvements, I'd appreciate hearing about those too.
      It would also be nice if my name and URL were left in the comments. But none of that is required.
  */

  const canvas = document.createElement('canvas');
  canvas.width = 328;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = fillStyleForeground;
  ctx.beginPath();
  ctx.moveTo(18,354);
  ctx.quadraticCurveTo(18,351,18,347);
  ctx.quadraticCurveTo(80,326,98,311);
  ctx.quadraticCurveTo(161,268,173,239);
  ctx.quadraticCurveTo(183,219,187,199);
  ctx.quadraticCurveTo(194,142,194,117);
  ctx.quadraticCurveTo(194,100,191,83);
  ctx.quadraticCurveTo(189,68,181,53);
  ctx.quadraticCurveTo(175,38,161,29);
  ctx.quadraticCurveTo(148,19,131,17);
  ctx.quadraticCurveTo(120,16,109,18);
  ctx.quadraticCurveTo(98,19,88,24);
  ctx.quadraticCurveTo(67,32,52,50);
  ctx.quadraticCurveTo(38,68,40,97);
  ctx.quadraticCurveTo(52,86,69,88);
  ctx.quadraticCurveTo(86,89,96,102);
  ctx.quadraticCurveTo(101,108,105,122);
  ctx.quadraticCurveTo(106,132,102,141);
  ctx.quadraticCurveTo(93,157,77,160);
  ctx.quadraticCurveTo(49,166,28,148);
  ctx.quadraticCurveTo(9,128,14,100);
  ctx.quadraticCurveTo(20,73,38,52);
  ctx.quadraticCurveTo(56,31,82,23);
  ctx.quadraticCurveTo(108,14,136,16);
  ctx.quadraticCurveTo(164,16,188,26);
  ctx.quadraticCurveTo(239,48,257,99);
  ctx.quadraticCurveTo(267,137,256,174);
  ctx.quadraticCurveTo(238,226,197,260);
  ctx.quadraticCurveTo(152,299,107,321);
  ctx.quadraticCurveTo(66,342,18,354);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(304, 69, 24, 0, (2*Math.PI), true);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(304, 162, 24, 0, (2*Math.PI), true);
  ctx.fill();

  outerCtx.drawImage(canvas, x, y, 328*(y_size/360), y_size);
};