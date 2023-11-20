import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Constants from "../Constants.json";
const URL = Constants.API_ADDRESS + "/list";

function List(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);
  const user = decodedToken.user.id;
  const [userviews, setUserviews] = useState([]);
  const [viewId, setViewId] = useState("");

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setUserviews(response.data);
      })

      .catch((error) => {
        alert(error.response.data.error);
      });
  }, []);

  const list = [];
  for (let i = 0; i < userviews.length; i++) {
    if (userviews[i].userid === user) {
      list.push(userviews[i]);
    }
  }
  console.log(list);
  const handleClick = async (event) => {
    console.log(event.target.text);
    sessionStorage.setItem(viewId, event.target.text);
    const receivedViewId = sessionStorage.getItem(viewId);
    console.log(receivedViewId);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    try {
      const result = await axios.post(Constants.API_ADDRESS + "/deleteview", {
        viewid: event.target[0].value,
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>List of custom views</h3>
      <ol>
        {list.map((view) => (
          <li key={view.customiseid}>
            <form onSubmit={handleSubmit}>
              <Link
                onClick={handleClick}
                name="viewid"
                to={`/customise/${view.customiseid}`}
              >
                {view.customiseid}
              </Link>

              <button value={view.customiseid}>Delete this view</button>
            </form>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default List;
