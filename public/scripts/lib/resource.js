renderResourcePage = () => {
  // empty pages container
  $(".container").empty();

  // 1 - get ajax data

  // 2 - build resource card with data given
  // RESOURCE INFO
  // resource body - title
  const resourceTitle = document.createElement("h2");
  resourceTitle.appendChild(document.createTextNode("This is a Title"));

  // resource body - description
  const resourceDescription = document.createElement("p");
  resourceDescription.className = "info__description";
  resourceDescription.appendChild(
    document.createTextNode(`
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
    consequuntur ipsum ut, nemo explicabo voluptates numquam sit veniam
    temporibus, repellendus deleniti molestiae modi voluptas maxime, ab
    enim quod velit libero!`)
  );

  // resource body - url
  const resourceURL = document.createElement("p");
  resourceURL.appendChild(
    document.createTextNode("www.linktowebsite.com/loremipsums")
  );

  // resource body
  const resourceBody = document.createElement("div");
  resourceBody.className = "resource__body";
  resourceBody.appendChild(resourceTitle);
  resourceBody.appendChild(resourceDescription);
  resourceBody.appendChild(resourceURL);

  // SEPERATOR
  const resourceBodySeperator = document.createElement("hr");

  // RESOURCE DATA
  // data - users name
  const resourceDataUser = document.createElement("p");
  resourceDataUser.appendChild(document.createTextNode("@John Doe"));

  //data - resource created at
  const resourceCreationDate = document.createElement("p");
  resourceCreationDate.appendChild(
    document.createTextNode("Created 12 months ago")
  );

  const resourceData = document.createElement("div");
  resourceData.className = "resource__data";
  resourceData.appendChild(resourceDataUser);
  resourceData.appendChild(resourceCreationDate);

  const resourceControls = document.createElement("div");
  resourceControls.className = "resource__controls";
  resourceControls.innerHTML = `
    <div class="resource__like">
      <i class="fas fa-thumbs-up"></i>
      <span class="like__counter">15 Likes</span>
    </div>
    <div class="resource__rate">
      <select name="rating" id="rate-select">
        <option value="">Rate</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <span id="average-rating">4.3/5 avg</span>
    </div>
  `;

  const resourceCard = document.createElement("div");
  resourceCard.className = "resource__info";
  resourceCard.appendChild(resourceBody);
  resourceCard.appendChild(resourceBodySeperator);
  resourceCard.appendChild(resourceData);
  resourceCard.appendChild(resourceControls);

  // 3 - build comment card with data

  // add to page
  $(".container").append(resourceCard);

  // load event listeners
};
