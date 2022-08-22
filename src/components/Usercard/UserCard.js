import GroupsIcon from "@mui/icons-material/Groups";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="p-4 cursor-pointer">
      <Card>
        <CardContent className="flex relative gap-12 justify-start items-center">
          <div>
            <img
              src={user.avatarUrl}
              className="w-52 h-60 object-cover mb-4"
              alt=""
            />
            <h3 className="text-xl">Age: {user.age}</h3>
          </div>

          <div>
            <h2 className="text-3xl mb-8">{user.name}</h2>
            <h3 className=" text-xl mb-4">{user.statusMessage}</h3>
            <h3 className=" text-xl mb-4">{user.createdAt}</h3>
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
