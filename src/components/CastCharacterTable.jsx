import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { getEnneagramType } from "../redux/features/enneagramType/enneagramTypeApi";
import { useDispatch } from "react-redux";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useGetRelationshipQuery } from "../redux/features/cast/castApi";
import { toast } from "react-hot-toast";
import Smile from "../assets/Smile";

const CastCharacterTable = ({
	enneagramData,
	setEnneagramData,
	character,
	setRelationData,
}) => {
	const { name, enneagramtype } = character || {};
	const dispatch = useDispatch();
	const [isIcon, setIsIcon] = useState(false);
	const [isRelationData, setIsRelationData] = useState({});
	const [isSkip, setSkip] = useState(true);

	const { data, isSuccess, isError } = useGetRelationshipQuery(
		{
			type1: isRelationData?.data?.enneagram_number,
			type2: enneagramData?.data?.enneagram_number,
		},
		{ skip: isSkip }
	);

	const handleEnegramType = () => {
		dispatch(getEnneagramType.initiate(enneagramtype))
			.unwrap()
			.then((res) => {
				setEnneagramData(res);
				setIsIcon(true);
				if (res.data) {
					dispatch(getEnneagramType.initiate(enneagramtype))
						.unwrap()
						.then((res) => {
							setIsRelationData(res);
						});
				}
			});
	};

	useEffect(() => {
		if (isSuccess && data) {
			toast.success(data.message);
			setRelationData(data?.data);
		} 
		// else if (isError) {
		// 	toast.error(error?.data?.message);
		// }
	}, [isSuccess, isError]);

	useEffect(() => {
		if (
			isRelationData?.data?.enneagram_number &&
			enneagramData?.data?.enneagram_number
		) {
			setSkip(false);
		}
	}, [
		isRelationData?.data?.enneagram_number,
		enneagramData?.data?.enneagram_number,
	]);

	return (
		<div
			className="flex items-center justify-between cursor-pointer hover:bg-blue-gray-50"
			onClick={handleEnegramType}
		>
			<div className="p-4">
				<Typography variant="small" color="blue-gray" className="font-normal flex items-center gap-2">
					<Smile /> {name}
				</Typography>
			</div>
			<div className="p-4">
				<Typography
					variant="small"
					color="blue"
					className="text-2xl cursor-pointer"
				>
					{isIcon ? (
						<AiOutlineCheckCircle className="cursor-pointer" />
					) : (
						<MdOutlineRadioButtonUnchecked className="cursor-pointer" />
					)}
				</Typography>
			</div>
		</div>
	);
};

export default CastCharacterTable;
