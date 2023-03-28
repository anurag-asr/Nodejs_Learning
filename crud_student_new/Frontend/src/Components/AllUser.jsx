import {
    Table,
    Thead,
    Tbody,
    // Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
  } from '@chakra-ui/react'

  import { getUsers,deleteUser } from '../Services/api';

  import {useState,useEffect} from "react"
import { useNavigate } from 'react-router-dom';

export const AllUser=()=>{
    const [users, setUsers] = useState([]);
    const navigate=useNavigate();
    
    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers()
    }

    const getAllUsers = async () => {
        let response = await getUsers();
        setUsers(response.data);
    }



    return (
    <TableContainer>
        <Table variant='simple' margin={"auto"} mt={20} w={"90vw"}>
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}

    <Thead>
      <Tr>
        <Th>FirstName</Th>
        <Th>Lastname</Th>
        <Th >Email_address</Th>
        <Th >Avatar</Th>
        <Th >Subject</Th>
        <Th >Gender</Th>
        <Th >Country</Th>
      </Tr>
    </Thead>

    <Tbody>
        {
            users.length>0 && users.map((user)=>{
                return(
                <Tr key={user._id}>
                    <Td>{user.firstname}</Td>
                    <Td>{user.lastname}</Td>
                    <Td>{user.email}</Td>
                    <Td><img style={{width:50,height:50}} src={user.url} alt="error while mapping the data" /></Td>
                    <Td>
                        {/* {console.log(user.sub)} */}
                        {user.sub.map((elem)=>(<div>
                        <p>{elem}</p>
                    </div>))}
                    </Td>
                    <Td>{user.country}</Td>
                    <Td>{user.gender}</Td>
                    <Button colorScheme='green' onClick={()=>{navigate(`/editpage/${user._id}`)}}>Edit</Button>
                    <Button colorScheme='red' ml={2} onClick={()=>deleteUserData(user._id)}>Delete</Button>
                </Tr>
                )

            })
        }
    </Tbody>
  </Table>
</TableContainer>
    )
}