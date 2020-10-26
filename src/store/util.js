import moment from "moment";
import * as Sentry from "@sentry/browser";
import * as CONSTANTS from "../utils/constants";

//to validate the token if expired or not to be used in the api calls headers
// return true or false valid token
export const validateToken = () => {
  const authData =
    localStorage.getItem("auth_data") &&
    JSON.parse(localStorage.getItem("auth_data"));
  if (!authData || !authData.token) {
    return false;
  }

  const isValid = moment(Date.now()).isSameOrBefore(
    moment(authData.expires_at)
  );
  return { isValid, authData };
};

export const initializeSentry = (userId) => {
  window._env_.NODE_ENV &&
    Sentry.init({
      dsn: CONSTANTS.SENTRY_DSN,
      environment: window._env_.NODE_ENV,
      release: window.SENTRY_RELEASE && window.SENTRY_RELEASE.id
    });
  Sentry.configureScope(function (scope) {
    scope.setUser({ "userId": userId });
  });
};
