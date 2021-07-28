timeago.format(new Date());

const buildIndividualResource = (data) => {
  const dataObj = data[0];
  const {
    auth_name: creator,
    res_timestamp: timestamp,
    res_id: id,
    title,
    url,
    description,
  } = dataObj;

  const resourceTitle = document.createElement("h2");
  resourceTitle.appendChild(document.createTextNode(title));

  // resource body - description
  const resourceDescription = document.createElement("p");
  resourceDescription.className = "info__description";
  resourceDescription.appendChild(document.createTextNode(description));

  // resource body - url
  const resourceURL = document.createElement("p");
  resourceURL.appendChild(document.createTextNode(url));

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
  resourceDataUser.appendChild(document.createTextNode(`@${creator}`));

  //data - resource created at
  const resourceCreationDate = document.createElement("p");
  resourceCreationDate.appendChild(
    document.createTextNode(timeago.format(timestamp))
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
      <span class="like__counter">?? Likes</span>
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
      <span id="average-rating">??/5 avg</span>
    </div>
  `;

  const resourceCard = document.createElement("div");
  resourceCard.className = "resource__info";
  resourceCard.dataset.resourceId = id;
  resourceCard.appendChild(resourceBody);
  resourceCard.appendChild(resourceBodySeperator);
  resourceCard.appendChild(resourceData);
  resourceCard.appendChild(resourceControls);

  return resourceCard;
};

const buildCommentsSection = (data) => {
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

  // comments card / container

  const commentsContainer = document.createElement("div");
  commentsContainer.classList = "comments__container";

  data.forEach((comment) => {
    const { created_at: timestamp, user_id: user, content } = comment;

    const commentCardUserName = document.createElement("h4");
    commentCardUserName.appendChild(
      document.createTextNode(
        `@id:${user} - Need user_id converted to username`
      )
    );

    const commentCardCreatedDate = document.createElement("p");
    commentCardCreatedDate.className = "created_at";
    commentCardCreatedDate.appendChild(
      document.createTextNode(timeago.format(timestamp))
    );

    const commentCardHeader = document.createElement("header");
    commentCardHeader.appendChild(commentCardUserName);
    commentCardHeader.appendChild(commentCardCreatedDate);

    const commentText = document.createElement("p");
    commentText.appendChild(document.createTextNode(content));

    const commentsCard = document.createElement("div");
    commentsCard.className = "comments__card";
    commentsCard.appendChild(commentCardHeader);
    commentsCard.appendChild(commentText);
    commentsCard.appendChild(document.createElement("hr"));

    commentsContainer.appendChild(commentsCard);
  });

  const resourceCommentsContainer = document.createElement("div");
  resourceCommentsContainer.classList = "resource__comments";

  resourceCommentsContainer.appendChild(commentForm);
  resourceCommentsContainer.appendChild(document.createElement("hr"));
  resourceCommentsContainer.appendChild(commentsContainer);

  return resourceCommentsContainer;
};

const renderResourcePage = (resourceData, commentsData) => {
  // empty pages container
  $(".container").empty();

  // 2 - build resource card with data given
  $(".container").append(buildIndividualResource(resourceData));

  // 3 - build comment card with data given
  $(".container").append(buildCommentsSection(commentsData));

  // load event listeners
  // create a new comment and refresh comments section with new data

  $(".comments__form").submit((e) => {
    e.preventDefault();

    // create comment

    const resId = $(".resource__info").data().resourceId;
    const comment = $(`textarea`).val();
    const commentFormData = {
      resource_id: Number(resId),
      content: comment,
    };
    console.log(commentFormData);
    $.post("/api/comments", commentFormData)
      .done((data) => {
        console.log(data);
      })
      .fail((err) => {
        console.log(err.stack);
      });
  });

  // like resource

  // rate resource
};
