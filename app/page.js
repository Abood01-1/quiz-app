import styles from "./page.module.css";
import Link from "next/link";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Welcome from "./components/Welcome";
export default function Home() {
  return (
    <ChakraProvider>
      <Container maxW='100%' centerContent>
        <Welcome />
      </Container>
    </ChakraProvider>
  );
}
