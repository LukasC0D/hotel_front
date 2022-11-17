import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Countries = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const url = `http://localhost:8000/api/country`;
    const auth = useContext(AuthContext);
      const hs = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`,
      };
  
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then(
          (res) => {
            setPosts(res);
            setIsLoaded(true);
          },
          (err) => {
            setError(err);
            setIsLoaded(true);
          }
        );
    }, []);
  
    const deletePost = (id, e) => {
      fetch(url + "/" + id, {
        method: "DELETE",
        headers: hs,
      }).then(
        (res) => {
          if (res.status === 200) {
            const remaining = posts.filter((p) => id !== p.id);
            setPosts(remaining);
          } else if (res.status === 401) {
            setError({ message: res.statusText });
          }
        },
        (err) => {
          console.log(err);
          setError(err);
          setIsLoaded(true);
        }
      );
    };
  
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Country name</th>
              <th>Season</th>
              {/* <th></th>
              <th></th> */}
              <th>
                <span className="float-end mx-1">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="col-lg-3">{post.id + ' ' + post.name}</td>
                <td>{post.season}</td>
                <td className="col-lg-2">
                {auth.getRole() === 2 ? (
                  <>
                    <button
                      onClick={(e) => navigate(`/country/${post.id}`)}
                      className="float-end btn btn-warning mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => deletePost(post.id, e)}
                      className="float-end btn btn-danger mx-1"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  ""
                )}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="6"
                className="border border-3 border-start-0 border-bottom-0 border-end-0"
              >
               {auth.getRole() === 2 ? (
                <button
                  onClick={(e) => navigate(`/country/create`)}
                  className="btn btn btn-success float-end mx-1"
                >
                  Add new Country
                </button>
              ) : (
                ""
              )}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
}

export default Countries;