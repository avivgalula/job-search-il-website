class JobPostView {
  _parentElement = document.querySelector("main");

  addHandlerFullInfo() {
    this._parentElement.addEventListener("click", (e) => {
      const jobPostEl = e.target.closest("article");
      if (!jobPostEl) return;

      // Toggle hide info of the clicked job post
      const infoEl = jobPostEl.querySelector(".content-container");
      infoEl.classList.toggle("hide");

      //   // Hidd any other job post info
      //   document
      //     .querySelectorAll("article .content-container")
      //     .forEach((content) => {
      //       if (content === infoEl) return;
      //       content.classList.add("hide");
      //     });

      //   // Scroll the the clicked jobs
      //   jobPostEl
      //     .querySelector(".preview-container")
      //     .scrollIntoView({ behavior: "auto" });
    });
  }
}

export default new JobPostView();
