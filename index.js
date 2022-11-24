const { RTMClient } = require("@slack/rtm-api");
const fs = require("fs");
const greeting = require("./greeting");
const haksa = require("./haksa");
const square = require("./square");
require("dotenv").config();

let token;
try {
  token = fs.readFileSync("./token").toString("utf-8");
} catch (err) {
  console.error(err);
}

const rtm = new RTMClient(token);

rtm.start();

rtm.on("message", (message) => {
  const { channel } = message;
  const { text } = message;

  if (!Number.isNaN(Number(text))) {
    square(rtm, text, channel);
  } else {
    // switch문 정규식 사용을 위한 테스트 변경, 추후 수정 가능성 있음
    switch (true) {
      case text.toLowerCase() === "hi":
        greeting(rtm, channel);
        break;
      case /^([1-9]|1[0-2])\/([1-9]|[12][0-9]|3[01])$/.test(text):
        haksa(rtm, channel, text);
        break;
      default:
        rtm.sendMessage("I`m alive", channel);
    }
  }
});
