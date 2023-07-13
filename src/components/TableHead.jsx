import { Typography } from '@material-tailwind/react';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const TableHead = ({ title, link="/" }) => {
    return (
        <>
            <th colSpan={2} className="border-b border-blue-gray-100 bg-blue-gray-50 p-3 px-4">

                <Typography

                    variant="small"
                    color="blue-gray"
                    className="md:text-lg leading-none font-bold flex-grow"
                >
                    {title}

                </Typography>


            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3 px-4 justify-end flex">

                <Link to={link}>

                    <AiFillPlusCircle className="flex-grow text-black cursor-pointer" fontSize={"30px"} />
                </Link>

            </th>
        </>
    );
};

export default TableHead;