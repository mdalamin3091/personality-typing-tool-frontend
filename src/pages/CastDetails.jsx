import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	useDeleteCastMutation,
	useDeleteCastWithCharactersMutation,
	useGetCastQuery,
} from "../redux/features/cast/castApi";
import { Card, Typography } from "@material-tailwind/react";
import {
	AiOutlineArrowLeft,
	AiOutlineDelete,
	AiTwotoneEdit,
} from "react-icons/ai";
import CastCharacterTable from "../components/CastCharacterTable";
import Loader from "../components/Loader";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast";
const CastDetails = () => {
	const { id } = useParams();
	const { data, isLoading, isError, isSuccess } = useGetCastQuery(id);
	const [enneagramData, setEnneagramData] = useState([]);
	const [enneagramNumbers, setEnneagramNumbers] = useState([]);
	const [relationData, setRelationData] = useState(null);

	const [deleteCastWithCharacter, castWithCharacterResult] =
		useDeleteCastWithCharactersMutation();
	const [deleteCast, result] = useDeleteCastMutation();
	const navigate = useNavigate();
	const confirmDelete = () => {
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

	useEffect(() => {
		if (castWithCharacterResult.isSuccess) {
			toast.success(castWithCharacterResult?.data.message);
			navigate("/");
		} else if (castWithCharacterResult?.isError) {
			toast.error(castWithCharacterResult?.error?.data.message);
		}

		if (result?.isSuccess) {
			toast.success(result?.data.message);
			navigate("/");
		} else if (result?.isError) {
			toast.error(result?.error?.data.message);
		}
	}, [
		castWithCharacterResult.isSuccess,
		castWithCharacterResult?.isError,
		result?.isSuccess,
		result?.isError,
	]);
	let content;
	if (isLoading) {
		content = <Loader />;
	} else if (!isLoading && isError) {
		content = "something was wrong";
	} else if (!isLoading && !isError && isSuccess) {
		const TABLE_HEAD = ["character Name", "enneagram Type"];
		const { name, characters } = data?.data;
		content = (
			<div className="">
				<figure className="relative">
					<img
						src="https://placehold.co/800x450?text=Placeholder"
						className="w-full h-[500px] md:h-[700px] object-cover"
						alt=""
					/>
					<Link
						to="/"
						className="gap-2 flex items-center justify-center absolute left-5 top-5 opacity-60"
					>
						<AiOutlineArrowLeft />
						BACK
					</Link>
				</figure>

				<div className="p-4 md:p-8">
					<div className="flex justify-between items-start">
						<div>
							<h1 className="text-xl text-gray-800 md:text-3xl font-bold">
								{name}
							</h1>
						</div>
						<div className="flex gap-3">
							<Link
								to={`/edit-cast/${id}`}
								className=" mr-2 text-xl md:text-4xl"
							>
								<AiTwotoneEdit />
							</Link>
							<AiOutlineDelete
								className="cursor-pointer text-xl md:text-4xl"
								onClick={confirmDelete}
							/>
						</div>
					</div>

					<div className="text-gray-700 mt-5">
						<div className="flex flex-col gap-y-4 my-8 mx-auto w-[100%] md:w-[50%]">
							<Card className="h-full w-full">
								<div className="w-full min-w-max text-left">
									<div>
										<div className="flex justify-between items-center">
											{TABLE_HEAD.map((head) => (
												<div
													key={head}
													className="p-4 font-bold text-3xl capitalize"
												>
													<Typography
														variant="small"
														color="blue-gray"
														className="leading-none font-bold"
													>
														{head}
													</Typography>
												</div>
											))}
										</div>
									</div>
									<div>
										{characters &&
											characters?.map((char) => (
												<CastCharacterTable
													setRelationData={setRelationData}
													character={char}
													enneagramData={enneagramData}
													setEnneagramData={setEnneagramData}
													setEnneagramNumbers={setEnneagramNumbers}
													enneagramNumbers={enneagramNumbers}
												/>
											))}
									</div>
								</div>
							</Card>
						</div>
						<div className="flex items-center gap-4 justify-center flex-col md:flex-row">
							{enneagramData.length > 0 ? enneagramData.map(item => {
								enneagramNumbers.push(item.enneagram_number)
								return (
									<div className="border-2 border-gray-200 p-5">
										<h2 className="mt-10 font-bold text-2xl">Enneagram Type Data</h2>
										<div className="text-gray-700 mt-5">
											<span className="font-bold">Title:</span> {item.title} <br />
											<span className="font-bold">Core motivation:</span>{" "}
											{item.core_motivation} <br />
											<span className="font-bold">Left wing:</span> {item.left_wing} <br />
											<span className="font-bold">Right wing:</span> {item.right_wing}{" "}
											<br />
										</div>
									</div>
								)
							}) : <p> Please selected any Enneagram Type</p>}
						</div>

						{relationData && enneagramNumbers.length > 2 ? (
							<div className="flex items-center justify-center w-full md:w-[63%] mt-5 mx-auto">
								<div className="border-2 border-gray-200 p-5">
									<h2 className="mt-10 font-bold text-2xl">Relationship Data</h2>
									<div className="text-gray-700 mt-5">
										<span className="font-bold">Details:</span>{" "}
										{relationData.details} <br />
										<span className="font-bold">Enneagram Title:</span>{" "}
										{enneagramData[0]?.title} <br />
										<span className="font-bold">Enneagram Title:</span>{" "}
										{enneagramData[1]?.title} <br />
										<span className="font-bold">Type1:</span>{" "}
										{relationData?.type1} <br />
										<span className="font-bold">Type2:</span>{" "}
										{relationData?.type2} <br />
									</div>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	}

	return content;
};

export default CastDetails;
