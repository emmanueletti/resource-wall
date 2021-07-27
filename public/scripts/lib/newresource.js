const renderNewResourceForm = () => {
  $(".container").empty();

  $(".container").html(
    `
    <div class="new-resource-container">
        <h1>New Resource</h1>
        <form action="#">
          <label for="title"> Title </label>
          <input type="text" name="title" id="title" />

          <label for="url"> URL </label>
          <input type="text" name="url" id="url" />

          <label for="description"> Description </label>
          <textarea type="text" name="title" id="description"></textarea>

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
};
