import React from "react";
import { BsPersonFill, BsFillCalendarEventFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { MdWork, MdSchool } from "react-icons/md";

const PersonalInfo = () => {
  let dob = new Date("10/16/1998");
  let month_diff = Date.now() - dob.getTime();
  let age_dt = new Date(month_diff);
  let year = age_dt.getUTCFullYear();
  let age = Math.abs(year - 1970);

  return (
    <div>
      <div className="info">
        <BsPersonFill />
        <p>Melchior FALLEVOZ</p>
      </div>
      <div className="info">
        <BsFillCalendarEventFill />
        <p>{age} years old</p>
      </div>
      <div className="info">
        <IoLocationSharp />
        <p>Lyon, France</p>
      </div>
      <div className="info">
        <MdWork />
        <p>Student</p>
      </div>
      <div className="info">
        <MdSchool />
        <p>Epitech</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
