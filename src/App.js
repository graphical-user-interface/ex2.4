import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Grid,
	Container,
	Paper,
	AppBar,
	Button,
	Toolbar,
	Link,
	Modal,
} from "@material-ui/core"

function rand() {
	return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
	const top = 50 + rand()
	const left = 50 + rand()

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2, 1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	modal: {
		position: "absolute",
		width: 300,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	shape: {
		width: 50,
		height: 50,
		borderRadius: "100%",
		position: "relative",
		"&:hover, &:focus,&.active": {
			"& $shapeBorder": {
				opacity: 1,
			},
		},
	},
	shapeBorder: {
		border: "4px solid transparent",
		display: "block",
		height: "100%",
		width: "100%",
		boxSizing: "border-box",
		opacity: 0,
		borderRadius: "100%",
	},
	innerShape: {
		width: "calc(100% - 6px)",
		height: "calc(100% - 6px)",
		display: "block",
		borderRadius: "100%",
		opacity: 0.6,
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
	},
	row: {
		marginTop: 20,
	},
}))
export default function App() {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [shapes, setShapes] = useState([
		{ color: "red", active: false },
		{ color: "blue", active: false },
		{ color: "green", active: false },
		{ color: "#000", active: false },
	])
	const [spacing, setSpacing] = useState(1)
	const [modalStyle] = useState(getModalStyle)
	const handleOpen = (e) => {
		e.preventDefault()
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	const selectShape = (i) => {
		let newShapes = [...shapes]
		newShapes[i].active = true
		setShapes(newShapes)
		console.log(newShapes)
	}
	return (
		<div className={classes.root}>
			<Container maxWidth='sm'>
				<Grid container>
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Paper elevation={2} className={classes.paper}>
							<AppBar position='relative' color='primary'>
								<Toolbar variant='dense'>
									<Grid container justify='space-between'>
										<Grid item>
											<Link href='#' color='inherit'>
												Add
											</Link>
										</Grid>
										<Grid item>
											<Link href='#' color='inherit'>
												Edit
											</Link>
										</Grid>
										<Grid item>
											<Link href='#' color='inherit'>
												Delete
											</Link>
										</Grid>
										<Grid item>
											<Link href='#' color='inherit'>
												Adjust spacing
											</Link>
										</Grid>
									</Grid>
								</Toolbar>
							</AppBar>
							<Grid
								container
								className={classes.row}
								spacing={spacing}>
								{shapes.map((shape, i) => (
									<Grid key={i} item>
										<Shape
											bg={shape.color}
											active={
												shape.active ? "active" : ""
											}
											selectShape={() => selectShape(i)}
										/>
									</Grid>
								))}
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={2}></Grid>
				</Grid>
			</Container>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<div style={modalStyle} className={classes.modal}>
					<h5 id='simple-modal-title'>About</h5>
					<p id='simple-modal-description'>
						Something about this application.
					</p>
					<p>
						<Button
							variant='contained'
							color='primary'
							onClick={handleClose}>
							Close
						</Button>
					</p>
				</div>
			</Modal>
		</div>
	)
}

const Shape = ({ bg, selectShape, active }) => {
	const classes = useStyles()
	return (
		<div
			className={`${active} ${classes.shape}`}
			style={{ borderColor: bg }}
			onClick={selectShape}>
			<span
				style={{ borderColor: bg }}
				className={classes.shapeBorder}></span>
			<span
				style={{ backgroundColor: bg }}
				className={classes.innerShape}></span>
		</div>
	)
}
