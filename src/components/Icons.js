import React from 'react';
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiUser, 
  FiMessageSquare, 
  FiSend, 
  FiCheckCircle
} from 'react-icons/fi';
import { FaMediumM } from 'react-icons/fa';
import { RiStarSLine } from "react-icons/ri";
import { SiTableau } from 'react-icons/si';
import { IoDocumentAttachOutline } from "react-icons/io5";

const Icon = ({ name, className }) => {
  const iconStyle = {
    ...(className && { className })
  };

  switch (name) {
    case 'Mail':
    case 'Email':
      return <FiMail {...iconStyle} />;
    case 'GitHub':
      return <FiGithub {...iconStyle} />;
    case 'Linkedin':
      return <FiLinkedin {...iconStyle} />;
    case 'Medium':
      return <FaMediumM {...iconStyle} />;
    case 'Star':
      return <RiStarSLine {...iconStyle} />;
    case 'Tableau':
      return <SiTableau {...iconStyle} />;
    case 'User':
      return <FiUser {...iconStyle} />;
    case 'MessageSquare':
      return <FiMessageSquare {...iconStyle} />;
    case 'Send':
      return <FiSend {...iconStyle} />;
    case 'CheckCircle':
      return <FiCheckCircle {...iconStyle} />;
    case 'Document':
      return <IoDocumentAttachOutline {...iconStyle} />;
    default:
      return null;
  }
};

export default Icon;