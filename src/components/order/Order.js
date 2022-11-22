import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Order = () => {
  const auth = useContext(AuthContext);
  let { id } = useParams();
  const [status, setStatus] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});
  const [order, setOrder] = useState();
  const hs = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.getToken()}`
  };

  const url = `http://localhost:8000/api/hotel`;
  const navigate = useNavigate();

  useEffect(() => {
    if (id)
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then(
          (res) => {
            setItem(res);
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
    fetch(url + "/addorder", {
      method: "POST",
      headers: hs,
      body: JSON.stringify({
        name: order,
        hotel_id: id,
        user_id: auth.getUserId()
      }),
    }).then(
      (res) => {
        if (res.status === 200 || res.status === 201) {
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
          <div className="card-header" style={{ color: 'red' }}>{`Hotel id: ${id} Make Order`}</div>
          <div className="card-body">
            <form onSubmit={(e) => createItem(e)}>
              <div className="my-2 text-danger">
                {status === null ? "" : status.message}
              </div>
              <div className="form-group d-grid gap-2">
                <label>Hotel name</label>
                <input
                  className="form-control"
                  value={item.name ?? "New name"}
                  disabled
                />
                <label>Hotel price(Eur)</label>
                <input
                  className="form-control"
                  value={item.price ?? "New name"}
                  disabled
                />
                <label>Enter your name</label>
                <input
                  className="form-control"
                  onChange={(e) => setOrder(e.target.value)}
                  type="text"
                />
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Confirm Order"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;