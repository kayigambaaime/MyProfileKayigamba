"use client";

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, slideInVariant, staggerContainerVariant } from '@/lib/animationVariants';
import Button from '@/components/ui/Button';

interface FormField {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  error: string;
}

const ContactPage = () => {
  const [formFields, setFormFields] = useState<FormField[]>([
    { id: 'name', name: 'name', type: 'text', placeholder: 'Your Name', required: true, value: '', error: '' },
    { id: 'email', name: 'email', type: 'email', placeholder: 'Your Email', required: true, value: '', error: '' },
    { id: 'subject', name: 'subject', type: 'text', placeholder: 'Subject', required: true, value: '', error: '' },
  ]);

  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    setFormFields(prev =>
      prev.map(field => field.id === id ? { ...field, value, error: '' } : field)
    );
  };

  const validateForm = () => {
    let isValid = true;

    const updatedFields = formFields.map(field => {
      if (field.required && !field.value.trim()) {
        isValid = false;
        return { ...field, error: 'This field is required' };
      }

      if (field.id === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          return { ...field, error: 'Please enter a valid email address' };
        }
      }

      return field;
    });

    setFormFields(updatedFields);

    if (!message.trim()) {
      setMessageError('Please enter your message');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData = {
        name: formFields.find(f => f.id === 'name')?.value || '',
        email: formFields.find(f => f.id === 'email')?.value || '',
        subject: formFields.find(f => f.id === 'subject')?.value || '',
        message,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setFormFields(formFields.map(field => ({ ...field, value: '' })));
      setMessage('');
      setFormSubmitted(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">

      {/* Hero */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerVariant} className="max-w-4xl mx-auto text-center">
            <motion.h1 variants={fadeUpVariant} className="text-4xl font-bold mb-6">
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-muted-foreground text-lg">
              Interested in working together or discussing a project? Let’s connect!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Form */}
          <motion.div variants={slideInVariant('left')}>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            {formSubmitted ? (
              <div className="bg-primary/10 border border-primary/30 text-primary p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Message Sent Successfully!</h3>
                <p>I’ll respond as soon as possible.</p>
                <Button className="mt-4" onClick={() => setFormSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map(field => (
                  <div key={field.id}>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={e => handleInputChange(field.id, e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/50"
                    />
                    {field.error && <p className="text-sm text-red-500">{field.error}</p>}
                  </div>
                ))}

                <textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/50"
                />
                {messageError && <p className="text-sm text-red-500">{messageError}</p>}

                <Button type="submit" fullWidth isLoading={isSubmitting}>
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={slideInVariant('right')} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <p className="text-muted-foreground">
                I’m open to software engineering opportunities, UI/UX design collaborations, 
                and full-stack development projects.
              </p>
            </div>

            <div className="space-y-6">

              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <a href="mailto:kayigambaaimeduk@gmail.com" className="text-muted-foreground hover:text-primary">
                  kayigambaaimeduk@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-medium">Phone</h3>
                <a href="tel:+250783682962" className="text-muted-foreground hover:text-primary">
                  +250 783 682 962
                </a>
              </div>

              <div>
                <h3 className="text-lg font-medium">Location</h3>
                <p className="text-muted-foreground">Kigali, Rwanda</p>
              </div>

              <div>
                <h3 className="text-lg font-medium">GitHub</h3>
                <a href="https://github.com/kayigamba" target="_blank" className="text-muted-foreground hover:text-primary">
                  github.com/kayigamba
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">What services do you offer?</h3>
              <p className="text-muted-foreground">
                I offer full-stack software development, REST API design, database integration, 
                and UI/UX design services including wireframing and prototyping with Figma.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">What technologies do you use?</h3>
              <p className="text-muted-foreground">
                I work with Java, Spring Boot, MySQL, PostgreSQL, HTML, CSS, JavaScript, 
                and design tools like Figma, Adobe XD, and Photoshop.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Do you design user interfaces?</h3>
              <p className="text-muted-foreground">
                Yes. I design responsive, user-centered interfaces with a strong focus on usability, 
                accessibility, and clean visual hierarchy.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;