import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Dashboard() {
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    async function fetchDocuments() {
        try {
            const response = await api.get("/documents/getdocuments");

            setDocuments(response.data.documents);
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, []);

    const recentDocuments = documents.slice(0, 5);

    return (
        <div className="dashboard-page">
            <Sidebar />

            <main className="main-content">
                <header className="top-header">
                    AI Document Q&A
                </header>

                <div className="dashboard-content">

                    {/* Welcome Section */}
                    <div className="welcome-section">
                        <h1>Welcome back! 👋</h1>
                        <p>
                            Manage your documents and ask questions using AI.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="stats">

                        <div className="stat-card">
                            <span>Total Documents</span>
                            <strong>{documents.length}</strong>
                        </div>

                        <div className="stat-card">
                            <span>PDF Documents</span>
                            <strong>{documents.length}</strong>
                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <h2>Quick Actions</h2>

                        <div className="action-cards">

                            <div className="action-card">
                                <div>
                                    <h3>Upload Document</h3>
                                    <p>
                                        Upload a new PDF document and start
                                        asking questions.
                                    </p>
                                </div>

                                <button
                                    className="button"
                                    onClick={() => navigate("/documents")}
                                >
                                    Upload
                                </button>
                            </div>

                            <div className="action-card">
                                <div>
                                    <h3>Ask AI</h3>
                                    <p>
                                        Ask questions and get answers from
                                        your uploaded documents.
                                    </p>
                                </div>

                                <button
                                    className="button"
                                    onClick={() => navigate("/chat")}
                                >
                                    Start Chat
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Recent Documents */}
                    <div className="recent-documents">
                        <div className="section-header">
                            <h2>Recent Documents</h2>

                            {documents.length > 0 && (
                                <button
                                    className="button"
                                    onClick={() => navigate("/documents")}
                                >
                                    View All
                                </button>
                            )}
                        </div>

                        {recentDocuments.length === 0 ? (
                            <div className="empty-documents">
                                <h3>No documents yet</h3>
                                <p>
                                    Upload your first PDF document to get
                                    started.
                                </p>

                                <button
                                    className="button"
                                    onClick={() => navigate("/documents")}
                                >
                                    Upload Document
                                </button>
                            </div>
                        ) : (
                            <div className="recent-document-list">

                                {recentDocuments.map((document) => (
                                    <div
                                        key={document._id}
                                        className="recent-document-card"
                                    >
                                        <div>
                                            <h3>{document.title}</h3>
                                            <p>{document.fileName}</p>
                                        </div>

                                        <button
                                            className="button"
                                            onClick={() => navigate("/chat")}
                                        >
                                            Ask AI
                                        </button>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Dashboard;