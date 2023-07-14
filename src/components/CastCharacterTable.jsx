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
	enneagramNumbers,
	setEnneagramNumbers,
}) => {
	const { name, enneagramtype } = character || {};
	const dispatch = useDispatch();
	const [isIcon, setIcon] = useState(false);
	let uniqueArray = [...new Set(enneagramNumbers)];

	const handleEnegramType = () => {
		dispatch(getEnneagramType.initiate(enneagramtype))
			.unwrap()
			.then((res) => {
				const findData = enneagramData.find(
					(item) => item.id === res?.data?.id
				);
				if (findData) {
					const filteredData = enneagramData.filter(
						(item) => item.id !== findData.id
					);
					setEnneagramData(filteredData);
					const filterdNumber = uniqueArray.filter(
						(item) => item != findData.enneagram_number
					);
					setEnneagramNumbers(filterdNumber);
					setIcon(false);
				} else if (enneagramData?.length > 1) {
					toast.error("Please unselect any ennagram type");
				} else {
					setEnneagramData([...enneagramData, res?.data]);
					setIcon(true);
					setRelationData(null);
				}
			});
	};
	uniqueArray = [...new Set(enneagramNumbers)];

	const { data, isSuccess, isError } = useGetRelationshipQuery(
		{
			type1: uniqueArray[0],
			type2: uniqueArray[1],
		},
		{ skip: uniqueArray.length !== 2 }
	);

	useEffect(() => {
		if (isSuccess && data) {
			setRelationData(data?.data);
		} else if(isError){
			setRelationData(null)
		}
	}, [isSuccess, data, isError]);

	return (
		<div
			className="flex items-center justify-between cursor-pointer hover:bg-blue-gray-50"
			onClick={handleEnegramType}
		>
			<div className="p-4">
				<Typography
					variant="small"
					color="blue-gray"
					className="font-normal flex items-center gap-2"
				>
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
