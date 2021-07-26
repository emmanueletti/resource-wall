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

buildResourceCard = (container, resource) => {
  // generate random number between 1000 and 2000 so unsplash image is unique for each card
  let imgDimensions = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  const resourceCardImg = document.createElement("img");
  resourceCardImg.setAttribute(
    "src",
    `https://source.unsplash.com/random/${imgDimensions}x${imgDimensions}/?${
      resource.category || "travel"
    }`
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

  container.appendChild(resourceCardDiv);
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

  // build inidividual resource cards
  fakeResourceData.forEach((resource) => {
    buildResourceCard(resourcesContainer, resource);
  });

  const createdResourcesCollection = document.createElement("div");
  createdResourcesCollection.classList = "created-resources";
  createdResourcesCollection.appendChild(createdResourcesCollectionTitle);
  createdResourcesCollection.appendChild(resourcesContainer);
  return createdResourcesCollection;
};

buildLikedResources = (fakeResourceData) => {
  // title
  const likedResourcesCollectionTitle = document.createElement("h2");
  likedResourcesCollectionTitle.appendChild(
    document.createTextNode("Resources Liked")
  );

  // container for resource cards
  const resourcesContainer = document.createElement("div");
  resourcesContainer.classList = "resources";

  // build inidividual resource cards
  fakeResourceData.forEach((resource) => {
    buildResourceCard(resourcesContainer, resource);
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

  // 1 - ajax call for data
  // -> get logged in users data
  //    GET users/:id
  // -> get logged in users created resources
  //    GET users/:id/resources
  // -> get logged in users liked resources
  //    GET users/:id/resources/liked

  // 2 - fill main collections div with content
  // USER CARD
  collectionDiv.appendChild(buildUserCard(fakeUserData));
  // RESOURCES CREATED
  collectionDiv.appendChild(buildCreatedResources(fakeResourceData));
  // RESOURCES LIKED
  collectionDiv.appendChild(buildLikedResources(fakeResourceData));

  // 3 - load event listeners
};