import * as model from "./model.js";
import resultsView from "./views/resultsView.js";
import jobsPostView from "./views/jobsPostView.js";
import SearchView from "./views/jobsPostView.js";
import searchView from "./views/searchView.js";

let canLoad = false;

const controlSearchReasult = async function () {
  try {
    resultsView.renderSpinner();
    searchView.toggleDisableForm();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load jobs data
    await model.loadSearchResults(query);
    const jobs = model.getSearchResults();
    if (jobs.length === 0) throw new Error("no jobs found");

    // 3) Render jobs
    resultsView.render(jobs);
  } catch (err) {
    resultsView.renderError();
  } finally {
    canLoad = true;
    searchView.toggleDisableForm();
  }
};

const controlScrollLoading = async function (atBottom) {
  try {
    if (atBottom && canLoad) {
      canLoad = false;

      // 1) Get last search query
      const query = model.getLastQuery();

      // 2) Load next page of the jobs data
      await model.loadSearchResults(query, model.getCurrPage() + 1);
      const jobs = model.getSearchResults();
      if (jobs.length === 0) throw new Error("no jobs found");

      // 3) Update jobs
      resultsView.update(jobs);

      // 4) Determan if can load again
      canLoad = true;
    }
  } catch (err) {
    resultsView.renderEndResultsMessage();
  }
};

const controlJobPost = function () {};

// controlSearchReasult();

const init = function () {
  jobsPostView.addHandlerFullInfo();
  resultsView.addHandlerScrollLoading(controlScrollLoading);
  searchView.addHandlerSubmit(controlSearchReasult);
};

init();
