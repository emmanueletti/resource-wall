/**
 * Function builds the entire search results page
 * @param {Array.<Object>} data - an array of objects with each object representing the resources created by a user
 * @returns {HTMLDivElement} an HTML div element to attach to the DOM element acting as the container for the page
 */
const buildSearchResultPage = (data) => {
  const searchedUsersName = document.createElement("span");
  searchedUsersName.appendChild(
    document.createTextNode(`${data[0]["auth_name"]}`)
  );
  const searchedUserH2 = document.createElement("h2");
  searchedUserH2.appendChild(document.createTextNode("Resources "));
  searchedUserH2.appendChild(searchedUsersName);
  searchedUserH2.appendChild(document.createTextNode(" has saved"));

  const searchCollection = document.createElement("div");
  searchCollection.className = "search-collection";
  // build individual resource cards
  data.forEach((resource) => {
    buildResourceCard(searchCollection, resource);
  });

  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";
  searchContainer.appendChild(searchedUserH2);
  searchContainer.appendChild(searchCollection);

  return searchContainer;
};

const renderSearchedUsersResources = () => {
  const userName = $(".nav__search-bar").val();

  if (!userName) {
    // implement an error message
    return;
  }
  // can we seperate all ajax / network requests into a seperate "network.js" location?
  // get users collection data
  $.get(`/api/resources/search/?u=${userName}`)
    .done((data) => {
      // empty page
      $(".container").empty();

      // display error if no resources returned from server
      if (!data.length) {
        $(".container").html(
          "<h1 style='text-align:center;'> No resources found </h1>"
        );
        return;
      }

      // sort the data by data
      sortArrayByDate(data);

      // build and render page
      $(".container").append(buildSearchResultPage(data));
    })
    .fail((err) => {
      console.log(err.stack);
    });
};
