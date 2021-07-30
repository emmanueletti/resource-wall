/**
 * Sorts an array of resources data in place from most recently created resources to the oldest
 * @param {Array.<Object>} data - an array of objects with each object representing a resource
 * @returns {undefined} array is sorted in place; no return value
 */
const sortArrayByDate = (data) => {
  data.sort((a, b) => {
    const first = new Date(a.res_timestamp);
    const second = new Date(b.res_timestamp);
    if (first > second) return -1;
    if (first < second) return 1;
    return 0;
  });
};

/**
 * Function grabs container that holds the resources card from DOM and adds a delegated click event that builds and renders a page for the individual resource clicked
 * @param {Object} container - an JQuery DOM object representing the container the resource cards are attached to
 */
const addDelegatedResourceEvent = (container) => {
  container.click((e) => {
    const card = e.target.closest(".resource-card");
    if (!card) {
      return;
    }
    // if clicked - render page for individual resource
    // this is a test of seperating the netowkr call from the construction function - refer to notes at the bottom of index.js
    const resourceID = card.dataset.resourceId;

    const resourcePromise = $.get(`/api/resources/${resourceID}`);

    const commentPromise = $.get(`/api/comments/search?res=${resourceID}`);

    Promise.all([resourcePromise, commentPromise]).then(
      ([resourceData, commentData]) => {
        renderResourcePage(resourceData, commentData);
        mountResourcePageEventListeners();
      }
    );
  });
};

/**
 * Function builds the user card that sits atop the logged in users collection of all created and liked resources
 * @param {Array.<Object>} data - an array of a single object representing the logged in users info
 * @returns {HTMLDivElement} an HTML div element to attach to the DOM element acting as the container for the page
 */
const buildUserCard = (data) => {
  // user card - user name
  const userCardName = document.createElement("h1");
  userCardName.className = "user-card__name";
  userCardName.appendChild(document.createTextNode(data.name));

  // user card - num of resources created stat
  const userCardCreatedStat = document.createElement("span");
  userCardCreatedStat.appendChild(
    document.createTextNode(data["total_created_resources"])
  );
  const userCardBioCreated = document.createElement("p");
  userCardBioCreated.className = "user-card__bio";
  userCardBioCreated.appendChild(userCardCreatedStat);
  userCardBioCreated.appendChild(document.createTextNode(" Resources Created"));

  // user card - stat seperator
  const userCardBioSeperator = document.createElement("p");
  userCardBioSeperator.className = "mg-side";
  userCardBioSeperator.appendChild(document.createTextNode(" . "));

  // user card - num of resources liked stat
  const userCardLikedStat = document.createElement("span");
  userCardLikedStat.appendChild(
    document.createTextNode(data["total_liked_resources"])
  );
  const userCardBioLiked = document.createElement("p");
  userCardBioLiked.className = "user-card__bio";
  userCardBioLiked.appendChild(userCardLikedStat);
  userCardBioLiked.appendChild(document.createTextNode(" Resources Liked"));

  // user card - body
  const userCardBodyDiv = document.createElement("div");
  userCardBodyDiv.className = "user-card__body";
  userCardBodyDiv.appendChild(userCardName);
  userCardBodyDiv.appendChild(userCardBioCreated);
  userCardBodyDiv.appendChild(userCardBioSeperator);
  userCardBodyDiv.appendChild(userCardBioLiked);

  // user card - image
  const userCardImageDiv = document.createElement("div");
  userCardImageDiv.innerHTML = `<div class="user-card__image">🗄</div>`;

  // assemble user card
  const userCardDiv = document.createElement("div");
  userCardDiv.className = "user-card";
  userCardDiv.appendChild(userCardImageDiv);
  userCardDiv.appendChild(userCardBodyDiv);

  return userCardDiv;
};

// can we refactor this function to seperate the creation of the card and attachement to a container?

/**
 * Function that builds the HTML markup for an individual resource card
 * @param {Object} resource an object with all the data for a resource card
 * @returns {HTMLElement} HTML markup for an individual resource card
 */
