import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Stack,
  Checkbox,
  Select,
  Radio,
  RadioGroup,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addUser } from "../Services/api";

export const Adduser = () => {
  const initialValue = {
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    country: "",
    password: "",
    subname: [],
    image: "",
  };

  const [users, setUsers] = useState(initialValue);
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    firstname,
    lastname,
    email,
    password,
    subname,
    image,
    gender,
    country,
  } = users;
  const navigate = useNavigate();

  const addUserDetails = async () => {
    setFormErrors(validate(users));
    setIsSubmit(true);
  };

  const addData = async () => {
    let res = await addUser(users);
    if (res.data === "email is already registered") {
      alert("email is already registered ");
    } else {
      navigate("/all");
    }
  };

  const validate = (values) => {
    console.log(values);
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // const pwn=/(?=.*?[0-9])/;
    if (!values.firstname) {
      errors.firstname = "Firstname is Required";
    }
    if (!values.lastname) {
      errors.lastname = "lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Must be a valid email!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if (!/(?=.*?[0-9])/.test(values.password)) {
      errors.password = "At least one Number";
    } else if (!/(?=.*?[a-z])/.test(values.password)) {
      errors.password = "At least one Lowercase";
    } else if (!/(?=.*?[A-Z])/.test(values.password)) {
      errors.password = "At least one Uppercase";
    } else if (!/(?=.*?[#?!@$%^&*-])/.test(values.password)) {
      errors.password = "At least one special character";
    }
    if (values.subname.length == 0) {
      errors.subname = "Please Select atleas one subject";
    }
    if (!values.image) {
      errors.image = "Please upload your image";
    }
    if (!values.gender) {
      errors.gender = "Please select gender";
    }
    if (!values.country) {
      errors.country = "Choose the specific country";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      addData();
    }
  }, [formErrors]);

  const onValueChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const imageinput = (e) => {
    setUsers({ ...users, image: e.target.files[0] });
  };

  const handleSubject = async (e) => {
    let value = e.target.value;
    let checked = e.target.checked;

    if (checked) {
      setUsers({ ...users, subname: [...subname, value] });
    } else {
      let filtered = users.subname.filter((e) => e !== value);
      setUsers({ ...users, subname: [...filtered] });
    }
  };

  return (
    <FormControl
      onSubmit={() => addUserDetails()}
      sx={{ width: "40vw", margin: "auto", marginTop: 20 }}
    >
      <Text paddingTop={2} fontSize="4xl">
        AddUser
      </Text>
     
      <FormControl isInvalid={formErrors.firstname}>
        <FormLabel>Lastname</FormLabel>
        <Input
              type="text"
              name="firstname"
              value={firstname}
              id="email"
              autoComplete="off"
              onChange={(e) => onValueChange(e)}
        />
        {!formErrors.firstname ? (
          <FormHelperText>
          </FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.firstname}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={formErrors.lastname}>
        <FormLabel>Lastname</FormLabel>
        <Input
           type="text"
           name="lastname"
           value={lastname}
           autocomplete="off"
           onChange={(e) => onValueChange(e)}
        />
        {!formErrors.lastname ? (
          <FormHelperText>
          </FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.lastname}</FormErrorMessage>
        )}
      </FormControl>


      <FormControl isInvalid={formErrors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={onValueChange}
        />
        {!formErrors.email ? (
          <FormHelperText>
            Enter the email you'd like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.email}</FormErrorMessage>
        )}
      </FormControl>


      <FormControl isInvalid={formErrors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          value={password}
          autocomplete="off"
          onChange={(e) => onValueChange(e)}
        />
        {!formErrors.email ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.password}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={formErrors.subname}>
        <Stack spacing={[1, 5]} padding={5} direction={["column", "row"]}>
        <FormLabel>Subject</FormLabel>
        <Checkbox
          size="md"
          colorScheme="red"
          name="subject"
          value="Maths"
          onChange={(e) => handleSubject(e)}
        >
          Maths
        </Checkbox>
        <Checkbox
          size="md"
          colorScheme="green"
          name="subject"
          value="Science"
          onChange={(e) => handleSubject(e)}
        >
          Science
        </Checkbox>
        <Checkbox
          size="md"
          colorScheme="orange"
          name="subject"
          value="Arts"
          onChange={(e) => handleSubject(e)}
        >
          Arts
        </Checkbox>
      </Stack>
        
        {!formErrors.subname ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.subname}</FormErrorMessage>
        )}
      </FormControl>

      <br />

    
   
   <FormControl isInvalid={formErrors.image}>
        <FormLabel>Password</FormLabel>
        <Input
           type="file"
           name="image"
           onChange={(e) => {
             imageinput(e);
           }}
        />
        {!formErrors.image ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.image}</FormErrorMessage>
        )}
      </FormControl>


      <br />

        
   <FormControl isInvalid={formErrors.gender}>
        <RadioGroup name="gender">
        <Stack spacing={5} direction="row">
          <Radio value="male" onChange={(e) => onValueChange(e)}>
            Male
          </Radio>
          <Radio value="Female" onChange={(e) => onValueChange(e)}>
            Female
          </Radio>
        </Stack>
      </RadioGroup>
        {!formErrors.image ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.gender}</FormErrorMessage>
        )}
      </FormControl>
     


      <FormControl isInvalid={formErrors.country}>
        Country 
      <Select
        placeholder="Select option"
        name="country"
        onChange={(e) => onValueChange(e)}
      >
        <option value="india">India</option>
        <option value="usa">usa</option>
        <option value="canada">canada</option>
      </Select>
        {!formErrors.country ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>{formErrors.country}</FormErrorMessage>
        )}
      </FormControl>
     
      <br />
      <Button
        sx={{ mt: 5 }}
        colorScheme="teal"
        size="md"
        className="input-button"
        onClick={addUserDetails}
      >
        Submit
      </Button>


    </FormControl>

    
  );
};

// formik for form Handling
// yup for handling form validation
