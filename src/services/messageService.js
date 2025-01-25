import axios from "axios";
import { supabase } from "../lib/supabaseClient";

export const messageService = {
  async getAuthHeader() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("No authenticated session");
    return {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
    };
  },

  async createConversationWithMessage(conversationData) {
    const config = await this.getAuthHeader();
    const response = await axios.post(
      "/messages/conversation",
      conversationData,
      config
    );
    return response.data;
  },

  async getUserMessages() {
    const config = await this.getAuthHeader();
    const response = await axios.get("/messages/user/messages", config);
    return response.data;
  },

  async getConversations() {
    const config = await this.getAuthHeader();
    const response = await axios.get("/messages/conversations", config);
    return response.data;
  },

  async getConversationMessages(conversationId) {
    const config = await this.getAuthHeader();
    const response = await axios.get(
      `/messages/conversation/${conversationId}`,
      config
    );
    return response.data;
  },

  async sendMessage({ conversationId, content, senderId }) {
    const config = await this.getAuthHeader();
    const response = await axios.post(
      "/messages",
      {
        conversationId,
        content,
        senderId,
        messageType: "text",
      },
      config
    );
    return response.data;
  },

  async findOrCreateConversation(recipientId) {
    const config = await this.getAuthHeader();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const response = await axios.post(
      "/messages/conversation/find-or-create",
      {
        recipientId,
        senderId: session.user.id,
        senderName: session.user.user_metadata?.full_name,
      },
      config
    );
    return response.data;
  },
};

export default messageService;
