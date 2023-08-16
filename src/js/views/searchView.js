class SearchView {
  _parentElement = document.querySelector("form");

  getQuery() {
    const query = this._parentElement.querySelector("input").value;
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector("input").value = "";
  }

  toggleDisableForm() {
    const inputForm = this._parentElement.querySelector("input");
    if (inputForm.disabled) {
      inputForm.disabled = false;
    } else {
      inputForm.disabled = true;
    }
  }

  addHandlerSubmit(handler) {
    // 1) Listen when submit button as been clicked
    const submitBtn = this._parentElement.querySelector("button");
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();
