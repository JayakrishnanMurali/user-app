import GroupsIcon from "@mui/icons-material/Groups";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import moment from "moment";
import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="md:p-4  cursor-pointer">
      <Card>
        <CardContent className="flex relative md:gap-12 gap-4 justify-start items-center">
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
            <h3 className=" text-xl mb-4">
              {moment(user.createdAt).utc().format("YYYY-MM-DD")}
            </h3>
          </div>

          <div className="absolute right-8 bottom-8">
            {!user.isPublic && (
              <div className="relative">
                <div className="absolute w-1 h-12 rotate-45 right-4 bg-red-500"></div>
              </div>
            )}
            <GroupsIcon sx={{ fontSize: 40 }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserCard;
