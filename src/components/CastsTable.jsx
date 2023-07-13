import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import TableHead from "./TableHead";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BiDuplicate } from "react-icons/bi";
import { confirmAlert } from "react-confirm-alert";
import {
	useCreateCastMutation,
	useDeleteCastMutation,
	useDeleteCastWithCharactersMutation,
} from "../redux/features/cast/castApi";
const CastsTable = ({ title, data, classes, link }) => {
	const [deleteCast] = useDeleteCastMutation();
	const [deleteCastWithCharacter] = useDeleteCastWithCharactersMutation();
	const [createCast, result] = useCreateCastMutation();
	const navigate = useNavigate();
	const confirmDelete = (id) => {
		confirmAlert({
			title: "Confirm to Delete",
			message: "Are you sure about to delete this?",
			buttons: [
				{
					label: "Delete Cast & Characters",
					onClick: () => deleteCastWithCharacter(id),
				},
				{
					label: "Delete Cast but Keep Characters",
					onClick: () => deleteCast(id),
				},
				{
					label: "Cancel",
					onClick: () => console.log("Don't delete"),
				},
			],
		});
	};

	const duplicateCast = (id) => {
		const findCast = data.find(item => item.id === id);
		createCast({ name: findCast.name + " - Copy", characters: findCast.characters, user: findCast.user._id });
	}

	useEffect(() => {
		if (result?.isSuccess) {
			toast.success("Cast duplicate successful");
			navigate("/")
		} else if (result?.isError) {
			toast.error(result?.error?.data.message)
		}
	}, [result?.isSuccess, result?.isError])

	return (
		<Card className={`h-full w-full ${classes}`}>
			<table className="w-full min-w-max table-auto text-left">
				<thead>
					<tr className="w-full">
						<TableHead title={title} link={link} />
					</tr>
				</thead>
				<tbody>
					{data.length > 0 ? (
						data?.map(({ id, name, characters }, index) => {
							const isLast = index === data?.length - 1;
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
											{characters.length} characters
										</Typography>
									</td>

									<td className={classes}>
										<div className="flex justify-end items-center gap-x-3 text-lg ">
											<Link to={`/cast/${id}`}>
												<AiOutlineEye />
											</Link>
											<Link to={`/edit-cast/${id}`}>
												<AiOutlineEdit />
											</Link>

											<BiDuplicate
												className="cursor-pointer"
												onClick={() => duplicateCast(id)}
											/>
											<AiOutlineDelete
												className="cursor-pointer"
												onClick={() => confirmDelete(id)}
											/>
										</div>
									</td>
								</tr>
							);
						})
					) : (
						<p className="p-4 py-3">you have not cast</p>
					)}
				</tbody>
			</table>
		</Card>
	);
};

export default CastsTable;