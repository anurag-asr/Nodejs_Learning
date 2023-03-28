import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Stack,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  Box,
} from "@chakra-ui/react";
import "../App.css"

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { getUsers, editUser } from "../Services/api";

const initialValue = {};

export const EditUser = () => {
  const [image, setImage] = useState("");
  // const [subject, setSubject] = useState([]);
  // const [subname,setSubname]=useState([])
  const [selectedImage,setSelectedImage]=useState("");
  const [user, setUser] = useState({});
  const { firstname, url, lastname, email, sub, gender, country } = user;
  const { id } = useParams();
  let navigate = useNavigate();

 

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data[0]);
  };

  const imageinput = async (e) => {
     setSelectedImage(e.target.files[0])
     setUser({ ...user, image: e.target.files[0] });
    // await editUser(id, user);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubject=async(e)=>{
    let value=e.target.value;
    let checked=e.target.checked;
 
    if(checked){
      setUser({ ...user, sub:[...sub,value] })
    }
    else{
      let filtered=user.sub.filter((e)=>(e!==value))
       setUser({...user,sub:[...filtered]})
    }

    }

  const editUserDetails = async () => {
    await editUser(id, user);
    navigate("/all")
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  // console.log(user)


  // console.log(user.url,"before change input")

  return (
    <Box>
   
      {Object.values(user).length > 0 && (
        <FormControl sx={{ width: "40vw", margin: "auto", marginTop: 20 }}>
          <Text paddingTop={2} fontSize="4xl">
            EditUser
          </Text>
          <FormLabel>FisrtName</FormLabel>
          <Input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => onValueChange(e)}
          />
          <FormLabel>LastName</FormLabel>
          <Input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => onValueChange(e)}
          />
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onValueChange(e)}
          />
          {
            <Stack spacing={[1, 5]} padding={5} direction={["column", "row"]}>
        
              <FormLabel>Subject</FormLabel>
              <Checkbox
                size="md"
                colorScheme="red"
                defaultChecked={user.sub.includes("Maths") ? true : false}
                value="Maths"
                name="subject"
                onChange={(e) => handleSubject(e)}
              >
                Maths
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="green"
                defaultChecked={user.sub.includes("Science") ? true : false}
                value="Science"
                name="subject"
                onChange={(e) => handleSubject(e)}
              >
                Science
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="orange"
                defaultChecked={user.sub.includes("Arts") ? true : false}
                value="Arts"
                name="subject"
                onChange={(e) => handleSubject(e)}
              >
                Arts
              </Checkbox>
            </Stack>
          }
          <Input
            type="file"
            name="image"
            onChange={(e) => {
              imageinput(e);
            }}
          />

          {/* <img src={url_new ? {url_new} : url} alt=""   /> */}
           
          {
          
           selectedImage ? <img src={URL.createObjectURL(selectedImage) } alt="Logo" width={100} height={30} /> : <img src={url}
             alt="" width={100} height={30} />
          } 

          <br />
          {/* <RadioGroup  name="gender">
            <Stack spacing={5} direction="row" name="gender">
              <Radio
                value="male"
                name="gender"
                // checked={user.gender === "male" ? true : false}
                defaultChecked
                onChange={(e) => onValueChange(e)}
              >
                Male
              </Radio>
              <Radio
                value="Female"
                name="gender"
                // checked={user.gender == "Female" ? true : false}
                defaultChecked
                onChange={(e) => onValueChange(e)}
              >
                Female
              </Radio>
            </Stack>
          </RadioGroup> */}
          

<div className="radio">

      <input type="radio"  name="gender" value="male" checked={gender === "male" ? true : false}   onChange={(e) => onValueChange(e)}/>
      <label for="dewey">Male</label>
    
   
      <input type="radio" name="gender" value="female" checked={gender == "Female" ? true : false}   onChange={(e) => onValueChange(e)}/>
      <label for="louie">Female</label>
   
  
</div>
   

          Country :
          <Select
            placeholder="Select option"
            name="country"
            value={country}
            onChange={(e) => onValueChange(e)}
          >
            <option value="india">India</option>
            <option value="usa">usa</option>
            <option value="canada">canada</option>
          </Select>
          <Button
            sx={{ mt: 5 }}
            colorScheme="teal"
            size="md"
            onClick={() => editUserDetails()}
          >
            Edit User
          </Button>
        </FormControl>
      )}
    </Box>
  );
};