const buildResourceCard = (resource) => {
  // generate random number between 1000 and 2000 so unsplash image is unique for each card
  let imgDimensions = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  const resourceCardImg = document.createElement("img");

  resourceCardImg.setAttribute(
    "src",
    `https://source.unsplash.com/random/${imgDimensions}x${imgDimensions}/?${
      resource.category || "learning"
    }`
  );
  const resourceCardImgDiv = document.createElement("div");
  resourceCardImgDiv.className = "resource-card__image";
  resourceCardImgDiv.appendChild(resourceCardImg);

  const resourceCardTitle = document.createElement("h3");
  resourceCardTitle.className = "resource__card-title";
  resourceCardTitle.appendChild(document.createTextNode(resource.title));

  const resourceDescription = document.createElement("div");
  resourceDescription.className = "resource-card__description";
  resourceDescription.appendChild(
    document.createTextNode(resource.description)
  );

  const resourceCardBtn = document.createElement("a");
  resourceCardBtn.setAttribute("href", "#");
  resourceCardBtn.appendChild(document.createTextNode("Expand"));

  // assemble resource card
  const resourceCardDiv = document.createElement("div");
  resourceCardDiv.className = "resource-card";
  resourceCardDiv.dataset.resourceId = `${resource["res_id"]}`;
  resourceCardDiv.appendChild(resourceCardImgDiv);
  resourceCardDiv.appendChild(resourceCardTitle);
  resourceCardDiv.appendChild(resourceDescription);
  // resourceCardDiv.appendChild(resourceCardIcons);
  resourceCardDiv.appendChild(resourceCardBtn);

  return resourceCardDiv;
};

const buildCreatedResources = (data) => {
  // title
  const createdResourcesCollectionTitle = document.createElement("h2");
  createdResourcesCollectionTitle.appendChild(
    document.createTextNode("Resources Created")
  );

  // container for resource cards
  const resourcesContainer = document.createElement("div");
  resourcesContainer.classList = "resources";

  // build inidividual resource cards
  data.forEach((resource) => {
    resourcesContainer.append(buildResourceCard(resource));
  });

  const createdResourcesCollection = document.createElement("div");
  createdResourcesCollection.classList = "created-resources";
  createdResourcesCollection.appendChild(createdResourcesCollectionTitle);
  createdResourcesCollection.appendChild(resourcesContainer);
  return createdResourcesCollection;
};

//

const buildLikedResources = (data) => {
  // title
  const likedResourcesCollectionTitle = document.createElement("h2");
  likedResourcesCollectionTitle.appendChild(
    document.createTextNode("Resources Liked")
  );

  // container for resource cards
  const resourcesContainer = document.createElement("div");
  resourcesContainer.classList = "resources";

  // build inidividual resource cards
  data.forEach((resource) => {
    resourcesContainer.appendChild(buildResourceCard(resource));
  });

  const likedResourcesCollection = document.createElement("div");
  likedResourcesCollection.classList = "liked-resources";
  likedResourcesCollection.appendChild(likedResourcesCollectionTitle);
  likedResourcesCollection.appendChild(resourcesContainer);
  return likedResourcesCollection;
};

const renderCollectionPage = () => {
  // empty pages container
  $(".container").empty();

  // create main div for collections content
  const collectionDiv = document.createElement("div");
  collectionDiv.className = "collection";
  $(".container").append(collectionDiv);

  // get "logged in" user's info
  const promiseA = $.get("api/userinfo");
  const promiseB = $.get("/mywall");
  Promise.all([promiseA, promiseB])
    .then(([dataA, dataB]) => {
      const usersName = dataA[0].name;

      // users created resourses data
      const createdResources = dataB.filter((el) => {
        if (el["auth_name"] === usersName) {
          return el;
        }
      });

      // render resources created
      if (createdResources.length) {
        // sort resources created
        // function defined at the top of this page
        sortArrayByDate(createdResources);

        // create the element
        collectionDiv.appendChild(buildCreatedResources(createdResources));
      }

      // liked resources data
      const likedResources = dataB.filter((el) => {
        if (el["auth_name"] !== usersName) {
          return el;
        }
      });

      // render liked resources
      if (likedResources.length) {
        // sort resources created
        // function defined at the top of this page
        sortArrayByDate(likedResources);

        collectionDiv.appendChild(buildLikedResources(likedResources));
      }

      const userData = {
        id: dataA[0].id,
        name: dataA[0].name,
        total_created_resources: createdResources.length,
        total_liked_resources: likedResources.length,
      };

      collectionDiv.prepend(buildUserCard(userData));

      // 3 - load event listeners
      const $container = $(".resources");
      addDelegatedResourceEvent($container);
    })
    .catch((err) => {
      console.log(err.stack);
    });
};
