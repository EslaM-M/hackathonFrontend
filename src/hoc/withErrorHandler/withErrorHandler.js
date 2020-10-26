import React from "react";
import Aux from "../Aux";
import store from "../../store";
import { logout } from "../../store/actions";
import api from "../../api";
import { useSnackbar } from "notistack";

const withErrorHandler = Component => {
    console.log('with error handler');
  return props => {
    const { enqueueSnackbar } = useSnackbar();

    api.interceptors.response.use(null, err => {
      if (err.response && err.response.status === 401) {
        store.dispatch(logout());
      } else {
        err &&
          enqueueSnackbar(err.message, {
            autoHideDuration: 2000,
            variant: "error"
          });
        throw err;
      }
    });

    return (
      <Aux>
        <Component {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
