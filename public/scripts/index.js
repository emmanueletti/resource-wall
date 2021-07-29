// initial  load
$(document).ready(() => {
  // load initial event listeners for first page
  // toggle nav bar visibility
  $(".nav__dropdown-icon").click((e) => {
    $(".nav__dropdown-menu").slideToggle();
  });

  // get all user names for search bar
  $.get("/api/users").done((data) => {
    data.sort();
    data.forEach((name) => {
      const option = document.createElement("option");
      option.value = name["user_name"];
      $("#users-datalist").prepend(option);
    });
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

  // render users collection of resources
  // user-collection.js
  $("#user-collection").click((e) => {
    e.preventDefault();
    renderCollectionPage();
  });

  // render category management page
  $("#manage-categories").click((e) => {
    e.preventDefault();

    // get users categories from backend
    $.get("/api/categories")
      .done((data) => {
        renderManageCategoriesPage(data);
      })
      .fail((err) => {
        console.log(err.stack);
      });
  });

  // render form to create new resource
  $(".nav__cta").click((e) => {
    e.preventDefault();
    renderNewResourceForm();
  });

  // render resources from search from user
  $("#search-user-resources").submit((e) => {
    e.preventDefault();

    const data = $(".nav__search-bar").val();
    // get users categories
    renderSearchedUsersResources(data);
  });
});

// could we make it so that each on click initiates a netwrok call here and passes data to the rendering functions
// call network functions can placed in a network.js file
// this would give more opportunities to DRY the construction functions
