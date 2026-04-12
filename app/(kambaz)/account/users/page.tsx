"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "../client";
import PeopleTable from "../../courses/[cid]/people/table/page";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const { uid } = useParams();
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async (currentName: string, currentRole: string) => {
    let result;
    if (currentName) {
      result = await client.findUsersByPartialName(currentName);
    } else if (currentRole) {
      result = await client.findUsersByRole(currentRole);
    } else {
      result = await client.findAllUsers();
    }
    setUsers(result);
  };

  const filterUsersByRole = (role: string) => setRole(role);
  const filterUsersByName = (name: string) => setName(name);

  useEffect(() => {
    fetchUsers(name, role);
  }, [uid, name, role]);

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  return (
    <div>
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <h3>Users</h3>
      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="USER">Assistants</option>{" "}
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <PeopleTable users={users} fetchUsers={() => fetchUsers(name, role)} />
    </div>
  );
}
