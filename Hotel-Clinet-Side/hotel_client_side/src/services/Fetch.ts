import { BASE_URL, sessoin } from "../utils/constants";
import type { sessionData } from "../utils/AllInterfaces";

interface FetchOptions extends RequestInit {
  _retry?: boolean;
}

export default async function fetchData<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  try {
    setToken(options);

    let res = await fetch(url, options);

    if (res.status === 401 && !options._retry) {
      res = await refreshTokenAndRetry(url, options);
    }

    const data = await res.json();

    if (!res.ok) throw new Error(data?.message || "An error occurred");

    return data as T;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function setToken(options: FetchOptions) {
  const sessionData = localStorage.getItem(sessoin);

  let accessToken: string | undefined;

  if (sessionData) {
    const sessionObject: sessionData = JSON.parse(sessionData);
    accessToken = sessionObject.accessToken;
  }

  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
}

async function refreshTokenAndRetry(
  url: string,
  options: FetchOptions
): Promise<Response> {
  options._retry = true;

  const currentSessionJson = localStorage.getItem("session") || "";
  let currentSession: sessionData | undefined;
  if (currentSessionJson) {
    currentSession = JSON.parse(currentSessionJson);
  }

  if (!currentSession?.refreshToken) {
    localStorage.removeItem("session");
    window.location.href = "/login";
    throw new Error("No refresh token. Redirecting to login.");
  }

  const res = await fetch(`${BASE_URL}Auth/RefreshToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      OldRefreshToken: currentSession.refreshToken,
    }),
  });

  const newSession: sessionData = await res.json();

  if (!newSession) {
    localStorage.removeItem("session");
    window.location.href = "/login";
    throw new Error("Session expired. Redirecting to login.");
  }

  localStorage.setItem("session", JSON.stringify(newSession));

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${newSession.accessToken}`,
  };

  return await fetch(url, options);
}

export function createFormData(object: Record<string, any>): FormData {
  const formData = new FormData();
  for (const key in object) {
    formData.append(key, object[key]);
  }
  return formData;
}
