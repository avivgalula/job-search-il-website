import * as model from "./model.js";
import resultsView from "./views/resultsView.js";
import jobsPostView from "./views/jobsPostView.js";

let canLoad = false;

const controlSearchReasult = async function () {
  // 1) Get search query
  const query = "חשמלאי"; //Need to update

  // 2) Load jobs data
  await model.loadSearchResults(query);
  const jobs = model.getSearchResults();

  // 3) Render jobs
  resultsView.render(jobs);

  // 4) Update that
  canLoad = true;
};

const controlJobPost = function () {};

const controlScrollLoading = async function (atBottom) {
  if (atBottom && canLoad) {
    canLoad = false;

    // 1) Get last search query
    const query = model.getLastQuery();

    // 2) Load next page of the jobs data
    await model.loadSearchResults(query, model.getCurrPage() + 1);
    const jobs = model.getSearchResults();

    // 3) Update jobs
    resultsView.update(jobs);

    // 4) Determan if can load again
    canLoad = true;
  }
};

// controlSearchReasult();

const init = function () {
  jobsPostView.addHandlerFullInfo();
  resultsView.addHandlerScrollLoading(controlScrollLoading);
};

init();
