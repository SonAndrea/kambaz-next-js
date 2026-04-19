"use client";
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await client.profile();
        dispatch(setCurrentUser(user));
      } catch {
        dispatch(setCurrentUser(null));
      } finally {
        setPending(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (pending) {
    return null;
  }

  return children;
}
