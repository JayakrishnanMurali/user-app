import GroupsIcon from "@mui/icons-material/Groups";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

const UserCard = () => {
  return (
    <div className="w-2/6 cursor-pointer">
      <Card>
        <CardContent className="flex relative gap-12 justify-start items-center">
          <div>
            <img
              src="https://source.unsplash.com/random"
              className="w-52 h-60 object-cover mb-4"
              alt=""
            />
            <h3 className="text-xl">Age: 32</h3>
          </div>

          <div>
            <h2 className="text-3xl mb-8">Jayakrishnan M</h2>
            <h3 className=" text-xl mb-4">Watching Netflix</h3>
            <h3 className=" text-xl mb-4">27-09-2020</h3>
          </div>

          <div className="absolute right-8 bottom-8">
            <GroupsIcon sx={{ fontSize: 40 }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCard;
