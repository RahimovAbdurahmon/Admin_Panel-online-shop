import { Button, Checkbox, TextField } from "@mui/material";
import { axiosRequest } from "../../utils/axiosRequest";
import { saveToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

const Login = () => {
  /// navigate
  const navigate = useNavigate();

  /// login submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      userName: event.target["userName"].value,
      password: event.target["password"].value,
    };
    try {
      const { data } = await axiosRequest.post("Account/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      saveToken(data.data);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto pt-[20px]">
      <img
        src="src/assets/images/LOGO.png"
        className="w-[120px] m-auto"
        alt=""
      />
      <h1 className="text-[18px] lg:text-[25px] font-custom text-center">
        Sign in
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[20px] w-[450px] m-auto p-[20px]"
      >
        <TextField
          label="User Name"
          name="userName"
          fullWidth
          id="userName"
          type="text"
          required
          autoComplete="userName"
        />
        <TextField
          label="Password"
          name="password"
          fullWidth
          id="password"
          type="password"
          required
          autoComplete="password"
        />
        <div className="flex items-center gap-[5px]">
          <Checkbox />
          <p className="text-[20px] font-custom">Remember me</p>
        </div>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
      <div className="flex w-[400px] justify-between items-center m-auto">
        <p className="underline text-blue-500 cursor-pointer font-custom">
          Forgot password
        </p>
        <p className="underline text-blue-500 cursor-pointer font-custom">
          Do not have an account
        </p>
      </div>
    </div>
  );
};

export default Login;
