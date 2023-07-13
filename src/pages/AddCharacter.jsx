import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllEnneagramTypeQuery } from "../redux/features/enneagramType/enneagramTypeApi";
import { useCreateCharacterMutation } from "../redux/features/characters/charactersApi";
import Loader from "../components/Loader";

const AddCharacter = () => {
	const {
		data: enneagramTypes,
		isSuccess,
		isLoading,
		isError,
	} = useGetAllEnneagramTypeQuery();
	const navigate = useNavigate();
	const [createCharacter, result] = useCreateCharacterMutation();
	const [characterInputValue, setCharacterInputValue] = useState({
		name: null,
		age: null,
		gender: null,
		// race: null,
		enneagramtype: null,
		enneagramwing: null,
		enneagramvariant: null,
	});
	const [enneagramNumber, setEnneagramNumber] = useState();
	const handleSubmit = (e) => {
		e.preventDefault();
		createCharacter(characterInputValue);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (e.target.name === "age") {
			setCharacterInputValue({ ...characterInputValue, [name]: Number(value) });
		} else {
			setCharacterInputValue({ ...characterInputValue, [name]: value });
		}
	};

	const handleSelect = (name, value) => {
		setCharacterInputValue({ ...characterInputValue, [name]: value });
	};

	useEffect(() => {
		if (result?.isSuccess) {
			toast.success(result?.data.message);
			navigate("/")
		} else if (result?.isError) {
			toast.error(result?.error?.data.message)
		}
	}, [result?.isSuccess, result?.isError])

	let content;
	let wingType;
	if (isLoading) {
		content = <Loader />;
	} else if (!isLoading && isError) {
		content = "something was wrong";
	} else if (!isLoading && !isError && isSuccess) {
		if (enneagramNumber) {
			wingType = enneagramTypes.data.find(
				(type) => type.enneagram_number === enneagramNumber
			);
		}
		content = (
			<div className=" p-4">
				<h1 className="text-3xl text-center font-bold">New Character</h1>

				<form onSubmit={handleSubmit} className="p-2 my-5">
					<div className="flex flex-col gap-y-4">
						<div className="w-full">
							<Input
								required
								label="Character Name"
								name="name"
								value={characterInputValue.name}
								className="rounded-none"
								onChange={handleChange}
							/>
						</div>
						<div className="w-full">
							<Input
								required
								type="number"
								label="Age"
								name="age"
								value={characterInputValue.age}
								className="rounded-none"
								onChange={handleChange}
							/>
						</div>
						<div className="w-full">
							<Input
								required
								label="Gender / Identity"
								name="gender"
								value={characterInputValue.gender}
								className="rounded-none"
								onChange={handleChange}
							/>
						</div>
						<div className="w-full">
							<Input
								// required
								label="Race / Heritage"
								name="race"
								value={characterInputValue.race}
								className="rounded-none"
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-y-4 mt-8">
						<h2 className="font-bold">Enneagram</h2>
						<div className="w-full">
							<Select
								required
								className="rounded-none"
								label="Major Type"
								name="enneagramtype"
								// value={characterInputValue.enneagramtype}
								onChange={(value) => {
									handleSelect("enneagramtype", value);
									setEnneagramNumber(value);
								}}
							>
								{enneagramTypes?.data?.map((type, idx) => (
									<Option key={idx} value={type.enneagram_number}>
										{type.title}
									</Option>
								))}
							</Select>
						</div>
						<div className="w-full">
							<Select
								required
								className="rounded-none"
								label="Wing"
								name="enneagramwing"
								onChange={(value) => handleSelect("enneagramwing", value)}
							>
								<Option value={wingType?.left_wing}>
									{`left-wing-${wingType?.left_wing}`}
								</Option>
								<Option value={wingType?.right_wing}>
									{`right-wing-${wingType?.right_wing}`}
								</Option>
							</Select>
						</div>
						<div className="w-full">
							<Select
								required
								className="rounded-none"
								label="Instinctual Subtype"
								name="enneagramvariant"
								// value={characterInputValue.enneagramvariant}
								onChange={(value) => handleSelect("enneagramvariant", value)}
							>
								<Option value="so">{wingType?.so}</Option>
								<Option value="sp">{wingType?.sp}</Option>
								<Option value="sx">{wingType?.sx}</Option>
							</Select>
						</div>
					</div>

					<Button type="submit" className="w-full bg-black mt-8" disabled={result?.isLoading}>
						Save Character
					</Button>

					<Link
						to="/"
						className="gap-2 flex items-center justify-center mt-10 underline"
					>
						<AiOutlineArrowLeft />
						GO BACK
					</Link>
				</form>
			</div>
		);
	}
	return content;
};

export default AddCharacter;
