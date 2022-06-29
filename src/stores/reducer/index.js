import { combineReducers } from "redux";

import movie from "./movie";
import schedule from "./schedule";
import user from "./user";
import counter from "./counter";
const reducer = combineReducers({
  counter,
  movie,
  schedule,
  user
});
// export default combineReducers({
//   movie,
//   schedule
// });
export default reducer;
