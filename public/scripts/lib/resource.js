fakeResourseDate = [{}];
fakecommentData = [{}];

const buildIndividualResource = (data) => {
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

  return resourceCard;
};

const buildCommentsSection = (data) => {};

renderResourcePage = () => {
  // empty pages container
  $(".container").empty();

  // 1 - get ajax data

  // 2 - build resource card with data given
  // RESOURCE INFO
  // resource body - title

  // 3 - build comment card with data
  // COMMENT FORM
  const commentTextArea = document.createElement("textarea");
  commentTextArea.setAttribute("type", "text");
  commentTextArea.setAttribute("name", "comment");
  commentTextArea.setAttribute("rows", "3");

  const commentBtn = document.createElement("button");
  commentBtn.setAttribute("type", "submit");
  commentBtn.appendChild(document.createTextNode("Comment"));

  const commentForm = document.createElement("form");
  commentForm.className = "comments__form";
  commentForm.appendChild(commentTextArea);
  commentForm.appendChild(commentBtn);

  const commentSeperator = document.createElement("hr");

  // comments card / container
  const commentCardUserName = document.createElement("h4");
  commentCardUserName.appendChild(document.createTextNode("@Elon Musk"));

  const commentCardCreatedDate = document.createElement("p");
  commentCardCreatedDate.className = "created_at";
  commentCardCreatedDate.appendChild(document.createTextNode("2 Years Ago"));

  const commentCardHeader = document.createElement("header");
  commentCardHeader.appendChild(commentCardUserName);
  commentCardHeader.appendChild(commentCardCreatedDate);

  const commentText = document.createElement("p");
  commentText.appendChild(
    document.createTextNode(
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit consequuntur ipsum ut, nemo explicabo voluptates numquam sit veniam temporibus, repellendus deleniti molestiae modi voluptas maxime, ab enim quod velit libero!`
    )
  );

  const commentsCard = document.createElement("div");
  commentsCard.className = "comments__card";
  commentsCard.appendChild(commentCardHeader);
  commentsCard.appendChild(commentText);
  commentsCard.appendChild(commentSeperator);

  const commentsContainer = document.createElement("div");
  commentsContainer.classList = "comments__container";
  commentsContainer.appendChild(commentsCard);

  const resourceCommentsContainer = document.createElement("div");
  resourceCommentsContainer.classList = "resource__comments";

  resourceCommentsContainer.appendChild(commentForm);
  resourceCommentsContainer.appendChild(document.createElement("hr"));
  resourceCommentsContainer.appendChild(commentsContainer);

  // add to page
  $(".container").append(buildIndividualResource(fakeResourceData));
  $(".container").append(resourceCommentsContainer);

  // load event listeners
};
