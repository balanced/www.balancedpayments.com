$(document).ready(function() {
  var calculateEstimatedRates = function() {
    var volume = $(".calculator form input[name='estimatedVolume']").val();

    volume = parseInt(volume.replace(/[^\d\.]/g,''));

    if(isNaN(volume)) {
      $(".effective-rate-value").text("");
      return "";
    }

    var vol100k = 0.029 * Math.min(volume, 100000);
    var vol400k = 0.027 * (volume > 100000 ? Math.min(volume-100000, 400000) : 0);
    var vol500kplus = 0.024 * (volume > 500000 ? (volume-500000) : 0);

    var rateText = "2.9% + 30¢";
    if(volume > 100000) {
      rate = (vol100k + vol400k + vol500kplus)/volume;
      rateText = (rate * 100).toFixed(2) + "% + 30¢";
    }

    $(".effective-rate-value").text(rateText);
    return rateText;
  };

  calculateEstimatedRates()

  $(".calculator form input").on('input', function() {
    calculateEstimatedRates();
  });
});
