const renderNewResourceForm = () => {
  $(".container").empty();

  $(".container").html(
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
            <option value="travel">travel</option>
            <option value="space">space</option>
          </select>

          <button type="submit">Save</button>
        </form>
      </div>
    `
  );

  $("#new-resource-form").submit((e) => {
    e.preventDefault();
    const data = $(e.target).serialize();
    $.post("/api/resources", data)
      .done((data) => {
        console.log("returned after creating new resource: ", data);
        renderCollectionPage();
      })
      .fail((err) => {
        console.log(err.stack);
      });
  });
};