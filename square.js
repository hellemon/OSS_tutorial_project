const ss = function (rtm, text, channel) {
  console.log('square log');
  console.log(text);
  rtm.sendMessage(`The result is ${text * text}`, channel);
};

module.exports = ss;
