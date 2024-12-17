import styles from "./styles.module.css";

// Hooks
import { useParams, useNavigate } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const PostUnique = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  const navigate = useNavigate("");

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
          <button className="btn btn-dark" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </>
      )}
    </div>
  );
};

export default PostUnique;
