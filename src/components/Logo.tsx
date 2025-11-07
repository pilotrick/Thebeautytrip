import logoImage from "figma:asset/14e163fabd1036dfe849086350b27b4780fe718d.png";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-20 md:w-24',
    md: 'w-32 md:w-48',
    lg: 'w-48 md:w-64',
    xl: 'w-64 md:w-96'
  };

  return (
    <img 
      src={logoImage} 
      alt="The Beauty Trip Logo" 
      className={`${sizeClasses[size]} ${className}`}
      style={{ backgroundColor: 'transparent', mixBlendMode: 'normal' }}
    />
  );
}