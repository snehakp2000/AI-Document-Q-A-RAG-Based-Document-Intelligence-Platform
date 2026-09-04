import {Link} from 'react-router-dom';

function Sidebar(){
    return <aside className="sidebar">
        <h2 className="sidebar-header">AI Document Q&A</h2>
        <nav>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/documents'>Documents</Link>
            <Link to='/chat'>AI Chat</Link>
            
        </nav>
        <button className="button-logout">Logout</button>
    </aside>

    
}

export default Sidebar;