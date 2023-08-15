class resultsView {
  _parentElement = document.querySelector("main");
  _data;

  render(data) {
    if (!data) return;
    this._data = data;
    this._clear();
    const markup = this._generatMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    if (!data) return;
    this._data = data;
    const markup = this._generatMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  //   addHandlerScrollLoading(handler) {
  //     let loadMore = true;
  //     this._parentElement.addEventListener("scroll", () => {
  //       const scrollBarPos = this._parentElement.scrollTop;
  //       const height =
  //         this._parentElement.scrollHeight - this._parentElement.clientHeight;

  //       // Load more reasults when reach half the way
  //       if (loadMore && scrollBarPos / height >= 0.5) {
  //         console.log("load");
  //         loadMore = false;
  //       }
  //     });
  //   }

  addHandlerScrollLoading(handler) {
    this._parentElement.addEventListener("scroll", () => {
      // 1) Get a reference to last jobs post
      const allJobPost = this._parentElement.querySelectorAll("article");
      const middleJobPost = allJobPost[Math.round(allJobPost.length * 0.66)];
      if (!middleJobPost) return;

      const elementPosition = middleJobPost.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if the element is in or near the viewport
      if (elementPosition.top < viewportHeight && elementPosition.bottom > 0) {
        handler(true);
      } else {
        handler(false);
      }
    });
  }

  _generatMarkup() {
    return this._data.map(this._generatMarkupMap).join("");
  }

  _generatMarkupMap(job) {
    return `
        <article>
          <div class="preview-container">
            <div class="info">
              <div class="info-header">
                <div class="info-header-details">
                  <div class="viewd-status">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      class="viewd-icon icon"
                    >
                      <path
                        d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"
                      ></path>
                    </svg>
                  </div>
                  <div class="job-source">
                    <span class="${
                      job.id.includes("aj")
                        ? "alljobs"
                        : job.id.includes("jm")
                        ? "jobmaster"
                        : "drushim"
                    }">${
      job.id.includes("aj")
        ? "AllJobs"
        : job.id.includes("jm")
        ? "JobMaster"
        : "Drushim"
    }</span>
                    <img
                      class="favicon"
                      src="${
                        job.id.includes("aj")
                          ? "https://www.alljobs.co.il"
                          : job.id.includes("jm")
                          ? "https://www.jobmaster.co.il"
                          : "https://www.drushim.co.il"
                      }/favicon.ico"
                      alt=""
                    />
                  </div>
                  <span class="publish-time">${job.publishTime}</span>
                </div>
                <span class="time-viewed">נצפה ב- 11/08/2023</span>
              </div>
              <h2 class="title">${job.title}</h2>
              <div class="footer">
                <div class="job-type">
                  <span class="job-type-text">${job.type}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="job-type-icon icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="job-location">
                  <span class="job-location-text">${job.location[0]}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="job-location-icon icon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="btns">
              <button class="bookmark-btn btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="bookmarks-icon icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </button>
              <a href="${job.link}" target="_blank" class="job-link-btn btn">
                <span class=job-link-btn-text>לאתר המשרה</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="website-link-btn-icon icon post-website-link-btn-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
          </div>
          </div>
          <div class="content-container hide">
            <div class="content-wrapper">
              <div class="content-sidebar"></div>
              <div class="content">
                <div class="description content-section">
                  <span class="content-title">תיאור המשרה:</span>
                  <div class="content-text description-text">
                  ${job.description}
                  </div>
                </div>
                <div class="requirements content-section">
                  <span class="content-title">דרישות:</span>
                  <div class="content-text requirements-text">
                  ${job.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        `;
  }
}

export default new resultsView();
