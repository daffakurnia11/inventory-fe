import { LoginPayload } from "@/types/auth";
import * as React from "react";

export const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  
  const onFinish = (values: LoginPayload) => {
    setLoading(true);
    console.log("Success:", values);
    setLoading(false);
  };

  return { onFinish, loading };
}