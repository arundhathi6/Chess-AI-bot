import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import ButtonsGroup from './Button';
import { Badge, Box, Button, Card, CardBody, Center, Flex, Input, Text } from '@chakra-ui/react';

function ChessBotApp() {
    const [fen, setFen] = useState('start');
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleMove = (move) => {
        const chess = new Chess(fen);
        if (chess.move(move)) {
            setFen(chess.fen());
        }
    };

    const handleEnter = (e) => {
        if (e.key == "Enter") {
            handleQuery(query)
        }
    }

    const handleQuery = (query) => {
        const userQuery = query.toLowerCase();
        let aiResponse = '';

        if (userQuery.includes('castle')) {
            aiResponse = 'Castling is a special and important move involving the king and one of the rooks. Castling is subject to specific rules and conditions';
        }
        else if (userQuery.includes('checkmate')) {
            aiResponse = 'Checkmate is when a king is under attack.';
        }
        else if (userQuery.includes('king')) {
            aiResponse = 'The king is the most important piece in chess. The king can move one square in any direction.';
        }
        else if (userQuery.includes('queen')) {
            aiResponse = 'The queen is the most powerful piece in chess. The queen can move horizontally, vertically, and diagonally.';
        }
        else if (userQuery.includes('rook')) {
            aiResponse = 'The rook can move horizontally and vertically.';
        }
        else if (userQuery.includes('bishop')) {
            aiResponse = 'The bishop can move diagonally.';
        }
        else if (userQuery.includes('knight')) {
            aiResponse = 'The knight moves in an L-shape, two squares in one direction (horizontally or vertically) and then one square in a perpendicular direction.';
        }
        else if (userQuery.includes('pawn')) {
            aiResponse = 'Pawns move forward one square, but capture diagonally. On their first move, they have the option to move forward two squares.';
        }
        else if (userQuery.includes('chess')) {
            aiResponse = 'Chess is a two-player strategy board game played on an 8x8 grid. The objective is to checkmate the opponent’s king.';
        }
        else if (userQuery.includes('promotion')) {
            aiResponse = 'Pawn promotion occurs when a pawn reaches the opposite end of the board. The pawn can be promoted to a queen, rook, bishop, or knight.';
        }
        else {
            aiResponse = "'I'm not sure.Please ask another question.";
        }
        setResponse(aiResponse);
    };


    const chessTerms = [
        { name: 'king', color: 'orange' },
        { name: 'queen', color: 'yellow' },
        { name: 'rook', color: 'green' },
        { name: 'bishop', color: 'teal' },
        { name: 'knight', color: 'blue' },
        { name: 'pawn', color: 'cyan' },
        { name: 'promotion', color: 'purple' },
        { name: 'what is chess?', color: 'red' },
        // Add more chess-related terms as objects with name and color properties
    ];
    return (
        <Box w={[200, 400, 500]} mb={50}>
            <Center mt={10} mb={10} >
                <Chessboard width={300} position={fen} onDrop={(move) => handleMove(move)} />
            </Center>
            <Box className="buttons_div" >
                {chessTerms.map((item, index) => {
                    return (
                        <ButtonsGroup item={item} key={index} setQuery={setQuery} handleQuery={handleQuery} />
                    )
                })}
            </Box>

            {response &&
                <Center mt={10}>
                    <Card >
                        <CardBody display={"flex"}>
                            <Text fontSize={"16px"} fontWeight="600">
                                <Badge fontSize='1em' mr={3} colorScheme='green'>
                                    AI Response :
                                </Badge>
                                {response}</Text>
                        </CardBody>
                    </Card>
                </Center>
            }
            <Center >
                <Flex mt={3} gap={4} mb={10} w={500}>
                    <Input size='lg'
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask a chess-related question"
                        onKeyPress={(e) => handleEnter(e)}
                    />
                    <Button size='lg' colorScheme='blue' onClick={(e)=>handleQuery(query)}>ASK</Button>
                </Flex>
            </Center>
        </Box>
    );
}

export default ChessBotApp;
