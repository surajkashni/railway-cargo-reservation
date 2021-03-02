import axios from "axios";

export const createOrUpdateUser = async (authtoken,firstName,lastName,mobile,pin,po,dist,teh,state,id) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    { firstName,
      lastName,mobile,pin,po,teh,dist,state,id},
    {
      headers: {
        authtoken,
       
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
