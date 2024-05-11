import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

// type FormValues = {
//   username: string,
//   email: string,
//   channel: String,
//   social: {
//     twitter: string,
//     facebook: String,
//   },
//    phoneNumbers:string[]
//    hobbies:[{hobby:""}]
// };

function SignUpForm() {
  const form = useForm({
    // defaultValues: {
    //   username:"myuser"
    // }
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        email: data?.email,
        hobbies: [{ hobby: "" }],
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "hobbies",
    control: control,
  });

  const onSubmit = (data) => {
    console.log("form data", data, "errr", errors);
  };
  const subb = () => {
    console.log("yeeeeee", errors);
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

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "twitter id is required",
              },
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "facebook id is required",
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "primary phone is required",
              },
              validate: {
                notAll9: (fieldValue) => {
                  return [...fieldValue.toString()].every((char) => char == 9)
                    ? "All 9 not allowed"
                    : true;
                },
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "secondary phone is required",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="secondary-phone">Hobbies</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register("hobbies." + index + ".hobby")}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ hobby: "" })}>
              Add
            </button>
          </div>
        </div>

        <button onClick={subb}>Submit</button>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
}

export default SignUpForm;
