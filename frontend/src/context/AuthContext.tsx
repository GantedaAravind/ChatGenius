import { createContext} from "react";

type userAuth = {
  fetchUserDatails: () => Promise<void>;
};

const AuthContext = createContext<userAuth | null>(null);

export default AuthContext;
