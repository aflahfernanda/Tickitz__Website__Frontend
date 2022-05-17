import { createStore, applyMiddleware, Store } from "redux";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer from "./reducer";
import reducer from "./reducer";

// TAMBAHKAN SETUP REDUX PERSIST
const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["user"]
  },
  reducer
);

// let store = createStore(rootReducer, applyMiddleware(promiseMiddleware, logger));
let store = createStore(persistedReducer, applyMiddleware(promiseMiddleware, logger));
let persistor = persistStore(store);

export default { store, persistor };
