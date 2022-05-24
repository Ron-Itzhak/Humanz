import React from "react";
import "./clientForm.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const baseURL = "http://localhost:9000/post";

export default function ClientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(baseURL, {
        Name: data.Name,
        Email: data.Email,
        ID: data.ID,
        Phone: data.Phone,
        IP: data.IP,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(data);
  };

  var ipRegex = new RegExp(
    "^(([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)\\.){3}([1-9]?\\d|1\\d\\d|2[0-5][0-5]|2[0-4]\\d)$"
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new client</h2>
      <br />
      <input
        name="Name"
        type="text"
        {...register("Name", { required: "Name is needed " })}
        placeholder="Enter Name"
      />
      <br />
      {errors.Name && <p>{errors.Name.message}</p>}
      <input
        name="Email"
        type="email"
        placeholder="Enter Email"
        {...register("Email", {
          required: true,
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
        })}
      />
      <br />
      {errors.Email && <p>{errors.Email.message}</p>}
      <input
        name="IP"
        type="text"
        {...register("IP", {
          required: true,
          pattern: {
            value: ipRegex,
          },
        })}
        placeholder="Enter IP"
      />
      <br />
      {errors.IP && <p>{errors.IP.message}</p>}
      <input
        name="ID"
        type="number"
        {...register("ID", { required: true, minLength: 9 })}
        placeholder="Enter ID"
      />
      <br />
      {errors.ID && <p>{errors.ID.message}</p>}

      <input name="submit" type="submit" />
    </form>
  );
}
