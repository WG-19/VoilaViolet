import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp } from 'react-icons/fa';
import BackgroundImage from '../components/BackgroundImage';
import Card from '../components/Card';
import Form from '../components/Form';
import FloatingActionButton from '../components/FloatingActionButton';
import { CONTACT, FORM_DEFAULTS } from '../config/constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n\n` +
      `Email: ${formData.email}\n\n` +
      `Message: ${formData.message}`
    );
    
    window.location.href = `mailto:${CONTACT.EMAIL}?subject=${subject}&body=${body}`;
    
    // Clear the form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />

      <FloatingActionButton 
        href={CONTACT.WHATSAPP}
        label="WhatsApp"
        icon={FaWhatsapp}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Card>
          <Card.Header>
            <Card.Title>Contact Us</Card.Title>
            <Card.Description className="mb-0">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Card.Description>
          </Card.Header>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group label="Your Name" htmlFor="name">
              <Form.Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group label="Email Address" htmlFor="email">
              <Form.Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </Form.Group>

            <Form.Group label="Subject" htmlFor="subject">
              <Form.Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </Form.Group>

            <Form.Group label="Message" htmlFor="message">
              <Form.Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                required
              />
            </Form.Group>

            <Form.SubmitButton className="mt-6">
              {FORM_DEFAULTS.SUBMIT_BUTTON}
            </Form.SubmitButton>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
