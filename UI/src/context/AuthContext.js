import { createContext, useReducer, useEffect } from 'react';

export const AUTH_ACTIONS = {
  LOGIN_START: 'Auth new hotel',
  LOGIN_SUCCESS: 'Login Successful',
  LOGIN_FAILURE: 'Login Failed',
  RESET_AUTH: 'reset Auth'
};

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { user: JSON.parse(localStorage.getItem('user')) || null, loading: true, error: null };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return { user: null, loading: false, error: action.payload };
    case AUTH_ACTIONS.RESET_AUTH:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user)); // we used stringifybecause localStorage can only store strings and not objects
    return () => {};
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, error: state.error, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
