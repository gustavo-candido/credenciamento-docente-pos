import { useUser } from "./user";

export default function Dashboard() {
  const { logout } = useUser();
  return (
    <>
      <div>Dashboard</div>{" "}
      <button type="button" onClick={logout}>
        logout
      </button>
    </>
  );
}
