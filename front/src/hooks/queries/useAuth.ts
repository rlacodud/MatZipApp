import { useMutation } from "@tanstack/react-query";
import { postLogin, postSignup } from "../../api/auth";
import { UseMutationCustomOptions } from "../../types/common";
import { setEncryptStorage } from "../../utils";

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage('refreshToken', refreshToken);
    }
  })
}