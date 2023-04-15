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
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const Account = () => {

  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  const singOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully");
      router.push("/login_signup");
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
              pl={3}
              as={IconButton}
              rightIcon={<Avatar name={user?.email} size={{sm : "sm" , md : "md"}} />}
              _expanded={{ bg: "whiteAlpha.200" }}
              _focus={{ bg: "#1c1c1c", boxShadow: "none" }}
          >

            <HStack>
              <TriangleDownIcon fontSize={"xs"} color={"whiteAlpha.600"} />
              <Text fontSize={"sm"} display={{sm : "none" , md : "block"}}> {user?.email}</Text>
            </HStack>

          </MenuButton>

          <MenuList bgColor={"black"}>
            <MenuItem onClick={singOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>

      </>
  );
};
