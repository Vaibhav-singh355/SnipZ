"use client"
import React from "react";
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";

const User = ({ person }) => {
  

  return (
    <>
    <h1>
      
    </h1>
    <Avatar  rounded>
      <div className="space-y-1 font-medium dark:text-white">
        <div className="text-lg font-bold text-gray-900 dark:text-gray-400">{person.name}</div>
        <div className="text-sm text-gray-900 dark:text-gray-400">{person.email}</div>
      </div>
    </Avatar>
    </>
  );
}

export default User;