/**
 * Function creates HTML option element
 * @param {Object} optionData - single object representing the data of a category, must have property {name: string}
 * @returns {HTMLOptionElement} an HTML option element with inner text and value set
 */
const createCategoryOption = (optionData) => {
  const option = document.createElement("option");
  option.appendChild(document.createTextNode(optionData.name));
  option.value = optionData.name;
  option.dataset.categoryId = optionData.id;
  return option;
};

const renderNewResourceForm = () => {
  $(".container")
    .empty()
    .html(
      `
    <div class="new-resource-container">
        <h1>New Resource</h1>
        <form action="#" id='new-resource-form'>
          <label for="title"> Title </label>
          <input type="text" name="title" id="title" />

          <label for="url"> URL </label>
          <input type="text" name="url" id="url" />

          <label for="description"> Description </label>
          <textarea type="text" name="description" id="description"></textarea>

          <label for="category">Choose a category:</label>
          <select name="category" id="category">
            <option value="">-- category --</option>
          </select>

          <button type="submit">Save</button>
        </form>
      </div>
    `
    );

  // update categories
  // get users categories from back end
  const fakeData = [
    { id: 1, name: "Space" },
    { id: 2, name: "Travel" },
    { id: 3, name: "Nature" },
    { id: 4, name: "Vancouver" },
  ];

  fakeData.forEach((category) => {
    $("#category").append(createCategoryOption(category));
  });

  $("#new-resource-form").submit((e) => {
    e.preventDefault();
    const data = $(e.target).serialize();
    $.post("/api/resources", data)
      .done((data) => {
        renderCollectionPage();
      })
      .fail((err) => {
        console.log(err.stack);
      });
  });
};
