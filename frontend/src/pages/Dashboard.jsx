import Sidebar from "../components/Sidebar";

function Dashboard(){
    return <div className="dashboard-page">
<Sidebar/>
<main className="main-content">
    <header className="top-header">
        AI Document Q&A
    </header>
    <div className="dashboard-content">
<div className="welcome-section">
        <h1>Welcome back!</h1>
        <p>Manage your documents and ask questions using AI.</p>
    </div>
 <div className="stats">
       <div className="stat-card">
    <span>Total Documents</span>
    <strong>0</strong>
</div>

<div className="stat-card">
    <span>Questions Asked</span>
    <strong>0</strong>
</div>
    </div>
  <button className="upload-button">
    Upload Document
</button>
    </div>

   
  
</main>
    </div>
}

export default Dashboard;