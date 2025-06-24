import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'Microsoft',
      icon: 'Square',
      color: 'text-blue-500',
      bgColor: 'hover:bg-blue-50'
    }
  ];

  return (
    <div className="mt-6 space-y-3">
      {socialProviders.map((provider) => (
        <button
          key={provider.name}
          type="button"
          onClick={() => onSocialLogin(provider.name)}
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-text-primary bg-surface ${provider.bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          <Icon name={provider.icon} size={20} className={`mr-3 ${provider.color}`} />
          Continue with {provider.name}
        </button>
      ))}
    </div>
  );
};

export default SocialLogin;