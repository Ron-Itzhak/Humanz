import axios from "axios";
import { useState, useEffect } from "react";
const baseURL = "http://localhost:9000/clients";
const deleteURL = "http://localhost:9000/delete";

function Clients() {
  const [clients, getClients] = useState(null);
  const [filteredClients, filterClients] = useState(null);

  useEffect(() => {
    console.log("useEffect fetched onMount");
    axios.get(baseURL).then((response) => {
      getClients(response.data);
      //filterClients(listItems);
    });
  }, []);

  if (!clients) return null;

  function showClients() {
    var listItems = clients.map((client) => (
      <li key={client.id}>
        {client.Name},{client.Email},{client.ID},{client.IP}
        <button onClick={() => deleteClient(client.ID)}>remove</button>
      </li>
    ));
    filterClients(listItems);
  }

  function deleteClient(id) {
    console.log("delete pressed");
    axios.delete(deleteURL, {
      data: {
        ID: id,
      },
    });

    //function for deleting a client
    let findEntry = clients.find((entry) => entry.ID === id);
    if (!findEntry) {
      console.log("No such client id");
    }
    console.log(findEntry);

    const removeClient = (criteria, clients) =>
      clients.splice(clients.indexOf(clients.find(criteria)), 1);

    if (findEntry) removeClient(({ ID }) => ID === findEntry.ID, clients);

    showClients();
  }

  function search(searchTerm) {
    console.log(searchTerm);
    var filtered = clients.filter((client) =>
      client.Name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    filtered = filtered.map((client) => (
      <li key={client.id}>
        {client.Name},{client.Email},{client.ID},{client.IP}
        <button onClick={() => deleteClient(client.ID)}>remove</button>
      </li>
    ));

    filterClients(filtered);
  }

  return (
    <div>
      <h2>Filter the list(by name):</h2>
      <br />
      <input
        name="filter"
        type="text"
        placeholder="search..."
        onChange={(event) => search(event.target.value)}
      ></input>
      <ul>{filteredClients ? filteredClients : showClients()}</ul>
    </div>
  );
}
export default Clients;
