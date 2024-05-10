import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

function SignUpForm() {
  const form = useForm();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("form data", data);
  };
  return (
    <div>
      {/* // handleSubmit will not get called while render */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "invalid pattern",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              validate: {
                notBlackList: (fieldValue) => {
                  return fieldValue === "banca"
                    ? "Blacklist channel. Enter Different"
                    : true;
                },
                notAdmimInLast: (fieldValue) => {
                  return fieldValue.toString()?.toLowerCase()?.includes("admin")
                    ? "Admin not allowed in last."
                    : true;
                },
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
}

export default SignUpForm;
