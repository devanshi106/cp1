import { api } from './client.js';

export async function askChatbot(message, sessionToken, checkForum = false) {
  const { data } = await api.post('/chatbot/ask', {
    message,
    session_token: sessionToken ?? undefined,
    check_forum: checkForum || undefined,
  });
  return data; // { session_token, content, source_tier, citations, awaiting_forum? }
}

export async function getChatSession(token) {
  const { data } = await api.get(`/chatbot/session/${token}`);
  return data; // { session_token, messages }
}
