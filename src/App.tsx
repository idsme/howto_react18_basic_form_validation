import viteLogo from "/vite.svg";
import "./App.css";
import UserProfileForm from "./UserProfileForm";

export interface UserProfile {
  name: string;
  occupation: string;
  nickName: string;
  age: number;
}

function App() {
  // Generate a user object for she-hulk just as a const
  const user = {
    name: "Ids Achterhof",
    nickName: "The Fixer",
    occupation: "Solves Puzzles",
    age: 107,
  };

  const saveUserProfile = (user: UserProfile) => {
    // Save the user object to local storage
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <>
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1>ShowCase From Basic From Validation,</h1>
      <h2>React 18, Vite, Typescript, No other libs</h2>
      <UserProfileForm onSave={saveUserProfile} user={user} />
    </>
  );
}

export default App;
