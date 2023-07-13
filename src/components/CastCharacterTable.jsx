import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { getEnneagramType } from "../redux/features/enneagramType/enneagramTypeApi";
import { useDispatch } from "react-redux";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import {
	useGetRelationshipQuery,
} from "../redux/features/cast/castApi";
import { toast } from "react-hot-toast";

const CastCharacterTable = ({ enneagramData, setEnneagramData, character, setRelationData }) => {
	const { name, enneagramtype } = character || {};
	const dispatch = useDispatch();
	const [isIcon, setIsIcon] = useState("");
	const [isRelationIcon, setIsRelationIcon] = useState("");
	const [isRelationData, setIsRelationData] = useState({});
	const [isSkip, setSkip] = useState(true);

	const { data, isSuccess, isError, error } = useGetRelationshipQuery(
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
				setIsIcon(res?.data?.id);
			});
	};

	const handleRelationship = () => {
		dispatch(getEnneagramType.initiate(enneagramtype))
			.unwrap()
			.then((res) => {
				setIsRelationData(res);
				setIsRelationIcon(res?.data?.id);
			});
	};

	useEffect(() => {
		if (isSuccess && data) {
			toast.success(data.message);
			setRelationData(data?.data);
		} else if (isError) {
			toast.error(error?.data?.message);
		}
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
		<tr className="even:bg-blue-gray-50/50">
			<td className="p-4">
				<Typography variant="small" color="blue-gray" className="font-normal">
					{name}
				</Typography>
			</td>
			<td className="p-4">
				<Typography
					variant="small"
					color="blue"
					className="font-medium cursor-pointer"
					onClick={handleEnegramType}
				>
					{isIcon.includes(enneagramData?.data?.id) ? (
						<AiOutlineCheckCircle className="cursor-pointer" />
					) : (
						<MdOutlineRadioButtonUnchecked className="cursor-pointer" />
					)}
				</Typography>
			</td>
			<td className="p-4">
				<Typography
					variant="small"
					color="blue"
					className="font-medium cursor-pointer"
					onClick={handleRelationship}
				>
					{isRelationIcon === isRelationData?.data?.id ? (
						<AiOutlineCheckCircle className="cursor-pointer" />
					) : (
						<MdOutlineRadioButtonUnchecked className="cursor-pointer" />
					)}
				</Typography>
			</td>
		</tr>
	);
};

export default CastCharacterTable;
