import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";

const Page = () => {
  const { isSignedIn } = useAuth();
  const [signInStatus, setSignInStatus] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setSignInStatus(isSignedIn);
  }, [isSignedIn]);

  if (signInStatus === undefined) {
    return null;
  }

  return signInStatus ? (
      <Redirect href="/(root)/(tabs)/home" />
  ) : (
      <Redirect href="/(auth)/landing" />
  );
};

export default Page;