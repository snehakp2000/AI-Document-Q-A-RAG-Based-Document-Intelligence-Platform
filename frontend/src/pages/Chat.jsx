import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Chat() {
    const [documents, setDocuments] = useState([]);
    const [documentId, setDocumentId] = useState("");
    const[question,setQuestion] = useState("");
    const [messages,setMessages] = useState([]);
    const[Loading,setLoading] = useState(false);

    async function fetchDocuments() {
        try {
            const documentList = await api.get("/documents/getdocuments");

            console.log(documentList.data);

            setDocuments(documentList.data.documents);
        } catch (err) {
            console.log(err.response?.data || err);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, []);

    async function askQuestion(){

        if(!documentId){
            alert("select a document");
            return ;
        }
        if(!question){
            alert("provide a question");
            return;
        }
        setLoading(true);

        try{
 const answer = await api.post('/chat/ask',{
            documentId,
            question
        })

        console.log(answer);
        

        setMessages((prevoiusMessage) => [
            ...prevoiusMessage,
            {
            role: "user",
            content: question
            },
            {
                role:"ai",
                content:answer.data.answer
            }
        ]);

        setQuestion("")
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }

       


    }

    return (
        <div className="chat-page">
            <Sidebar />

            <main className="main-content">
                <div className="top-header">
                    AI Chat
                </div>

                <div className="chat-content">

                    <div className="chat-dropdown">
                        <select
                            value={documentId}
                            onChange={(e) => setDocumentId(e.target.value)}
                        >
                            <option value="">
                                Select a document
                            </option>

                            {documents.map((document) => (
                                <option
                                    key={document._id}
                                    value={document._id}
                                >
                                    {document.fileName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="chat-messages">

                        {
                            messages.map((message,index) =>{
                              return message.role === "user"? 
                                (
                           <span key={index} className="user-message">
                            You:  {message.content}
                        </span>
                                ):(

                        <span  key={index}  className="ai-message">
                            AI: {message.content}
                        </span>
                                )
                            })
                        }
                        

                    </div>

                    <div className="chat-inputs">
                        <input
                            type="text"
                            placeholder="Ask a question about your document..."
                            value={question}
                            onChange={(e)=>setQuestion(e.target.value)}
                        />

                        <button className="button" onClick={askQuestion} disabled={Loading}>
                            {Loading?"Asking":"Send"}
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Chat;