// initial  load
$(document).ready(() => {
  // load initial event listeners for first page
  // nav bar
  $(".nav__dropdown-icon").click((e) => {
    $(".nav__dropdown-menu").slideToggle();
  });

  $("#user-collection").click((e) => {
    e.preventDefault();
    renderCollectionPage();
  });

  $(".nav__cta").click((e) => {
    e.preventDefault();
    renderNewResourceForm();
  });
});
