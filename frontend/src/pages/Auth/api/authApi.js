import axios from "axios";

const signIn = async (user) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API}/api/user/login`,
      user,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    let data = {
      user: JSON.stringify(response.data.data),
      token: response.data.token,
    };
    return data;
  } catch (error) {
    return error;
  }
};

const signUp = async (user) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_API}/api/user/register`,
      user,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    let data = {
      user: JSON.stringify(response.data.data),
      token: response.data.token,
    };
    return data;
  } catch (error) {
    return error;
  }
};

const changeAvatar = async (params, credentials, imageData) => {
  try {
    let response = await axios.put(
      `${process.env.REACT_APP_API}/api/user/${params.id}/change-avatar`,
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + credentials.t,
        },
      }
    );
    console.log(response);
    return JSON.stringify(response.data.avatar_url);
  } catch (error) {
    return error;
  }
};

export { signIn, signUp, changeAvatar };
