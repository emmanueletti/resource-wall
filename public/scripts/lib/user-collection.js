const fakeUserData = {
  id: 1,
  name: "John Doe",
  email: "johndoe@gmail.com",
  sum_of_resources: 30,
  sum_of_likes: 40,
};
const fakeResourceData = [
  { id: 1, title: "Lorem Ipsum", category: "travel" },
  { id: 2, title: "Lorem Ipsum", category: "travel" },
  { id: 3, title: "Lorem Ipsum", category: "travel" },
  { id: 4, title: "Lorem Ipsum", category: "travel" },
];

const buildUserCard = (fakeUserData) => {
  // user card - user name
  const userCardName = document.createElement("h1");
  userCardName.className = "user-card__name";
  const userCardNameText = document.createTextNode(fakeUserData.name);
  userCardName.appendChild(userCardNameText);

  // user card - num of resources created stat
  const userCardCreatedStat = document.createElement("span");
  const userCardCreatedStatContent = document.createTextNode(
    fakeUserData["sum_of_resources"]
  );
  userCardCreatedStat.appendChild(userCardCreatedStatContent);
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
  const userCardLikedStatContent = document.createTextNode(
    fakeUserData["sum_of_likes"]
  );
  userCardLikedStat.appendChild(userCardLikedStatContent);
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

buildCreatedResources = (fakeResourceData) => {
  // title
  const createdResourcesCollectionTitle = document.createElement("h2");
  createdResourcesCollectionTitle.appendChild(
    document.createTextNode("Resources Created")
  );

  // container for resource cards
  const resourcesContainer = document.createElement("div");
  resourcesContainer.classList = "resources";

  // resource cards

  fakeResourceData.forEach((resource) => {
    // generate random number between 1000 and 2000 so unsplash image is unique for each card
    let imgDimensions = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
    const resourceCardImg = document.createElement("img");
    resourceCardImg.setAttribute(
      "src",
      `https://source.unsplash.com/random/${imgDimensions}x${imgDimensions}/?${resource.category}`
    );
    const resourceCardImgDiv = document.createElement("div");
    resourceCardImgDiv.className = "resource-card__image";
    resourceCardImgDiv.appendChild(resourceCardImg);

    const resourceCardTitleH3 = document.createElement("h3");
    resourceCardTitleH3.className = "resource__card-title";
    const resourceCardTitle = document.createTextNode(resource.title);
    resourceCardTitleH3.appendChild(resourceCardTitle);

    const resourceCardIcons = document.createElement("div");
    resourceCardIcons.classList = "resource-card__icons";
    resourceCardIcons.innerHTML = `
    <i class="far fa-heart"></i>
    <i class="fas fa-star-half-alt"></i>
    <i class="fas fa-comment-alt"></i>
  `;

    const resourceCardBtn = document.createElement("a");
    resourceCardBtn.setAttribute("href", "#");
    const resourceCardBtnText = document.createTextNode("Expand");
    resourceCardBtn.appendChild(resourceCardBtnText);

    // assemble resource card
    const resourceCardDiv = document.createElement("div");
    resourceCardDiv.className = "resource-card";
    resourceCardDiv.id = `${resource.id}`;
    resourceCardDiv.appendChild(resourceCardImgDiv);
    resourceCardDiv.appendChild(resourceCardTitleH3);
    resourceCardDiv.appendChild(resourceCardIcons);
    resourceCardDiv.appendChild(resourceCardBtn);

    resourcesContainer.appendChild(resourceCardDiv);
  });

  const createdResourcesCollection = document.createElement("div");
  createdResourcesCollection.classList = "created-resources";
  createdResourcesCollection.appendChild(createdResourcesCollectionTitle);
  createdResourcesCollection.appendChild(resourcesContainer);
  return createdResourcesCollection;
};

const getCollectionPage = () => {
  // clear the page
  $(".container").empty();

  // build div for collections content
  const collectionDiv = document.createElement("div");
  collectionDiv.className = "collection";
  $(".container").append(collectionDiv);

  // 1-get data
  //  -> ajax call to back end route

  // 2-build and render page components
  // USER CARD
  collectionDiv.appendChild(buildUserCard(fakeUserData));
  // RESOURCES CREATED
  collectionDiv.appendChild(buildCreatedResources(fakeResourceData));
};
