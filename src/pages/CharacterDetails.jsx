import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
	AiOutlineArrowLeft,
	AiOutlineDelete,
	AiTwotoneEdit,
} from "react-icons/ai";
// import { Button } from "@material-tailwind/react";
import { useGetCharacterQuery, useDeleteCharacterMutation } from "../redux/features/characters/charactersApi";
import { useGetEnneagramTypeQuery } from "../redux/features/enneagramType/enneagramTypeApi";
import Loader from "../components/Loader";
const CharacterDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isError, error, isSuccess } = useGetCharacterQuery(id);
	const [deleteCharacter, result] = useDeleteCharacterMutation();
	const [isEnneagramtype, setIsEnneagramtype] = useState(false);
	const {
		data: enneagramType,
		isLoading: isTypeLoading,
		isError: isTypeError,
		isSuccess: isTypeSuccess,
	} = useGetEnneagramTypeQuery(data?.data?.enneagramtype, { skip: isEnneagramtype });

	const handleDelete = () => {
		deleteCharacter(id);
	}

	useEffect(() => {
		if (data?.data.enneagramType) {
			setIsEnneagramtype(true)
		}
	}, [data?.data?.enneagramtype])

	useEffect(() => {
		if (result?.isSuccess) {
			toast.success(result?.data.message);
			navigate("/")
		} else if (result?.isError) {
			toast.error(result?.error?.data.message)
		}
	}, [result?.isSuccess, result?.isError]);

	let content;
	if (isLoading || isTypeLoading) {
		content = <Loader />;
	} else if ((!isLoading || !isTypeLoading) && (isError || isTypeError)) {
		content = "something is wrong";
	} else if (
		(!isLoading || !isTypeLoading) &&
		(!isError || !isTypeError) &&
		(isSuccess || isTypeSuccess)
	) {
		content = (
			<div className="">
				<figure className="relative">
					<img
						src="https://placehold.co/800x450?text=Placeholder"
						className="w-full h-full object-cover"
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
								{data?.data?.name}
							</h1>
							<p className="text-blue-600 font-bold text-lg">
								{`Enneagram variant: ${data?.data?.enneagramvariant}`}
							</p>
						</div>
						<div className="flex gap-3">
							<Link to={`/edit-character/${id}`} className=" mr-2 text-xl md:text-4xl">
								<AiTwotoneEdit />
							</Link>
							<AiOutlineDelete className="cursor-pointer text-xl md:text-4xl" onClick={handleDelete} />
						</div>
					</div>
					<div className="text-gray-700 mt-5">
						<span className="font-bold">enneagram title:</span> {enneagramType?.data?.title} <br />
						<span className="font-bold">core motivation:</span> {enneagramType?.data?.core_motivation} <br />
						<span className="font-bold">left wing:</span> {enneagramType?.data?.left_wing} <br />
						<span className="font-bold">right wing:</span> {enneagramType?.data?.right_wing} <br />
						<br />
						<br />
					</div>

					{/* <div className="text-center mt-16">
            <Button className="bg-black rounded-full">Print PDF</Button>
          </div> */}
				</div>
			</div>
		);
	}
	return content;
};

export default CharacterDetails;
