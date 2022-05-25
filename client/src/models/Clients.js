import axios from "axios";
import { useState, useEffect } from "react";
const baseURL = "http://localhost:9000/clients";
const deleteURL = "http://localhost:9000/delete";

function Clients() {
  const [clients, setClients] = useState([]);
  const [serachValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log("useEffect fetched onMount");
    axios.get(baseURL).then((response) => {
      setClients(response.data);
    });
  }, []);

  async function deleteClient(client) {
    //server
    try {
      console.log("delete pressed");
      const response = await axios.delete(deleteURL, {
        data: {
          ID: client.ID,
        },
      });
      console.log(response);

      if (response.status === 200) {
        console.log(response.status);
        console.log("status is ok");

        let findEntry = clients.find((entry) => entry.ID === client.ID);
        if (!findEntry) {
          console.log("No such client id");
        }

        if (findEntry) {
          const index = clients.indexOf(findEntry);
          clients.splice(index, 1);
          setClients(clients.filter((client) => client));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Filter the list(by name):</h2>
      <br />
      <input
        name="filter"
        type="text"
        placeholder="search..."
        onChange={(event) => setSearchValue(event.target.value)}
      ></input>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <li>
          <span> Name, </span>
          <span> Email, </span>
          <span> ID, </span>
          <span> Phone, </span>
          <span> IP, </span>
        </li>
        {clients
          .filter((client) =>
            client.Name.toLowerCase().includes(serachValue.toLowerCase().trim())
          )
          .map((client, i) => (
            <li key={i}>
              <span>{client.Name}, </span>
              <span>{client.Email}, </span>
              <span>{client.ID}, </span>
              <span>{client.Phone}, </span>
              <span>{client.IP},</span>
              <button onClick={() => deleteClient(client)}>Remove</button>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default Clients;
