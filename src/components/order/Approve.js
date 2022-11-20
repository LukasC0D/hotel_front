import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Approve = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const auth = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    const [initialLoadError, setInitialLoadError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);
    const url = `http://localhost:8000/api/order`;
    const hs = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.getToken()}`,
    };
  
    useEffect(() => {
      if (id)
        fetch(`${url}/${id}`)
          .then((res) => res.json())
          .then(
            (res) => {
              setPost(res);
              setIsLoaded(true);
              // setApprove(res.data.message)
                // console.log(res.data.message)
            },
            (err) => {
              setInitialLoadError(err);
              setIsLoaded(true);
            }
          );
      else setIsLoaded(true);
    }, [id, url]);
  
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
            navigate("/orders");
            
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
            <div className="card-header">
              Order {id ? `nr: ${id} approve` : `creation`} Sign Below
            </div>
            <div className="card-body">
              <form onSubmit={(e) => (updateItem(e))}>
                <div className="my-2 text-danger">
                  {status === null ? "" : status.message}
                </div>
                <div className="form-group d-grid gap-2">
                  {/* <input
                    className="form-control"
                    onChange={(e) => setPost({ ...post, approved: e.target.value })}
                    onFocus={() => post.approved ?? setPost({ ...post, approved: "" })}
                    value={post.approved ?? "Sign here"}            
                  /> */}
                   {/* <button onClick={() => updateItem(post.approved)}>Patvirtinti</button> */}
                   <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
                   <button className="btn btn-success" onClick={() => updateItem(post.approved)}>
                      {post.approved === 0 ? 'Approve' : 'cancel'}
                    </button>

                 
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
}

export default Approve