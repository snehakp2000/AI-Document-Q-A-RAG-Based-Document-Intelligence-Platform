import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";


function Documents() {

    const [documents,setdocuments] = useState([]);
    const [file,setFile] = useState(null);
    const [title,setTitle] = useState("");

    async function fetchDocuments() {

        try{
const documentList = await api.get('/documents/getdocuments')
        console.log(documentList);

        setdocuments(documentList.data.documents);
        }
        catch(err){
            console.log(err);
        }
        

      }



    useEffect(()=>{

      fetchDocuments();

    },[])

    async function fileUpload() {
    if (!file) {
        alert("select a file");
        return;
    }

    if (!title.trim()) {
        alert("enter a title");
        return;
    }

    const formdata = new FormData();

    formdata.append("title", title);
    formdata.append("document", file);


    console.log("title:", title);
console.log("file:", file);
console.log([...formdata.entries()]);
    try {
        const upload = await api.post("/documents/upload", formdata);

        console.log(upload.data);
        fetchDocuments();
    } catch (err) {
        console.log(err.response?.data);
    }
}



    return <div className="document-page">
        <Sidebar/>
        <main className="main-content">
            <div className="top-header">
               <h3>Documents</h3> 
            </div>
            <div className="document-content">
                <div className="page-heading">
                    <p> Upload and manage your PDF documents  </p>
                </div>
               
                <div className="upload-section">
                     <div className="tile"><label>title</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/></div>
                <input type="file" accept=".pdf" onChange={(e)=>setFile(e.target.files[0])}/>
                <button className="button" onClick={fileUpload}>Upload</button>
                </div>
                <div className="document-list">
                    <h4>Your Documents </h4>
{
                    documents.map((document) =>{
return <div key={document._id} className="document-card">{document.fileName}
</div>
                    })
                }
                    

                </div>
            </div>
        </main>

    </div>

}

export default Documents;