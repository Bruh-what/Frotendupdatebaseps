import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

interface User {
  id: string;
  email: string;
}

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateConversation: (recipientId: string) => void;
}

export default function NewConversationModal({
  isOpen,
  onClose,
  onCreateConversation,
}: NewConversationModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, email");
        if (error) throw error;
        setUsers(data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const handleCreateConversation = () => {
    if (selectedUser) {
      onCreateConversation(selectedUser);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Start a New Conversation</h2>
        <select
          className="w-full p-2 border rounded-lg mb-4"
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateConversation}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            disabled={!selectedUser}
          >
            Start Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
