function formatDate(date) {
  return {
    localeString: date.toLocaleString(),
    unixTimeMs: date.getTime(),
    unixTimeSec: Math.floor(date.getTime() / 1000),
  };
}

function setTimesInDom(mapIdToString) {
  Object.keys(mapIdToString).forEach(function (elementId) {
    document.getElementById(elementId).innerHTML = mapIdToString[elementId];
  });
}

function updateLoadTime() {
  var timeFormats = formatDate(new Date());
  setTimesInDom({
    'locale-timestamp': timeFormats.localeString,
    'unix-timestamp-ms': timeFormats.unixTimeMs,
    'unix-timestamp-sec': timeFormats.unixTimeSec,
  });
}

// set it initially, then update every second
updateLoadTime();
setInterval(updateLoadTime, 1000);
