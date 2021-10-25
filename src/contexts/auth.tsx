import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({} as AuthContextType)

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextType = {
  user: User | null;
  url: string;
  signOut: ()=> void;
  
}
type AuthContextProvider = {
  children: React.ReactNode,
}
type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}
}
export function AuthProvider(props: AuthContextProvider) {

  const [user, setUser] = useState<User | null>(null);

  const url =
  "https://github.com/login/oauth/authorize?scope=user&client_id=2b1b70513948cc779e40";

async function signIn(githubCode: string) {
  const response = await api.post<AuthResponse>("authenticate", {
    code: githubCode,
  });

  const { token, user } = response.data;
  api.defaults.headers.common.authorization = `Bearer ${token}`;

  localStorage.setItem("token", token);
  console.log(user);
  setUser(user);
  
}

function signOut() {
  setUser(null);
  localStorage.removeItem("token");
}

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    api.get<User>("profile").then((response) => {
      setUser(response.data);
    });
  }
},[])

useEffect(() => {
  const url = window.location.href;
  const hasGithubCode = url.includes("code");
  if (hasGithubCode) {
    const [withoutCode, code] = url.split("?code=");
    window.history.pushState({}, "", withoutCode);

    signIn(code);
  }
}, []);

  return (
    <AuthContext.Provider value={{url, user, signOut}}>
      {props.children}
    </AuthContext.Provider>
  )
}