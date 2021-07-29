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
      <span id="like-btn" ><i class="fas fa-thumbs-up"></i></span>
      <span><span id="like-counter">0</span> Likes</span>
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
      <span><span id="avg-rating">null</span>/5.0 avg</span>
    </div>
    <div class="resource_category">
      <select name="category" id="category-select">
        <option value="">Categorize</option>
      </select>
      <span>Category: <span id="resource-category"> None</span></span>
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

// create function to fill categories with options of all users categories

/**
 * Function build the HTML markup for an individual comment
 * @param {Object} comment - object representing an individual comment
 * @returns {HTMLDivElement} an HTML object representing the markup for a single comment
 */
const buildIndividualComment = (comment) => {
  const { created_at: timestamp, user_name: user, content } = comment;

  const commentCardUserName = document.createElement("h4");
  commentCardUserName.appendChild(document.createTextNode(`@${user}`));

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

  return commentsCard;
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
    commentsContainer.prepend(buildIndividualComment(comment));
  });

  const resourceCommentsContainer = document.createElement("div");
  resourceCommentsContainer.classList = "resource__comments";

  resourceCommentsContainer.appendChild(commentForm);
  resourceCommentsContainer.appendChild(document.createElement("hr"));
  resourceCommentsContainer.appendChild(commentsContainer);

  return resourceCommentsContainer;
};

const renderResourcePage = (resourceData, commentsData) => {
  console.log(resourceData);
  // empty pages container
  $(".container").empty();

  // 2 - build resource card with data given
  $(".container").prepend(buildIndividualResource(resourceData));

  // 3 - build comment card with data given
  $(".container").append(buildCommentsSection(commentsData));

  // can the update code be encapsulated in thier own "updateResourceData" function?
  // 4 - update the resources currently assigned category for logged in user
  // get request
  // CHANGE TO ONLY DISPLAY THE MOST RECENTLY ASSIGNED CATEGORY
  const resID = $(".resource__info").data("resourceId");
  $.get(`/api/categories/search?res=${resID}`)
    .done((data) => {
      if (data.length === 0) return;
      // sort for the most recently assigned category (the one with the highest cat_res_id)
      //
      // display the name of that assigned category
      $("#resource-category")
        .empty()
        .append(document.createTextNode(data[0].name));

      // add that unique categories_resource join id to the HTML
      $("#resource-category").data("cat_res_id", data[0].cat_res_id);
    })
    .fail((err) => {
      err.stack;
    });

  // 5 - update the users category options
  $.get("/api/categories")
    .done((data) => {
      data.forEach((category) => {
        $("#category-select").append(createCategoryOption(category));
      });
    })
    .fail((err) => {
      console.log(err.stack);
    });

  // 6 - update the resources likes
  // get reqest for resource likes
  console.log(resID);
  $.get(`/api/likes/search?res=${resID}`)
    .done((data) => {
      if (!data.length) return;
      $("#like-counter").empty().append(document.createTextNode(data.length));
    })
    .fail((err) => {
      console.log(err.stack);
    });

  // 7 - update the resources ratings
  const avgRating = Number(resourceData[0].avg_rating).toFixed(1);
  $("#avg-rating").empty().append(document.createTextNode(avgRating));
};

const mountResourcePageEventListeners = () => {
  // LIKES

  // COMMENTS
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

    // post request to create comment
    $.post("/api/comments", commentFormData)
      .done((data) => {
        // add the newly created comment to the page
        $(".comments__container").prepend(buildIndividualComment(data[0]));
      })
      .fail((err) => {
        console.log(err.stack);
      });
  });

  // CATEGORIES
  // add event listner to change categories
  $("#category-select").change((e) => {
    const resourceID = $(".resource__info").data("resourceId");
    const categoryID = $("select#category-select option:checked").data(
      "categoryId"
    );
    const categoryPicked = $("select#category-select option:checked").val();
    //POST request to backend
    const catData = {
      category_id: Number(categoryID),
      resource_id: Number(resourceID),
    };
    $.post("/api/categories_resources", catData).fail((err) => {
      err.stack;
    });

    // update front end with new category
    $("#resource-category")
      .empty()
      .append(document.createTextNode(categoryPicked));
  });
};

// this page is desperate need for cleanup / refactor
// decide if ALL event listeners will go in an mounteventlistner function
// or if everything will be in the render function
// to protest against async nonsense
// can also have the render function be passed in the event listner as a callback to call after it has done its building work
