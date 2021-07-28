// initial  load
$(document).ready(() => {
  // load initial event listeners for first page
  // toggle nav bar visibility
  $(".nav__dropdown-icon").click((e) => {
    $(".nav__dropdown-menu").slideToggle();
  });

  const usernames = [
    { user_name: "bobby" },
    { user_name: "bobba" },
    { user_name: "casey" },
    { user_name: "hansel" },
  ];
  // get user names for search bar
  usernames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name["user_name"];
    console.log(option);
    $("#users-datalist").prepend(option);
    console.log($("#users-datalist").children());
  });

  // set the user cookie to a desired user
  $("#login-btn").click((e) => {
    e.preventDefault();
    const userID = $("#userID-input").val();
    $.get(`/login/${userID}`)
      .done(() => {
        renderCollectionPage();
      })
      .fail((err) => {
        console.log(err.stack);
      });
  });

  // show all resources created when 'explore' is clicked
  $("#explore").click((e) => {
    e.preventDefault();
    renderAllResources();
  });

  // render users collection of resources
  // user-collection.js
  $("#user-collection").click((e) => {
    e.preventDefault();
    renderCollectionPage();
  });

  // render form to create new resource
  $(".nav__cta").click((e) => {
    e.preventDefault();
    renderNewResourceForm();
  });

  // render resources from search from user
  $("#search-user-resources").submit((e) => {
    e.preventDefault();
    renderSearchedUsersResources();
  });
});

// could we make it so that each on click initiates a netwrok call here and passes data to the rendering functions
// call network functions can placed in a network.js file
// this would give more opportunities to DRY the construction functions
