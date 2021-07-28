const createCategoryCard = (category) => {
  const { id, name } = category;
  const categoryName = document.createElement("p");
  categoryName.dataset.catId = `${id}`;
  categoryName.appendChild(document.createTextNode(`${name}`));

  const button = document.createElement("button");
  button.className = "category-delete-btn";
  button.appendChild(document.createTextNode("Delete"));

  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";
  categoryDiv.appendChild(categoryName);
  categoryDiv.appendChild(button);

  return categoryDiv;
};

const renderManageCategoriesPage = (data) => {
  const currentCategoryTitle = document.createElement("h2");
  currentCategoryTitle.appendChild(
    document.createTextNode("Current Categories")
  );

  const categoryContainer = document.createElement("div");
  categoryContainer.className = "category-container";
  categoryContainer.appendChild(currentCategoryTitle);

  data.forEach((category) => {
    categoryContainer.appendChild(createCategoryCard(category));
  });

  categoryContainer.innerHTML += `
    <h1>New Category</h1>
        <form action="">
          <label for=""></label>
          <input type="text" />
          <button class="create-category-btn" type="submit">Create</button>
        </form>
    `;

  // NTS: COPY THIS CHAINED PATTERN TO OTHER FUNCTIONS
  $(".container").empty().append(categoryContainer);
};
