import signUp from "../apicall/signup.js";


// ! Start of Focus input Handler

//  ? "this" sent by the function call received below as e contains the .input element which can be used to focus the control on the input tag when .input is clicked

const focusInput = (e) => e.children[0].focus();

// ! End of Focus input Handler

// ! Start of Form Validation


// ? Checks the input values provided by user

const validateCred = (Username, password, re_password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password !== re_password) {
    alert("password and re-entered password should match");
    return false;
  }
  if (!regex.test(password)) {
    alert(
      "password should fullfill the following requirements of having atleast:one lowercase letter,one uppercase letter,one digit,one special character from the set `@$!%*?` & and should be at least 8 characters long"
    );
    return false;
  }
  return true;
};

// ! End of Form Validation

// ! Start of Form Handler

// ? handles the input values provided by user

const handleSignUp = async (e) => {
  e.preventDefault();
  const Username = e.target.elements["username"].value,
    password = e.target.elements["password"].value,
    re_password = e.target.elements["re_password"].value;
    if (validateCred(Username, password, re_password)) {
    const res = await signUp(Username, password);
    if (res.data) {
      alert("Sign Up successfull")
      location.pathname="../index.html"
    }
}
};

// ! End of Form Handler

window.handleSignUp=handleSignUp;
window.focusInput=focusInput;

// ! module imported as (type=module) in index.html so that this js file can use import function to import makeLogin
// ! But because of this script becomes LocalScoped i.e. Variables and functions defined in this script/module are scoped to this script/module and do not 
// ! pollute the global scope unless explicitly assigned to window. 
// ! hence inorder to make the functions handleLogin & focusInput globally scoped fancy way of saying : accessible to the html file and its elements so 
// ! that form could make onsubmit work and input_element could make focus work we assign them to the window object now they are accessed globally