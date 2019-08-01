import { createStore } from "redux";
import { rootReducer } from "./reducers/reducers";

// export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);