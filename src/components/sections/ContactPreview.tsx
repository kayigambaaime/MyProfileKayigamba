"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fadeUpVariant, slideInVariant } from '@/lib/animationVariants';
import Button from '@/components/ui/Button';

const ContactPreview = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      className="flex flex-col items-center"
    >
      <motion.div
        variants={fadeUpVariant}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">

          {/* Contact information */}
          <motion.div 
            variants={slideInVariant('left')}
            className="flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Contact Information</h3>

              <div className="flex items-start space-x-4">
                <svg className="h-5 w-5 text-primary mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:kayigambaaimeduk@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    kayigambaaimeduk@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="h-5 w-5 text-primary mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div>
                  <p className="font-medium">Phone</p>
                  <a
                    href="tel:+250783682962"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +250 783 682 962
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <svg className="h-5 w-5 text-primary mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold">Social Profiles</h3>
              <div className="flex space-x-4">

                <motion.a
                  href="https://github.com/kayigamba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </motion.a>

                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </motion.a>

              </div>
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            variants={slideInVariant('right')}
            className="bg-card border border-border rounded-lg p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6">Ready to build something great?</h3>
            <p className="text-muted-foreground mb-6">
              I&apos;m open to software engineering roles, UI/UX design collaborations, 
              and full-stack development projects. Let&apos;s turn your ideas into impactful digital solutions.
            </p>
            <Link href="/contact" className="block">
              <Button fullWidth>Get in Touch</Button>
            </Link>
          </motion.div>

        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactPreview;