import React, { useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import TableHead from "./TableHead";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
	AiOutlineDelete,
	AiOutlineEdit,
	AiOutlineEye,
	AiOutlineCheckCircle,
} from "react-icons/ai";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { BiDuplicate } from "react-icons/bi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
	useCreateCharacterMutation,
	useDeleteCharacterMutation,
} from "../redux/features/characters/charactersApi";

const CharacterTable = ({
	title,
	data: characterData,
	classes,
	link,
	characters,
	setCharacters,
}) => {
	const [deleteCharacter, result] = useDeleteCharacterMutation();
	const [createCharacter, dublicateCharacterResult] =
		useCreateCharacterMutation();
	const handleDelete = (id) => {
		deleteCharacter(id);
	};

	useEffect(() => {
		if (result?.isSuccess) {
			toast.success(result?.data.message);
		} else if (result?.isError) {
			toast.error(result?.error.message);
		}
	}, [result?.isSuccess, result?.isError]);

	const confirmDelete = (id) => {
		confirmAlert({
			title: "Confirm to Delete",
			message: "Are you sure about to delete this?",
			buttons: [
				{
					label: "Yes",
					onClick: () => handleDelete(id),
				},
				{
					label: "No",
					onClick: () => console.log("Don't delete"),
				},
			],
		});
	};

	const handleAddCharacter = (char) => {
		setCharacters([...characters, char]);
	};
	const handleRemoveCharacter = (id) => {
		const restCharacter = characters.filter((character) => character._id != id);
		setCharacters(restCharacter);
	};

	const duplicateCharactor = (id) => {
		const {
			name,
			age,
			gender,
			enneagramtype,
			enneagramwing,
			enneagramvariant,
		} = characterData.find((item) => item.id === id);
		const copyCharacter = {
			name: name + " - Copy",
			age,
			gender,
			// race: null,
			enneagramtype,
			enneagramwing,
			enneagramvariant,
		};
		createCharacter(copyCharacter);
	};

	useEffect(() => {
		if (dublicateCharacterResult?.isSuccess) {
			toast.success("Character duplicate successful");
		} else if (result?.isError) {
			toast.error(dublicateCharacterResult?.error.message);
		}
	}, [dublicateCharacterResult?.isSuccess, dublicateCharacterResult?.isError]);

	return (
		<Card className={`h-full w-full ${classes}`}>
			<table className="w-full min-w-max table-auto text-left">
				<thead>
					<tr className="w-full">
						<TableHead title={title} link={link} />
					</tr>
				</thead>
				<tbody>
					{characterData?.length > 0 ? (
						characterData?.map((char, index) => {
							const { id, name, enneagramvariant } = char;
							const isLast = index === characterData?.length - 1;
							const classes = isLast
								? "p-4 py-3"
								: "p-4 py-3 border-b-4 border-blue-gray-50 ";

							return (
								<tr key={name} className="rounded-none">
									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal"
										>
											{name}
										</Typography>
									</td>
									<td className={classes}>
										<Typography
											variant="small"
											color="blue-gray"
											className="font-normal"
										>
											{enneagramvariant}
										</Typography>
									</td>

									<td className={classes}>
										<div className="flex justify-end items-center gap-x-3 text-lg ">
											<Link to={`/character/${id}`}>
												<AiOutlineEye />
											</Link>
											<Link to={`/edit-character/${id}`}>
												<AiOutlineEdit />
											</Link>

											<BiDuplicate
												className="cursor-pointer"
												onClick={() => duplicateCharactor(id)}
											/>

											<AiOutlineDelete
												className="cursor-pointer"
												onClick={() => confirmDelete(id)}
											/>
											{characters ? (
												characters?.some((char) => char._id === id) ? (
													<AiOutlineCheckCircle
														className="cursor-pointer"
														onClick={() => handleRemoveCharacter(id)}
													/>
												) : (
													<MdOutlineRadioButtonUnchecked
														className="cursor-pointer"
														onClick={() => handleAddCharacter(char)}
													/>
												)
											) : null}
										</div>
									</td>
								</tr>
							);
						})
					) : (
						<p className="p-4 py-3">you have no characters</p>
					)}
				</tbody>
			</table>
		</Card>
	);
};

export default CharacterTable;
