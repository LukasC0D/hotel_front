import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Orders = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState(null);
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
          console.log(res)
          setIsLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
        }
      );
  }, [status]);

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

  const handleSubmit = (id) => {
    fetch(url + '/' + id, {
      method: 'PUT',
      headers: hs,
      body: JSON.stringify({
        approved: order,
      }),
    }).then(
      (res) => {
        if (res.status === 200) {
          setStatus({ message: res.statusText });
          // navigate("/orders");
        } else if (res.status === 401) {
          setStatus({ message: res.statusText });
        } else if (res.status === 422) {
          setStatus({ message: res.statusText });
        }
      }
      // (err) => {
      //   setStatus(err);
      // }
    )
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className='pt-4 mt-3'>
        <h1 className="text-center pb-5">Orders</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Client name</th>
              <th>Order id</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Status</th>
              {auth.getRole() === 2 ? (
                <>
                  <th><span className="float-end mx-1">Actions</span></th>
                </>) :
                ("")
              }
            </tr>
          </thead>
          <tbody>
            {order.map((post) => (
              <tr key={post.id}>
                <td className="col-lg-3">{post.name}</td>
                <td>{post.id}</td>
                <td>{post.user?.name}</td>
                <td>{post.hotel?.name}</td>
                <td>{post.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas'}</td>
                {auth.getRole() === 2 ? (
                  <td className="col-lg-2">
                    <>
                      <button className="float-end btn btn-success"
                        onClick={(id) => handleSubmit(post.id)}>
                        {post.approved === 0 ? 'Approve' : 'Cancel'}
                      </button>
                      <button
                        onClick={(e) => deletePost(post.id)}
                        className="float-end btn btn-danger mx-1"
                      >
                        Delete
                      </button>
                    </>
                  </td>
                ) : (
                  ""
                )}

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
      </div>
    );
  }
}

export default Orders;