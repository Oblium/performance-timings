var timings = new lmnUiPerformances.default(window.performance);
timings.getNetworkLatency(function(t) {
  document.getElementById('target').innerHTML += "netLatency: " + t + "<br />";
});
timings.getPageLoad(function(t) {
  document.getElementById('target').innerHTML += "loadTime: " + t + "<br />";
});
timings.getTotalTime(function(t) {
  document.getElementById('target').innerHTML += "totalTime: " + t + "<br />";
});
timings.asJson(function(t) {
  document.getElementById('target').innerHTML += "asJson: " + JSON.stringify(t) + "<br />";
});