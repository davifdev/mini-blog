import styles from "./styles.module.css";

// Hooks
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Pages
import Post from "../Post";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading,  } = useFetchDocuments("posts");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      navigate(`/search?q=${query}`);
    }
  };
  
  return (
    <div className={styles.home}>
      <h1>Veja os nossos post mais recente</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Ou busque po tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
