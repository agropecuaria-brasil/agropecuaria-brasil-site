import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "border-transparent text-white bg-[#24902C] hover:bg-[#1e7a25] focus:ring-[#24902C]",
    secondary: "border-transparent text-white bg-[#264788] hover:bg-[#1e3a70] focus:ring-[#264788]",
    outline: "border-[#264788] text-[#264788] bg-transparent hover:bg-[#264788] hover:text-white focus:ring-[#264788]",
    whatsapp: "border-transparent text-white bg-[#24902C] hover:bg-[#1e7a25] focus:ring-[#24902C]"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className} click-fix`}
      data-gtm-type="button"
      {...props}
    >
      <span className="flex items-center justify-center gap-2 w-full">
        {variant === 'whatsapp' && <WhatsAppIcon size={20} />}
        {children}
      </span>
    </button>
  );
};

export default Button;