"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Stack,
  Heading,
  Text,
  Grid,
  Box,
  GridItem,
  Container,
  Button,
} from "@chakra-ui/react";
import "../globals.css";
import Wave from "../assets/Wave.svg";
import Link from "next/link";
import Confetti from "react-confetti";

function page() {
  const searchParams = useSearchParams();
  const search = searchParams.getAll("data");
  //select all the questions
  const [allQuestion, setAllQquestion] = useState(JSON.parse(search));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [question, setQuestion] = useState(allQuestion[currentQuestion]);
  const [answers, setAnswers] = useState([]);

  function handleScore(e) {
    setSelectedAnswer(question?.correct_answer);

    if (e === question?.correct_answer) setScore(score + 1);
    // console.log("hiiiiiiiiii");
  }

  function handleNextQuestion() {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
  }

  useEffect(() => {
    setQuestion(allQuestion[currentQuestion]);
  }, [currentQuestion]);

  useEffect(() => {
    setAnswers(
      [
        question?.incorrect_answers[0],
        question?.incorrect_answers[1],
        question?.incorrect_answers[2],
        question?.correct_answer,
      ].sort()
    );
  }, [question]);
  return (
    <Container
      className='welcome'
      position='relative'
      overflowY='scroll'
      width='600px'
      borderRadius='5px'
      h='80%'
      p='30px'
      bg='#f9f9f9'
    >
      {currentQuestion !== 10 ? (
        <Stack className='container-stack' spacing='30px'>
          <Heading
            color='cornflowerblue'
            zIndex='10'
            pt='25px'
            textAlign='center'
          >
            {question.question}
          </Heading>
          <hr style={{ width: "100%" }} />
          <Grid className='grid' templateColumns='repeat(2, 1fr)'>
            {answers.map((ele, index) => {
              return (
                ele !== undefined && (
                  <GridItem
                    key={index}
                    textAlign='center'
                    borderRadius='5px'
                    m='10px'
                    cursor='pointer'
                    onClick={() => handleScore(ele)}
                    bg={
                      !selectedAnswer
                        ? "#0099ff"
                        : selectedAnswer === ele
                        ? "green"
                        : "red"
                    }
                  >
                    <Text color='#f8f8f8'>{ele}</Text>
                  </GridItem>
                )
              );
            })}
          </Grid>
          {selectedAnswer && (
            <Button
              className='next'
              color='#f8f8f8'
              bg='#0099ff'
              border='0'
              cursor='pointer'
              width='25%'
              alignSelf='flex-end'
              justifySelf='flex-end'
              p='8px 12px'
              mr='10px'
              borderRadius='4px'
              onClick={handleNextQuestion}
            >
              Next
            </Button>
          )}
        </Stack>
      ) : (
        <>
          <Confetti />
          <Stack
            textAlign='center'
            color='#f8f8f8'
            position='relative'
            zIndex='10'
            direction='column'
            spacing='10px'
          >
            <Heading color='black' as='h1'>
              Your Score is: {score} / 10
            </Heading>
            <Link href='/'>
              <Button
                bg='#0066ff'
                fontSize='20px'
                color='#f8f8f8'
                borderRadius='5px'
                border='none'
                p='7px 10px '
                cursor='pointer'
              >
                Restart
              </Button>
            </Link>
          </Stack>
        </>
      )}
    </Container>
  );
}

export default page;
