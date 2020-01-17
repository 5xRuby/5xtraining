const SET_LOADING = "SET_LOADING";
const SET_JSONDATA = "SET_JSONDATA";

function setLoading(value) {
  return {
    type: SET_LOADING,
    ...value
  };
}
function setJsonData(value) {
  return {
    type: SET_JSONDATA,
    key: value.key,
    json: value.json
  };
}
