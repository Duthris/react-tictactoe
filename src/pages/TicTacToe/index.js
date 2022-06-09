import React from "react";
import {
    makeStyles,
    Grid,
    Container,
    Paper,
    Button,
    ButtonGroup,
    Switch,
    FormControlLabel,
    Typography
} from '@material-ui/core';
import StartIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ResignIcon from '@mui/icons-material/DisabledByDefault';

import {
    Modal,
    Backdrop,
    Box,
    Fade
} from "@mui/material";


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        borderTop: "2px solid #9c27b0",
        borderRight: "2px solid #9c27b0"
    },
    centerText: {
        textAlign: "center"
    },
    grid: {
        marginTop: "6rem",
        justifyContent: "center"
    },
    button: {
        background: "#000",
    }
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    color: "#9c27b0",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TicTacToe() {

    const classes = useStyles()



    const [game, setGame] = React.useState({
        playerStartsFirst: true,
        gameStarted: false,
        gameEnded: false,
        winner: 'none',
        winNotification: false,
    })

    const handleClose = () => setGame(game => ({ ...game, winNotification: false }));

    const [computerTurn, setComputerTurn] = React.useState(false);

    const resetGame = () => {
        setBoardState({
            "0,0": null,
            "0,1": null,
            "0,2": null,
            "1,0": null,
            "1,1": null,
            "1,2": null,
            "2,0": null,
            "2,1": null,
            "2,2": null,
        })

        setGame(game => ({ ...game, gameStarted: false, gameEnded: true }))

        setComputerTurn(false);
    }

    const [boardState, setBoardState] = React.useState({
        "0,0": null,
        "0,1": null,
        "0,2": null,
        "1,0": null,
        "1,1": null,
        "1,2": null,
        "2,0": null,
        "2,1": null,
        "2,2": null,
    })

    const winConditions = [
        ["0,0", "0,1", "0,2"],
        ["1,0", "1,1", "1,2"],
        ["2,0", "2,1", "2,2"],
        ["0,0", "1,0", "2,0"],
        ["0,1", "1,1", "2,1"],
        ["0,2", "1,2", "2,2"],
        ["0,0", "1,1", "2,2"],
        ["0,2", "1,1", "2,0"],
    ]

    const handlePaper = (event) => {
        const newBoard = {
            'paper00': "0,0",
            'paper01': "0,1",
            'paper02': "0,2",
            'paper10': "1,0",
            'paper11': "1,1",
            'paper12': "1,2",
            'paper20': "2,0",
            'paper21': "2,1",
            'paper22': "2,2"
        }

        const handleClick = newBoard[event.target.id]
        console.log(handleClick);

        for (const [key, value] of Object.entries(boardState))
            if (value === null && key === handleClick && !computerTurn) {
                setBoardState({ ...boardState, [handleClick]: "X" })
                setComputerTurn(true);
            }
    }

    const win = (boardState) => {
        for (let i = 0; i < winConditions.length; i++) {
            let [a, b, c] = winConditions[i];
            if (boardState[a] != null && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                setGame({
                    ...game, gameEnded: true, winner: boardState[a], winNotification
                        : true
                })
                resetGame();
                return;
            }

            else if (!Object.values(boardState).some(v => v === null)) {
                setGame(game => ({ ...game, winner: null, gameEnded: true, winNotification: true }))
                resetGame();
                return;
            }

        }
    }

    React.useEffect(() => {
        if (computerTurn) {
            computerMove();
        }

        win(boardState);
        console.log(game.winner)
    }, [boardState])

    const handleEmptySquare = () => {
        return Object.keys(boardState).filter(k => boardState[k] === null)
    }

    const randomPlace = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    }

    const startGame = () => {
        setGame({ ...game, gameStarted: true, gameEnded: false })
        if (!game.playerStartsFirst) {
            computerMove()
            setComputerTurn(false);
        }
    }

    const computerMove = () => {
        setBoardState({
            ...boardState,
            [randomPlace(handleEmptySquare())]: "O"
        })

        setComputerTurn(false);
    }

    return <Container>
        <Container>
            <Grid container spacing={2} className={classes.grid}>
                <ButtonGroup variant="contained" color="primary" size="large" aria-label="outlined primary button group">
                    <Button
                        onClick={startGame}
                        disabled={game.gameStarted ? true : false}
                    ><StartIcon />Start Game</Button>
                    <Button className={classes.button}
                        onClick={resetGame}
                        disabled={game.gameStarted ? false : true}
                    ><ResignIcon />Resign</Button>
                </ButtonGroup>
                <FormControlLabel
                    control={<Switch
                        value={game.playerStartsFirst}
                        defaultChecked
                        color="primary"
                        onChange={event => setGame({ ...game, playerStartsFirst: event.target.checked })}
                    />}
                    label="Go First"
                    style={{ color: "#9c27b0", marginLeft: "1rem" }}
                    labelPlacement="start" />
            </Grid>
        </Container>
        {game.gameStarted && !game.gameEnded &&
            <Grid container spacing={0} columns={0} className={classes.grid} >
                <Grid container item spacing={0} columns={0} xs={8} >
                    <Grid item xs={4} >
                        <Paper
                            id="paper00"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                            style={{ borderLeft: "2px solid #9c27b0" }}
                        >
                            <Typography>
                                {boardState["0,0"]}
                            </Typography>

                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper01"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                        >
                            <Typography>
                                {boardState["0,1"]}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper02"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                        >
                            <Typography>
                                {boardState["0,2"]}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper10"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                            style={{ borderLeft: "2px solid #9c27b0" }}
                        >
                            <Typography>
                                {boardState["1,0"]}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper11"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                        >
                            <Typography>
                                {boardState["1,1"]}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper12"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                        >
                            <Typography>
                                {boardState["1,2"]}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper20"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                            style={{ borderLeft: "2px solid #9c27b0", borderBottom: "2px solid #9c27b0" }}
                        >
                            <Typography>
                                {boardState["2,0"]}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper21"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                            style={{ borderBottom: "2px solid #9c27b0" }}
                        >
                            <Typography>
                                {boardState["2,1"]}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            id="paper22"
                            className={classes.paper}
                            onClick={event => { handlePaper(event) }}
                            style={{ borderBottom: "2px solid #9c27b0" }}
                        >
                            <Typography>
                                {boardState["2,2"]}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        }

        <Modal
            open={game.winNotification}
            onClose={handleClose}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 1000,
            }}
        >
            <Fade in={game.winNotification}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        The Game is Over!
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        {game.winner === "X" ? "You Won!" : game.winner === "O" ? "You Lost!" : "It's a Draw!"}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    </Container>
}

