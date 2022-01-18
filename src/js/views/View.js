import icons from 'url:../../img/icons.svg'; ////Parcel 2

export default class View {
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered(e.g. recipe)
   * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup is returned if render = false
   * @this {Object} View instance
   * @author Pranav Naringrekar
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //// Only change text and attributes that have changed from the old version to new version
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //// creating a new DOM element to compare with original
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //// console.log(curEl, newEl.isEqualNode(curEl));

      //// Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //// console.log('🤍', newEl.firstChild?.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //// Updates changed ATTRIBUTE
      if (!newEl.isEqualNode(curEl)) {
        //// console.log(Array.from(newEl.attributes));

        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}g#icon-loader"></use>
            </svg>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons} #icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
            <div class="message">
              <div>
                <svg>
                  <use href="${icons} #icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
