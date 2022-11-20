import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Orders = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [order, setOrder] = useState([]);
    const url = `http://localhost:8000/api/order`;
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
            setOrder(res);
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
            const remaining = order.filter((p) => id !== p.id);
            setOrder(remaining);
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
              <th>Client name</th>
              <th>Order id</th>
              <th>Hotel id</th>
              <th>Status</th>
              <th>
                <span className="float-end mx-1">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {order.map((post) => (
              <tr key={post.id}>
                <td className="col-lg-3">{post.name}</td>
                <td>{post.id}</td>
                <td>{post.hotel_id}</td>
                <td>{post.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas'}</td>
                <td className="col-lg-2">
                {auth.getRole() === 2 ? (
                  <>
                    <button
                      onClick={(e) => navigate(`/approve/${post.id}`)}
                      className="float-end btn btn-warning mx-1"
                    >
                      Aproove
                    </button>
                    <button
                      onClick={(e) => deletePost(post.id)}
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
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
}

export default Orders;