"use client";
import React, { useState } from "react";
import { Stack, Spinner, Heading, Button, Box, Select } from "@chakra-ui/react";
import Link from "next/link";
import "../globals.css";

function Welcome() {
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [loader, setLoader] = useState(false);
  const [quizes, setQuizes] = useState({});

  function handleSubmit() {
    setLoader(true);
    let URL = "";
    if (!type) {
      URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`;
    } else {
      URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=${type}`;
    }
    if (difficulty) {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => setQuizes(data.results));
    } else return;
  }
  console.log(quizes);
  return (
    <Stack
      position='relative'
      direction='column'
      borderRadius='8px'
      w='500px'
      overflow='hidden'
      bg='#f8f8f8'
      h='60%'
      p='30px'
      spacing='30px'
      className='welcome'
    >
      <Box zIndex='9' position='absolute' className='bg-wave'></Box>
      <Heading zIndex='10' as='h1' textAlign='center' color='#f1f1f1'>
        Welcome to Quiz App
      </Heading>
      <Select
        zIndex='10'
        onChange={(e) => setDifficulty(e.target.value)}
        borderColor='blue.200'
        color='blue.500'
      >
        <option>Select The Difficulty</option>
        <option value='easy'>Easy</option>
        <option value='medium'>Medium</option>
        <option value='hard'>Hard</option>
      </Select>
      <Select
        zIndex='10'
        onChange={(e) => setType(e.target.value)}
        borderColor='blue.200'
        color='blue.500'
      >
        <option>Select The Type</option>
        <option value=''>Any Type</option>
        <option value='multiple'>Multiple Choice</option>
        <option value='boolean'>True or False</option>
      </Select>

      {Object.keys(quizes).length !== 0 ? (
        <Link
          zIndex='10'
          href={{ pathname: "/Quiz", query: { data: JSON.stringify(quizes) } }}
        >
          <Button w='100%' bg='blue.400' color='gray.50' colorScheme='blue.900'>
            CLICK TO START
          </Button>
        </Link>
      ) : (
        <Button
          cursor={loader && "not-allowed"}
          zIndex='10'
          onClick={handleSubmit}
          bg='blue.400'
          color='gray.50'
          colorScheme='blue.900'
        >
          {loader ? <Spinner /> : "Submit"}
        </Button>
      )}
    </Stack>
  );
}

export default Welcome;
