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

const controlScrollLoading = async function (isAtBottom) {
  if (isAtBottom && canLoad) {
    canLoad = false;
    try {
      // 1) Get last search query
      const query = model.getLastQuery();

      // 2) Load next page of the jobs data
      const jobs = model.getSearchResults(model.getCurrPage() + 1);
      // If jobs reasult start to get empty, try to fetch more data
      if (jobs.length < 10) {
        resultsView.renderUpdateSpinner();
        await model.loadSearchResults(query, model.getCurrAPIPage() + 1);
      }
      if (jobs.length === 0) throw new Error("no jobs found");

      // 3) Update jobs
      resultsView.update(jobs);

      // 4) Determan if can load again
      canLoad = true;
    } catch (err) {
      resultsView.renderEndResultsMessage();
    } finally {
      resultsView.removeSpinnder();
    }
  }
};

const controlJobPost = function () {};

// controlSearchReasult();

const init = function () {
  searchView.addHandlerSubmit(controlSearchReasult);
  resultsView.addHandlerScrollLoading(controlScrollLoading);
  jobsPostView.addHandlerFullInfo();
};

init();
