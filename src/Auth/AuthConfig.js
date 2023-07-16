import React, { createContext, useEffect, useReducer } from "react";
import axios from "./AuthInstance";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  isdecodetoken: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      localStorage.setItem("accessToken", user?.accessToken);
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        isdecodetoken: user !== null ? user?.accessToken : false,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;
      localStorage.setItem("accessToken", user?.accessToken);
      return {
        ...state,
        isAuthenticated: true,
        isdecodetoken: user !== null ? user?.accessToken : false,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isdecodetoken: false,
        isProfileSet: null,
        isBranchSet: null,
        isBankSet: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  reset: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch({
        type: "INIT",
        payload: {
          isAuthenticated: true,
          user: { accessToken },
        },
      });
      dispatch({
        type: "LOGIN",
        payload: {
          user: { accessToken },
        },
      });
    }
  }, []);

  const login = async (email, password) => {
    var requestObj = { email, password };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .put("/auth/login", JSON.stringify(requestObj), config)
      .then(({ data: userData }) => {
        localStorage.setItem("accessToken", userData?.accessToken);
        dispatch({
          type: "LOGIN",
          payload: {
            user: userData,
          },
        });
        return true;
      })
      .catch((error) => {
        return error;
      });
  };

  const register = async (userData) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .post("/auth/register", JSON.stringify(userData), config)
      .then(({ data: userData }) => {
        dispatch({
          type: "REGISTER",
          payload: {
            user: userData,
          },
        });
        return true;
      })
      .catch((error) => {
        return error;
      });
  };

  const forgetPasswordLink = async (email) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .put("/auth/password/forgot", JSON.stringify({ email }), config)
      .then(({ res }) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  };

  const reset = async (password, tokenId) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let obj = {
      password,
      tokenId,
    };
    return axios
      .put("auth/password/reset", JSON.stringify(obj), config)
      .then(({ res }) => {
        return true;
      })
      .catch((error) => {
        return error;
      });
  };

  const logout = async (token) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .put("/auth/logout", JSON.stringify({ token }), config)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
            isdecodetoken: false,
            isProfileSet: null,
            isBranchSet: null,
            isBankSet: null,
          },
        });
        return true;
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        forgetPasswordLink,
        reset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
