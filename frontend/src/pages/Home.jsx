import { useState , useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUi from "../components/RateLimitedUi.jsx";
import api from "../libs/axios.js";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx"
import NoteNotFound from "../components/NoteNotFound.jsx";
const Home = () => {
  const [isRateLimited, setIsRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRatelimited(false);
      } catch (error) {
        console.log("Error fetching notes:");
        if (error.response.status === 429) {
          setIsRatelimited(true)
        }
        else {
          toast.error("Error fetching notes")
        }
      }
      finally{
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUi />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text primary py-10'>Loading notes..</div>}
        {!loading && notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />  
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
