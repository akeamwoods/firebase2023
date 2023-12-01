import { useMutation, UseMutationResult } from "react-query";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface LoginCredentials {
  email: string;
  password: string;
}

const useLogin = (): UseMutationResult<
  UserCredential,
  Error,
  LoginCredentials
> => {
  return useMutation<UserCredential, Error, LoginCredentials>(
    ({ email, password }) => signInWithEmailAndPassword(auth, email, password),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: Error) => {
        console.log(error);
      },
    }
  );
};

export { useLogin };
