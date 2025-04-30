import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <>
      <a
        title="whatsapp"
        href="https://api.whatsapp.com/send?phone=923114075017"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn flex items-center gap-2 rounded-full p-2 sm:p-2"
      >
        <FaWhatsapp size={31} />
      </a>
    </>
  );
}
