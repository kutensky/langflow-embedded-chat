import { useRef, useState } from "react";
import ChatTrigger from "./chatTrigger";
import ChatWindow from "./chatWindow";
import { ChatMessageType } from "../types/chatWidget";
const { v4: uuidv4 } = require('uuid');

export default function ChatWidget({
  api_key,
  output_type = "chat",
  input_type = "chat",
  output_component,
  chat_trigger_style,
  host_url,
  flow_id,
  tweaks,
  send_icon_style,
  bot_message_style,
  user_message_style,
  chat_window_style,
  height,
  width,
  error_message_style,
  send_button_style,
  online,
  online_message,
  offline_message,
  window_title,
  chat_position,
  placeholder,
  input_style,
  placeholder_sending,
  input_container_style,
  additional_headers,
  session_id,
  start_open=false,
}: {
  api_key?: string;
  input_value: string,
  output_type: string,
  input_type: string,
  output_component?: string;
  send_icon_style?: React.CSSProperties;
  chat_position?: string;
  chat_trigger_style?: React.CSSProperties;
  bot_message_style?: React.CSSProperties;
  user_message_style?: React.CSSProperties;
  chat_window_style?: React.CSSProperties;
  online?: boolean;
  online_message?: string;
  offline_message?: string;
  height?: number;
  width?: number;
  window_title?: string;
  error_message_style?: React.CSSProperties;
  send_button_style?: React.CSSProperties;
  placeholder_sending?: string;
  placeholder?: string;
  input_style?: React.CSSProperties;
  input_container_style?: React.CSSProperties;
  host_url: string;
  flow_id: string;
  tweaks?: { [key: string]: any };
  additional_headers?: { [key: string]: string };
  session_id?: string;
  start_open?: boolean;
}) {
  const [open, setOpen] = useState(start_open);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const sessionId = useRef(session_id ?? uuidv4());
  function updateLastMessage(message: ChatMessageType) {
    setMessages((prev) => {
      prev[prev.length - 1] = message;
      return [...prev];
    });
  }
  function addMessage(message: ChatMessageType) {
    setMessages((prev) => [...prev, message]);
  }
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  return (
    <div style={{ position: "relative" }} className="langflow-chat-widget">
      <ChatTrigger
        triggerRef={triggerRef}
        open={open}
        setOpen={setOpen}
        style={chat_trigger_style}
      />
      <ChatWindow
        api_key={api_key}
        input_type={input_type}
        output_type={output_type}
        output_component={output_component}
        open={open}
        height={height}
        width={width}
        send_icon_style={send_icon_style}
        bot_message_style={bot_message_style}
        user_message_style={user_message_style}
        chat_window_style={chat_window_style}
        error_message_style={error_message_style}
        send_button_style={send_button_style}
        placeholder={placeholder}
        input_style={input_style}
        online={online}
        online_message={online_message}
        offline_message={offline_message}
        placeholder_sending={placeholder_sending}
        window_title={window_title}
        input_container_style={input_container_style}
        tweaks={tweaks}
        flowId={flow_id}
        hostUrl={host_url}
        updateLastMessage={updateLastMessage}
        addMessage={addMessage}
        messages={messages}
        triggerRef={triggerRef}
        position={chat_position}
        sessionId={sessionId}
        additional_headers={additional_headers}
      />
    </div>
  );
}
