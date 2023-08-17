import { API_URL } from "./config.js";
import { REASULTS_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";
import { shuffle } from "./helpers.js";

export const state = {
  search: {
    query: "",
    results: [],
    apiPage: 1,
    resultsPage: 1,
    resultsPerPage: REASULTS_PER_PAGE,
  },
  viewed: [],
  bookmarks: [],
};

const featchJobMaster = async function (query, page = 1) {
  const data = await getJSON(
    `${API_URL}/jobs/jobmaster?search=${query}&page=${page}`
  );
  return data;
};
const featchDrushim = async function (query, page = 1) {
  const data = await getJSON(
    `${API_URL}/jobs/drushim?search=${query}&page=${page}`
  );
  return data;
};
const featchAllJobs = async function (query, page = 1) {
  const data = await getJSON(
    `${API_URL}/jobs/alljobs?search=${query}&page=${page}`
  );
  return data;
};

export const loadSearchResults = async function (query, page = 1) {
  const [allJobs, drushim, jobMaster] = await Promise.all([
    featchAllJobs(query, page),
    featchDrushim(query, page),
    featchJobMaster(query, page),
  ]);

  state.search.apiPage = page;
  state.search.query = query;
  state.search.results = shuffle([
    ...state.search.results,
    ...allJobs,
    ...drushim,
    ...jobMaster,
  ]);
};

export const getSearchResults = function (page = state.search.resultsPage) {
  state.search.resultsPage = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = state.search.resultsPerPage * page;

  return state.search.results.slice(start, end);
};

export const getLastQuery = function () {
  return state.search.query;
};

export const getCurrPage = function () {
  return state.search.resultsPage;
};

export const getCurrAPIPage = function () {
  return state.search.apiPage;
};

const init = async function () {
  console.log("init");
  const firstFeatch = await getJSON(`${API_URL}/`);
  console.log(firstFeatch);
};

init();
