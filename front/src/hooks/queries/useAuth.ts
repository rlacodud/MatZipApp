import { useMutation } from "@tanstack/react-query";
import { postSignup } from "../../api/auth";
import { UseMutationCustomOptions } from "../../types/common";

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}