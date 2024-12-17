import styles from "./styles.module.css";

// Hooks
import { useQuery } from "../../hooks/useQuery";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

// Components
import Post from "../Post";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h2>{search}</h2>
      {posts && posts.length === 0 && (
        <div className={styles.nopost}>
          <p>Não foram encontrados posts a partir da sua busca...</p>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      )}
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Search;
