// sagas.ts

import { all } from 'redux-saga/effects';
import * as auth from '../../app/modules/auth';
import * as roles from '../../app/pages/layout-builder/MasterData'; // Import the roles sagas
import * as technology from '../../app/pages/layout-builder/MasterData'; // Import the technology sagas

export function* rootSaga() {
  yield all([auth.saga(), roles.saga(), technology.saga()]); // Include roles and technology sagas
}
