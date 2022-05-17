import { combineReducers } from "redux";

import movie from "./movie";
import schedule from "./schedule";
import user from "./user";
const reducer = combineReducers({
  movie,
  schedule,
  user
});
// export default combineReducers({
//   movie,
//   schedule
// });
export default reducer;
