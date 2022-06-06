"use strict";
// var myAudio = new Audio(chrome.runtime.getURL("resources/audio/quack.mp3"));

chrome.alarms.onAlarm.addListener(function () {
  chrome.browserAction.setBadgeText({ text: "" });

  chrome.storage.sync.get(
    {
      soundEnabled: true,
    },
    function (result) {
      if (result.soundEnabled) {
        // myAudio.play();
      }
    }
  );

  chrome.notifications.create({
    type: "basic",
    iconUrl: "resources/img/ducky.png",
    title: "Time's up!",
    message: "Quack!",
    buttons: [{ title: "You set an alarm to ring now." }],
    priority: 0,
  });
});

chrome.notifications.onButtonClicked.addListener(function () {
  chrome.storage.sync.get(["minutes"], function (item) {
    chrome.browserAction.setBadgeText({ text: "ON" });
    chrome.alarms.create({ delayInMinutes: item.minutes });
  });
});
