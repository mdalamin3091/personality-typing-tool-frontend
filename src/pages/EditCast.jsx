import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import CharacterTable from "../components/CharacterTable";
import {
    useGetCastQuery,
    useUpdateCastMutation,
} from "../redux/features/cast/castApi";
import { useGetAllCharactersQuery } from "../redux/features/characters/charactersApi";
import Loader from "../components/Loader";

const EditCast = () => {
    const { id } = useParams();
    const { data, isLoading, isError, isSuccess } = useGetCastQuery(id);
    const [updateCast, result] = useUpdateCastMutation();
    const navigate = useNavigate();
    const {
        data: charactersData,
        isLoading: loading,
        isError: error,
        isSuccess: success,
    } = useGetAllCharactersQuery();
    const [name, setName] = useState(data?.data?.name);
    const [characters, setCharacters] = useState(data?.data?.characters);

    useEffect(() => {
        setName(data?.data?.name);
        setCharacters(data?.data?.characters);
    }, [isSuccess, isLoading]);

    useEffect(() => {
        if (result?.isSuccess) {
            toast.success(result?.data.message);
            navigate("/")
        } else if (result?.isError) {
            toast.error(result?.error?.data.message)
        }
    }, [result?.isSuccess, result?.isError]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCast({ id, data: { name, characters } });
    };

    let content;
    if (isLoading || loading) {
        content = <Loader />;
    } else if ((!isLoading || !loading) && (isError || error)) {
        content = "something was wrong";
    } else if (
        (!isLoading || !loading) &&
        (!isError || !error) &&
        (isSuccess || success)
    ) {
        content = (
            <div className=" p-4">
                <h1 className="text-3xl text-center font-bold">Update Cast</h1>

                <form onSubmit={handleSubmit} className="p-2 my-5">
                    <div className="flex flex-col gap-y-4">
                        <div className="w-full">
                            <Input
                                label="Cast Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="rounded-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4 mt-8">
                        {characters && (
                            <CharacterTable
                                title="My Characters"
                                data={charactersData?.data}
                                characters={characters}
                                setCharacters={setCharacters}
                                link="/add-character"
                            />
                        )}
                    </div>

                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-black mt-8"
                        disabled={result.isLoading}
                    >
                        Update Cast
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

export default EditCast;