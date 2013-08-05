$(document).ready(function() {
  // highlight the active nav tab
  var pathname = window.location.pathname;

  $(".sidebar-menu .nav a").each(function(index) {
      if (pathname.indexOf($(this).attr('href')) != -1) {
        $(this).removeClass("nav2");
        $(this).addClass("nav3");
      }
  });
});
