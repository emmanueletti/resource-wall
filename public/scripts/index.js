// initial  load
$(document).ready(() => {
  // load initial event listeners for first page
  // nav bar
  $(".nav__dropdown-icon").click((e) => {
    $(".nav__dropdown-menu").slideToggle();
  });

  $("#user-collection").click(() => {
    //
    // my collection page
    // 1-get data
    getCollectionPage();
    // 2-build page components
    // 3-render page
  });
});
