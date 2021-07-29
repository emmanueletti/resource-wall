const createCategoryCard = (category) => {
  const { id, name } = category;
  const categoryName = document.createElement("p");
  categoryName.appendChild(document.createTextNode(`${name}`));

  const button = document.createElement("button");
  button.className = "category-delete-btn";
  button.appendChild(document.createTextNode("Delete"));

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";
  categoryDiv.dataset.catId = `${id}`;
  categoryDiv.appendChild(categoryName);
  categoryDiv.appendChild(button);

  return categoryDiv;
};

const renderManageCategoriesPage = (data) => {
  const categoryContainer = document.createElement("div");
  categoryContainer.className = "category-container";
  categoryContainer.innerHTML = `
    <h1>New Category</h1>
    <form action="">
      <label for=""></label>
      <input type="text" />
      <button class="create-category-btn" type="submit">Create</button>
    </form>
    <div class="newly-created"></div>
    <h2>Current Categories</h2>
    `;

  data.forEach((category) => {
    categoryContainer.appendChild(createCategoryCard(category));
  });

  // NTS: COPY THIS CHAINED PATTERN TO OTHER FUNCTIONS
  $(".container").empty().append(categoryContainer);

  // add delegated event listerners - can event listener loading be sperated?
  // EVENT - category delete btns
  $(".category-container").click((e) => {
    e.preventDefault();
    const deleteBtn = e.target.closest(".category-delete-btn");

    if (!deleteBtn) return;

    // send delete req to backend
    const category = deleteBtn.closest(".category");
    const categoryID = $(category).data("catId");

    // remove element from DOM
    deleteBtn.closest(".category").remove();
  });

  // EVENT - create new category
  $(".category-container").click((e) => {
    e.preventDefault();
    const createCategory = e.target.closest(".create-category-btn");

    if (!createCategory) return;

    // POST req to backend with newly created element returned
    const fakeReturnData = [{ id: 5, name: "Work" }];

    // render data to page - new category will be added at right underneath the create-category input so user can see the categorie they have just created
    // then on page refresh newly created category will be alphabetically ordered with the others
    $(".newly-created").prepend(createCategoryCard(fakeReturnData[0]));
  });
};
