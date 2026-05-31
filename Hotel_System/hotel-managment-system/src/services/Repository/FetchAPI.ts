import { BASE_URL, sessoin } from "../../utils/constants";

interface FetchOptions extends RequestInit {
  _retry?: boolean;
}

export default async function fetchData<T>(
  url: string,
  options: FetchOptions = {},
  useToken = true,
): Promise<T> {
  try {
    if (useToken) {
      setToken(options);
    }

    let response = await fetch(url, options);

    if (response.status === 401 && !options._retry) {
      response = await refreshTokenAndRetry(url, options);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error("Unknown error");
  }
}

function setToken(options: FetchOptions) {
  const session = localStorage.getItem(sessoin);

  if (!session) return;

  const parsed = JSON.parse(session);

  const accessToken = parsed.accessToken || parsed.newAccessToken;

  if (!accessToken) return;

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };
}

async function refreshTokenAndRetry(
  url: string,
  options: FetchOptions,
): Promise<Response> {
  options._retry = true;

  const session = localStorage.getItem(sessoin);
  if (!session) {
    logout();
    throw new Error("No session");
  }

  const parsed = JSON.parse(session);

  const refreshToken = parsed.refreshToken || parsed.newRefreshToken;
  if (!refreshToken) {
    logout();
    throw new Error("No refresh token");
  }

  let refreshResponse: Response;

  try {
    refreshResponse = await fetch(`${BASE_URL}/Auth/RefreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OldRefreshToken: refreshToken,
      }),
    });
  } catch {
    throw new Error("Refresh request failed");
  }

  if (!refreshResponse.ok) {
    logout();

    throw new Error("Refresh token expired");
  }

  const data = await refreshResponse.json();

  const newSession = {
    accessToken: data.newAccessToken,
    refreshToken: data.newRefreshToken,
  };

  localStorage.setItem(sessoin, JSON.stringify(newSession));

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${newSession.accessToken}`,
  };

  return fetch(url, options);
}

function logout() {
  localStorage.removeItem(sessoin);

  window.location.replace("/login");
}
