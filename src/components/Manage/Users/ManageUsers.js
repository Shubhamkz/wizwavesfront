"use client";

import React, { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "@/redux/features/userAuth/authEndpoints";
import Modal from "react-modal"; // Popup Modal
import { FaEdit, FaTrashAlt, FaUserShield } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Toast notifications
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const { data: allUsers, refetch } = useGetAllUsersQuery();
  const [deleteUser, { isSuccess }] = useDeleteUserMutation();
  const [updateRole, { isSuccess: isRoleUpdated }] = useUpdateRoleMutation();
  // State for managing modals and selected user
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Functions for opening and closing modals
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsRoleModalOpen(false);
    setSelectedUser(null);
  };

  // Handle the Edit User function
  const handleEditUser = (updatedUser) => {
    // Update user logic here (API call to update the user)
    toast.success(`User ${updatedUser.username} updated successfully!`);
    closeEditModal();
  };

  // Handle Delete User function
  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
  };

  // Handle Change Role function
  const handleChangeRole = async (newRole) => {
    await updateRole({
      role: newRole,
      userId: selectedUser._id,
    });
  };

  useEffect(() => {
    if (isSuccess || isRoleUpdated) {
      refetch();
      closeRoleModal();
    }
  }, [isSuccess, isRoleUpdated]);

  return (
    <div className="col-span-9 p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Users</h1>
      <ToastContainer />
      <div className="overflow-hidden rounded-xl">
        <table className="min-w-full table-auto bg-gray-900 border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user) => (
              <tr
                key={user._id}
                className="transition duration-300 ease-in-out transform hover:bg-gray-950 cursor-pointer"
              >
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role || "user"}</td>
                <td className="p-3 text-center space-x-2">
                  {/* Edit button */}
                  <button
                    onClick={() => openEditModal(user)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-200 ease-in-out"
                    title="Edit User"
                  >
                    <FaEdit />
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-200 ease-in-out"
                    title="Delete User"
                  >
                    <FaTrashAlt />
                  </button>
                  {/* Promote to Admin button */}
                  <button
                    onClick={() => openRoleModal(user)}
                    className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition duration-200 ease-in-out"
                    title="Change Role"
                  >
                    <FaUserShield />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit User"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        {selectedUser && (
          <div>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-4"
              defaultValue={selectedUser.username}
              // Add onChange handler to update local state
            />
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg mb-4"
              defaultValue={selectedUser.email}
              // Add onChange handler to update local state
            />
            <button
              onClick={() => handleEditUser(selectedUser)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        )}
      </Modal>

      {/* Change Role Modal */}
      <Modal
        isOpen={isRoleModalOpen}
        onRequestClose={closeRoleModal}
        contentLabel="Change Role"
        className="bg-slate-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 "
      >
        <h2 className="text-xl font-bold mb-4 text-white">
          Change Role for {selectedUser?.username}
        </h2>
        <div>
          <button
            onClick={() => handleChangeRole("admin")}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg mb-2"
          >
            Change to Admin
          </button>
          <button
            onClick={() => handleChangeRole("user")}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg mb-2"
          >
            Change to User
          </button>
          <button
            onClick={() => handleChangeRole("contributor")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg"
          >
            Change to Contributor
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUsers;
