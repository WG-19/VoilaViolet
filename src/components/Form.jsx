import React from 'react';

const Form = ({ children, onSubmit, className = 'space-y-6' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};

const FormGroup = ({ children, className = '', label, htmlFor, required = false }) => (
  <div className={`text-left ${className}`}>
    {label && (
      <label htmlFor={htmlFor} className="block text-sm font-medium text-white mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    {children}
  </div>
);

const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  className = '',
  ...props
}) => (
  <input
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className={`w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-purple focus:border-transparent ${className}`}
    {...props}
  />
);

const Textarea = ({
  id,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  rows = 4,
  className = '',
  ...props
}) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    rows={rows}
    className={`w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-custom-purple focus:border-transparent ${className}`}
    {...props}
  />
);

const SubmitButton = ({ children, className = '', loading = false, ...props }) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full bg-custom-purple hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
    {...props}
  >
    {loading ? 'Sending...' : children}
  </button>
);

Form.Group = FormGroup;
Form.Input = Input;
Form.Textarea = Textarea;
Form.SubmitButton = SubmitButton;

export default Form;
