import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Button, Text, HStack,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import {
  useSupabaseClient,
  useUser,
  useSession,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useAsync } from "react-use";

export const Account = () => {

  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  const singOut = async () => {
    router.push("/login_signup");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully");
    }
  };

  return (
      <>
        <Menu>
          <MenuButton
              bgColor={"whiteAlpha.200"}
              color={"whiteAlpha.800"}
              height={"auto"}
              rounded={"3xl"}
              display={{sm : "none" , md : "flex"}}
              pl={3}
              as={IconButton}
              rightIcon={<Avatar name={user?.email} size={{sm : "sm" , md : "md"}} />}
              _expanded={{ bg: "whiteAlpha.200" }}
              _focus={{ bg: "#1c1c1c", boxShadow: "none" }}
          >

            <HStack >
              <TriangleDownIcon w={3} h={3} mr={2} color={"whiteAlpha.600"} />
              <Text> {user?.email}</Text>
            </HStack>

          </MenuButton>

          <MenuList bgColor={"whiteAlpha.200"}>
            <MenuItem onClick={singOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>

        <Avatar name={user?.email} size={"sm"} display={{sm : "block" , md : "none"}} />
      </>
  );
};
