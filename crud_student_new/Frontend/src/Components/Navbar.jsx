import {
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  Button,
  Menu,
  MenuButton,

  useColorModeValue,
  Stack,

} from "@chakra-ui/react";



export const Navbar = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
                <Text>User Details Info</Text>
              </MenuButton>

              {/* <Link mt={20} color='teal.500' href="/add">
                   AddUser
              </Link> */}

       <Stack direction={"row"} spacing={10}>
              <Link color='teal.500' href="/add"><Text paddingTop={2} fontSize='2xl'>AddUser</Text></Link>
              <Link color='teal.500'  href="/all"><Text paddingTop={2}  fontSize='2xl'>Alluser</Text></Link>
       </Stack>

            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};
