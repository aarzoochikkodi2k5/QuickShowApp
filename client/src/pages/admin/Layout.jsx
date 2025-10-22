import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { API_URL } from "../../config"; // ✅ Import API_URL

const Layout = () => {
  const { isAdmin, setIsAdmin, getToken, axios } = useAppContext();

  const fetchIsAdmin = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${API_URL}/api/admin/is-admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.error("Error fetching admin status:", error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    fetchIsAdmin();
  }, []);

  return isAdmin ? (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Layout;

