import http from "@/http-common";

function logout(): void {
  const url = `http://localhost:3000/users/logout/${localStorage.getItem(
    "user-id"
  )}`;

  if (!localStorage.getItem("user-id")) return;
  http
    .get(url)
    .then(() => {
      // console.log("res = ", response);
    })
    .catch((e: Error) => {
      console.log(e);
    });
  localStorage.removeItem("user-token");
  localStorage.removeItem("user-name");
  localStorage.removeItem("user-id");
  window.location.assign("/login");
}

export { logout };
