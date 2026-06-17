import Sidebar from "@/components/dashboard/Sidebar";



export const metadata = {
  title: "Dashboard - DocAppoint",
  description: "Manage your appointments easily",
};



const layout = ({children}) => {
  return (
  
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar></Sidebar>
      <main className="flex-1">
        {children}
      </main>
    </div>
  
  );
};

export default layout;