const login = {
  url: "https://api.intra.42.fr/oauth/authorize?",
  query: {
    client_id: process.env.VUE_APP_FT_CLIENT_ID,
    redirect_uri: process.env.VUE_APP_FT_REDIRECT_URL,
    response_type: "code",
  },
  loginUser: function (): string {
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-token");
    this.url += Object.entries(this.query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return this.url;
  },
};

function logout(): void {
  localStorage.removeItem("user-token");
  localStorage.removeItem("user-name");
  localStorage.removeItem("user-id");
  window.location.assign("/login");
}

export { logout, login };
