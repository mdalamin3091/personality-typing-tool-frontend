import { useState, useEffect } from "react";
import { Button, Input } from "@material-tailwind/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CharacterTable from "../components/CharacterTable";
import { useGetAllCharactersQuery } from "../redux/features/characters/charactersApi";
import { useCreateCastMutation } from "../redux/features/cast/castApi";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
const AddCast = () => {
	const { user } = useSelector((state) => state.user);
	const [castName, setCastName] = useState("");
	const [characters, setCharacters] = useState([]);
	const navigate = useNavigate();
	const {
		data: charactersData,
		isLoading,
		isError,
		isSuccess,
	} = useGetAllCharactersQuery();
	const [createCast, result] = useCreateCastMutation();

	let content;
	if (isLoading) {
		content = <Loader />;
	} else if (!isLoading && isError) {
		content = <div>something is wrong</div>;
	} else if (!isLoading && !isError && isSuccess) {
		content = (
			<div className="flex flex-col gap-y-4 mt-8">
				<CharacterTable
					setCharacters={setCharacters}
					characters={characters}
					title="My Characters"
					data={charactersData.data}
					link="/add-character"
				/>
			</div>
		);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		createCast({ name: castName, characters, user: user._id });
	};

	useEffect(() => {
        if (result?.isSuccess) {
            toast.success(result?.data.message);
            navigate("/")
        } else if (result?.isError) {
            toast.error(result?.error?.data.message)
        }
    }, [result?.isSuccess, result?.isError]);

	return (
		<div className=" p-4">
			<h1 className="text-3xl text-center font-bold">Add Cast</h1>

			<form onSubmit={handleSubmit} className="p-2 my-5">
				<div className="flex flex-col gap-y-4">
					<div className="w-full">
						<Input
							label="Cast Name"
							name="castName"
							className="rounded-none"
							value={castName}
							onChange={(e) => setCastName(e.target.value)}
						/>
					</div>
				</div>
				{content}
				<Button type="submit" className="w-full bg-black mt-8" disabled={result.isLoading}>
					Save Cast
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
};

export default AddCast;