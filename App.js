import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native'; 


const App = props => {

    function Square({value,onPress})
    {
        return (
            <TouchableOpacity
                    onPress={onPress}
                    style={{
                        border: '1px solid black',
                        width: '100px',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                <Text>{value}</Text>
            </TouchableOpacity>
        );
    }

    function Board(props)
    {
        const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
        const [xIsNext, setXIsNext] = useState(true);

        const handlePress = index => {
           const squares = [...boardSquares];
        
           if(calculateWinner(squares) || squares[index])
                return;

            squares[index] = xIsNext ? 'X': 'O';
            setBoardSquares(squares);
            setXIsNext(!xIsNext);
        }

        useEffect(()=>{
            let squares = [...boardSquares];
            if(calculateWinner(squares))
                  return; 
                  
            let flag = false;
            for(let i=0; i < squares.length; i++)
            {
                if(squares[i] == null)
                {
                    flag = true;
                    break;
                }
            }

            if(!flag)
            {
                squares = Array(9).fill(null);
                setBoardSquares(squares);
            }
        },[boardSquares]);

        function calculateWinner(squares)
        {
            const winningLines = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [6,4,2]
            ];

            for(let i=0; i < winningLines.length; i++)
            {
                const [a,b,c] = winningLines[i];
                if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
                {
                    return squares[a];
                }
            }

            return null;
        }

        const RenderSquare = ({index}) => {
            return (
                <Square value={boardSquares[index]} onPress={() => handlePress(index)} />
            )
        }

        const handleReset = e => {
            const squares = Array(9).fill(null);
            setBoardSquares(squares);
        }

        const nextPlayer = xIsNext ? 'X' : 'O'; 
        const winner = calculateWinner(boardSquares);
        const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;

        return (
            <View
              style={{
                  width: '100%',
                  height: '100vh',
                  display : 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
              }}>
                <View
                    style={{
                        marginBottom: '30px'
                    }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: '20px'
                        }}
                        >{status}
                    </Text>
                </View>
                <View>
                    <View 
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <RenderSquare index={0} />
                            <RenderSquare index={1} />
                            <RenderSquare index={2} />
                    </View>
                    <View 
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <RenderSquare index={3} />
                            <RenderSquare index={4} />
                            <RenderSquare index={5} />
                    </View>
                    <View 
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                            <RenderSquare index={6} />
                            <RenderSquare index={7} />
                            <RenderSquare index={8} />
                    </View>
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '30px'
                    }}>
                    <TouchableOpacity
                            onPress={handleReset}
                            style={{
                                backgroundColor: 'green',
                                padding: '10px'
                            }}>
                        <Text
                           style={{
                               color: 'white'
                           }}
                            >Reset
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View>
            <Board />
        </View>
    );
}
export default App;