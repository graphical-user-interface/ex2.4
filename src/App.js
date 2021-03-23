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
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	Modal,
	TextField,
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
		outline: 0,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	shape: {
		width: 50,
		height: 50,
		borderRadius: "100%",
		position: "relative",
		cursor: "pointer",
		"&.active": {
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
	button: {
		marginTop: 10,
	},
}))
export default function App() {
	const classes = useStyles()
	//open popup
	const [openAdd, setOpenAdd] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openDelete, setOpenDelete] = useState(false)
	const [openAdjustSpacing, setOpenAdjustSpacing] = useState(false)

	//color options for adding, editing shapes
	const [colors, setColors] = useState([
		"red",
		"blue",
		"green",
		"yellow",
		"cyan",
		"black",
		"pink",
		"purple",
		"violet",
		"orange",
	])

	//default shapes
	const [shapes, setShapes] = useState([
		{ color: "red", active: false },
		{ color: "blue", active: false },
		{ color: "green", active: false },
		{ color: "#000", active: false },
	])
	const [spacing, setSpacing] = useState(0)
	const [addValue, setAddValue] = useState(colors[0])
	const [modalStyle] = useState(getModalStyle)
	const [spacingValue, setSpacingValue] = useState(spacing)
	//modals handling
	const handleOpenAdd = (e) => {
		e.preventDefault()
		setOpenAdd(true)
	}
	const handleOpenEdit = (e) => {
		e.preventDefault()
		shapes.map((shape) => {
			if (shape.active) {
				setAddValue(shape.color)
			}
		})
		setOpenEdit(true)
	}
	const handleOpenDelete = (e) => {
		e.preventDefault()
		setOpenDelete(true)
	}
	const handleOpenAdjustSpacing = (e) => {
		e.preventDefault()
		setOpenAdjustSpacing(true)
	}
	const handleClose = () => {
		setOpenAdd(false)
		setOpenEdit(false)
		setOpenDelete(false)
		setOpenAdjustSpacing(false)
	}
	const handleAddChange = (e) => {
		setAddValue(e.target.value)
	}
	const handleAdd = (e) => {
		e.preventDefault()
		let newShapes = [...shapes]
		newShapes.push({ color: addValue, active: false })
		setShapes(newShapes)
		handleClose()
	}
	const handleEdit = (e) => {
		e.preventDefault()
		let newShapes = [...shapes]
		newShapes.filter((shape) => {
			if (shape.active) {
				shape.color = addValue
			}
		})
		setShapes(newShapes)
		handleClose()
	}
	const handleDelete = (e) => {
		e.preventDefault()
		let newShapes = []
		shapes.map((shape) => {
			if (!shape.active) {
				newShapes.push(shape)
			}
		})
		setShapes(newShapes)
		handleClose()
	}
	const handleAdjustSpacing = (e) => {
		e.preventDefault()
		setSpacing(spacingValue)
		handleClose()
	}
	const changeSpacingNumber = (e) => {
		setSpacingValue(e.target.value)
	}
	const selectShape = (i) => {
		let newShapes = [...shapes]

		//toggle active status
		if (!shapes[i].active) {
			newShapes.map((shape) => (shape.active = false))
			newShapes[i].active = true
		} else {
			newShapes.map((shape) => (shape.active = false))
		}
		setShapes(newShapes)
	}

	return (
		<>
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
												<Link
													href='/#!'
													color='inherit'
													onClick={handleOpenAdd}>
													Add
												</Link>
											</Grid>
											<Grid item>
												<Link
													href='/#!'
													color='inherit'
													onClick={handleOpenEdit}>
													Edit
												</Link>
											</Grid>
											<Grid item>
												<Link
													href='/#!'
													color='inherit'
													onClick={handleOpenDelete}>
													Delete
												</Link>
											</Grid>
											<Grid item>
												<Link
													href='/#!'
													color='inherit'
													onClick={
														handleOpenAdjustSpacing
													}>
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
												selectShape={() =>
													selectShape(i)
												}
											/>
										</Grid>
									))}
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={2}></Grid>
					</Grid>
				</Container>
			</div>
			{/* Modal for adding new shapes */}
			<Modal
				style={{ alignItems: "center", justifyContent: "center" }}
				open={openAdd}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<div style={modalStyle} className={classes.modal}>
					<h3 id='simple-modal-title'>Add new shape</h3>
					<p id='simple-modal-description'>
						Pick the color for new shape.
					</p>
					<form onSubmit={handleAdd}>
						<FormControl component='fieldset'>
							<RadioGroup
								aria-label='color'
								//select the first one as default value
								defaultValue={colors[0]}
								onChange={handleAddChange}
								name='Color'>
								<Grid container>
									{colors.map((color, i) => (
										<Grid item xs={6} key={i}>
											<FormControlLabel
												className={classes.radio}
												value={color}
												color={color}
												control={<Radio />}
												label={color}
											/>
										</Grid>
									))}
								</Grid>
							</RadioGroup>
							<Button
								variant='contained'
								color='primary'
								className={classes.button}
								type='submit'>
								Add
							</Button>
						</FormControl>
					</form>
				</div>
			</Modal>
			<Modal
				style={{ alignItems: "center", justifyContent: "center" }}
				open={openEdit}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<div style={modalStyle} className={classes.modal}>
					<h3 id='simple-modal-title'>Edit shape</h3>

					{shapes.filter((shape) => shape.active).length ? (
						<>
							<p id='simple-modal-description'>
								Edit the color of the chosen shape.
							</p>
							<form onSubmit={handleEdit}>
								<FormControl component='fieldset'>
									<RadioGroup
										aria-label='color'
										//select the first one as default value
										value={addValue}
										onChange={handleAddChange}
										name='Color'>
										<Grid container>
											{colors.map((color, i) => (
												<Grid item xs={6} key={i}>
													<FormControlLabel
														className={
															classes.radio
														}
														value={color}
														color={color}
														control={<Radio />}
														label={color}
													/>
												</Grid>
											))}
										</Grid>
									</RadioGroup>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
										type='submit'>
										Edit
									</Button>
								</FormControl>
							</form>
						</>
					) : (
						<div>
							<p>Please choose a shape to edit</p>
							<p>
								<Button
									variant='contained'
									color='primary'
									className={classes.button}
									onClick={handleClose}>
									Close
								</Button>
							</p>
						</div>
					)}
				</div>
			</Modal>
			<Modal
				style={{ alignItems: "center", justifyContent: "center" }}
				open={openDelete}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<div style={modalStyle} className={classes.modal}>
					<h3 id='simple-modal-title'>Delete shape</h3>

					{shapes.filter((shape) => shape.active).length ? (
						<>
							<p id='simple-modal-description'>
								Are you sure to delete this shape?
							</p>

							<Button
								variant='contained'
								color='primary'
								className={classes.button}
								onClick={handleDelete}>
								Delete
							</Button>
						</>
					) : (
						<div>
							<p>Please choose a shape to delete</p>
							<p>
								<Button
									variant='contained'
									color='primary'
									className={classes.button}
									onClick={handleClose}>
									Close
								</Button>
							</p>
						</div>
					)}
				</div>
			</Modal>
			<Modal
				style={{ alignItems: "center", justifyContent: "center" }}
				open={openAdjustSpacing}
				onClose={handleClose}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'>
				<div style={modalStyle} className={classes.modal}>
					<h3 id='simple-modal-title'>Edit shape</h3>
					<p id='simple-modal-description'>
						Adjust the spacing between shapes.
					</p>
					<form onSubmit={handleAdjustSpacing}>
						<FormControl component='fieldset'>
							<TextField
								id='standard-number'
								label=''
								type='number'
								onChange={changeSpacingNumber}
								InputProps={{
									inputProps: {
										max: 10,
										min: 1,
										value: spacingValue,
									},
								}}
							/>
							<Button
								variant='contained'
								color='primary'
								className={classes.button}
								onClick={handleAdjustSpacing}>
								Adjust spacing
							</Button>
						</FormControl>
					</form>
				</div>
			</Modal>
		</>
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
