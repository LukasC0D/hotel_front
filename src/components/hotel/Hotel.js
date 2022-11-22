import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Hotel = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [status, setStatus] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState({ title: undefined, text: undefined });
  const auth = useContext(AuthContext);
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`,
  };
  const url = `http://localhost:8000/api/hotel`;

  useEffect(() => {
    if (id)
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then(
          (res) => {
            setPost(res);
            setIsLoaded(true);
          },
          (err) => {
            setInitialLoadError(err);
            setIsLoaded(true);
          }
        );
    else setIsLoaded(true);
  }, [id, url]);

  const createItem = (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: hs,
      body: JSON.stringify(post),
    }).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          setStatus({ message: res.statusText });
          navigate("/hotels");
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      },
      (err) => {
        setStatus(err);
      }
    );
  };

  const updateItem = (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: hs,
      body: JSON.stringify(post),
    }).then(
      (res) => {
        if (res.status === 200) {
          setStatus({ message: res.statusText });
          navigate("/hotels");
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      },
      (err) => {
        setStatus(err);
      }
    );
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (initialLoadError) {
    return <div>Error: {initialLoadError.message}</div>;
  } else {
    return (
      <div className="d-flex aligns-items-center justify-content-center">
        <div className="card w-50">
          <div className="card-header" style={{ color: 'red' }}>
            Hotel {id ? `nr: ${id} Edit Page` : `Create New`}
          </div>
          <div className="card-body">
            <form onSubmit={(e) => (id ? updateItem(e) : createItem(e))}>
              <div className="my-2 text-danger">
                {status === null ? "" : status.message}
              </div>
              <div className="form-group d-grid gap-2">
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, name: e.target.value })}
                  onFocus={() => post.name ?? setPost({ ...post, name: "" })}
                  value={post.name ?? "New name"}
                />
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, price: e.target.value })}
                  onFocus={() => post.price ?? setPost({ ...post, price: "" })}
                  value={post.price ?? "New price"}
                />
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, image: e.target.value })}
                  onFocus={() => post.image ?? setPost({ ...post, image: "" })}
                  value={post.image ?? "New photo"}
                />
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, travel_time: e.target.value })}
                  onFocus={() => post.photo ?? setPost({ ...post, travel_time: "" })}
                  value={post.travel_time ?? "Travel time"}
                />
                <input
                  className="form-control"
                  onChange={(e) => setPost({ ...post, country_id: e.target.value })}
                  onFocus={() => post.city ?? setPost({ ...post, country_id: "" })}
                  value={post.country_id ?? "Country id"}
                />
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Hotel