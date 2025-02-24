import TodoList from "../components/TodoList.jsx";
import { useAuthContext } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { session, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {session?.user?.email}</h2>
      <div>
        <p
          onClick={handleSignOut}
          className="hover:cursor-pointer border inline-block px-4 py-3 mt-4">
          Sign out
        </p>
      </div>
      <TodoList />
    </div>
  )
}

export default Dashboard