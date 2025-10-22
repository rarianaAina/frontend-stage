export function getStoredRole(): "CLIENT" | "CONSULTANT" | "ADMINISTRATEUR" {
  const role = localStorage.getItem("role");
  if (role === "CLIENT" || role === "CONSULTANT" || role === "ADMINISTRATEUR") {
    return role;
  }
  return "CLIENT";
}
