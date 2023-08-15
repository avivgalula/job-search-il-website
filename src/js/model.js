import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  search: {
    query: "",
    results: [],
    page: 1,
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

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const loadSearchResults = async function (query, page = 1) {
  const [allJobs, drushim, jobMaster] = await Promise.all([
    featchAllJobs(query, page),
    featchDrushim(query, page),
    featchJobMaster(query, page),
  ]);

  state.search.page = page;
  state.search.query = query;
  state.search.results = shuffle([...allJobs, ...drushim, ...jobMaster]);
};

export const getSearchResults = function () {
  return state.search.results;
};

export const getLastQuery = function () {
  return state.search.query;
};

export const getCurrPage = function () {
  return state.search.page;
};
