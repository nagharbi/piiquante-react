import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneSauce, likeDislike } from "../services/sauces";
import { UserContext } from "../contexts/UserContext";

export default function Sauce() {
  const params = useParams();
  const navigate = useNavigate();
  const [sauce, setSauce] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [pending, setPending] = useState(false);
  const { userId, setUserId } = useContext(UserContext);
  const id = params.id;
  // si l'utilisateur disliker il ne peut pas liker
  const handleLike = async () => {
    if (disliked) {
      return;
    }
    setPending(true);
    if (liked) {
      await likeDislike(id, 0);
      setLikes((value) => value - 1);
      setLiked(false);
    } else {
      await likeDislike(id, 1);
      setLikes((value) => value + 1);
      setLiked(true);
    }
    setPending(false);
  };

  const handleDislike = async () => {
    if (liked) {
      return;
    }
    setPending(true);
    if (disliked) {
      await likeDislike(id, 0);
      setDislikes((value) => value - 1);
      setDisliked(false);
    } else {
      await likeDislike(id, -1);
      setDislikes((value) => value + 1);
      setDisliked(true);
    }
    setPending(false);
  };

  const handleBack = () => {
    navigate("/sauces");
  };

  const handleModify = () => {
    navigate(`/sauces/modify/${id}`);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    async function load() {
      const data = await getOneSauce(id);
      console.log(data);
      setSauce(data);
      setLikes(data.likes);
      setDislikes(data.dislikes);
      if (data.usersLiked.find((value) => value === userId)) {
        setLiked(true);
      }
      if (data.usersDisliked.find((value) => value === userId)) {
        setDisliked(true);
      }
    }
    load();
  }, []);

  return (
    <>
      {sauce ? (
        <div className="sauce-container">
          <img src={sauce?.imageUrl} alt={sauce.name} />
          <div className="sauce-info">
            <h1 className="sauce-name">{sauce?.name}</h1>
            <p className="manufacturer">by {sauce?.manufacturer}</p>
            <h3>Description</h3>
            <p>{sauce.description}</p>

            {pending ? (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="like-buttons">
                <div className="likes">
                  <i
                    className={`${
                      liked ? "liked" : ""
                    } like fa fa-thumbs-up fa-lg ${disliked ? "disabled" : ""}`}
                    onClick={handleLike}
                  ></i>
                  <span>{likes}</span>
                </div>
                <div className="dislikes">
                  <i
                    className={`${
                      disliked ? "disliked" : ""
                    } dislike fa fa-thumbs-down fa-lg ${
                      liked ? "disabled" : ""
                    }`}
                    onClick={handleDislike}
                  ></i>
                  <span>{dislikes}</span>
                </div>
              </div>
            )}

            <div className="control-buttons">
              <button onClick={handleBack}>BACK</button>
              {userId === sauce.userId ? (
                <>
                  <button onClick={handleModify}>MODIFY</button>
                  <button onClick={handleDelete}>DELETE</button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
