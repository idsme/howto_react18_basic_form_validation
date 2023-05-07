import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { UserProfile } from "./App";
import { FormInputError } from "./FormInputError";

interface Errors {
  name: string;
  occupation: string;
  nickName: string;
  age: string;
}

const UserProfileForm = ({
  onSave,
  user,
}: {
  onSave: Function;
  user: UserProfile;
}) => {
  const [userData, setUserData] = useState(user); // WHY after state change needs to be re-rendered
  const [errors, setErrors] = useState({} as Errors); // WHY after state change needs to be re-rendered

  // init user data on mount of component
  useEffect(() => {
    return () => {
      console.log("Mounting User Profile Form", userData);
    };
  }, []);

  // when user types in the form we want to update the user data
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log("name:", name, "value:'", value, "'");
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e: SyntheticEvent) => {
    //yes, still relevant?? As screen flickers on submit
    e.preventDefault();
    console.log("Try Saving user", userData);
    const errors = validateData();
    console.log("Have we got input Errors?", errors);
    // as error object does not have keys on instantiation we get away with this
    // if we have errors we want to show this on screen.
    if (Object.keys(errors).length) {
      // Thus we set errors in the state to use them in the jsx template
      // TODO Check if this can be done without state.
      setErrors(errors);
      return;
    }
    onSave(userData);
    console.log("Saving user to fake BE", userData, errors);
  };

  // Validate data after save button press
  function validateData(): Errors {
    let errors: Errors = {} as Errors;
    // console.log("object is required", userData);
    if (!userData.name) {
      errors.name = "Name is required";
    }
    if (!userData.occupation) {
      (errors.occupation = "Occupation is required"), userData.occupation, "<";
    }
    if (!userData.nickName) {
      errors.nickName = "Nickname is required";
    }
    if (!userData.age) {
      errors.age = "Age is required";
    }
    return errors;
  }

  return (
    <>
      <form onSubmit={handleSave}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={userData.name}
          onChange={handleChange}
        />
        <FormInputError errorMessage={errors.name}></FormInputError>
        <label htmlFor="occupation">Occupation</label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          defaultValue={userData.occupation}
          onChange={handleChange}
        />
        <FormInputError errorMessage={errors.occupation}></FormInputError>
        <label htmlFor="nickName">Nickname</label>
        <input
          type="text"
          id="nickName"
          name="nickName"
          defaultValue={userData.nickName}
          onChange={handleChange}
        />
        <FormInputError errorMessage={errors.nickName}></FormInputError>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          defaultValue={userData.age}
          onChange={handleChange}
        />
        <FormInputError errorMessage={errors.age}></FormInputError>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default UserProfileForm;
