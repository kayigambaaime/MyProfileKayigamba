"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeUpVariant, slideInVariant, staggerContainerVariant } from '@/lib/animationVariants';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeUpVariant}
              className="text-4xl font-bold mb-6 text-center"
            >
              About Me
            </motion.h1>
            <motion.p
              variants={fadeUpVariant}
              className="text-muted-foreground text-lg text-center mb-8"
            >
              Software Engineer & UI/UX Designer passionate about building scalable systems and beautiful user-centered digital experiences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About content section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInVariant('right')}
              className="relative h-[600px] rounded-xl overflow-hidden shadow-md bg-secondary/20"
            >
              <Image
                src="/images/kayigamba-picture.png"
                alt="Kayigamba Dukunde Aime"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainerVariant}
              className="space-y-6"
            >
              <motion.h2 
                variants={fadeUpVariant}
                className="text-3xl font-bold mb-4"
              >
                My Journey
              </motion.h2>
              
              <motion.p
                variants={fadeUpVariant}
                className="text-muted-foreground"
              >
                I am a motivated and detail-oriented Software Engineer and UI/UX Designer with a strong foundation in programming, problem-solving, and user-centered design. I hold a Bachelor of Science in Information Technology (Major: Software Engineering) from Adventist University of Central Africa (AUCA).
              </motion.p>

              <motion.p
                variants={fadeUpVariant}
                className="text-muted-foreground"
              >
                My expertise spans Java, Spring Boot, full-stack development, and database integration using MySQL, PostgreSQL, and SQL Server. Alongside backend engineering, I specialize in UI/UX design using Figma, Adobe XD, and Photoshop, applying responsive design and user research principles to deliver intuitive digital experiences.
              </motion.p>
              
              <motion.h3
                variants={fadeUpVariant}
                className="text-2xl font-semibold mt-8 mb-4"
              >
                My Philosophy
              </motion.h3>
              
              <motion.p
                variants={fadeUpVariant}
                className="text-muted-foreground"
              >
                I believe that great software is both functional and user-friendly. My goal is to build efficient, scalable systems while designing interfaces that are intuitive, accessible, and visually engaging. I am passionate about continuous learning and delivering innovative solutions that solve real-world problems.
              </motion.p>
              
              <motion.div
                variants={fadeUpVariant}
                className="flex flex-wrap gap-4 pt-6"
              >
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">Software Engineer</div>
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">UI/UX Designer</div>
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">Full-Stack Developer</div>
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">Problem Solver</div>
                <div className="py-1 px-4 bg-primary/10 rounded-full text-primary">User-Centered Design</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeUpVariant}
              className="text-3xl font-bold mb-12 text-center"
            >
              Professional Experience
            </motion.h2>

            <div className="space-y-12">

              <motion.div
                variants={slideInVariant('up')}
                className="relative pl-10 border-l-2 border-primary/30"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 text-xl font-semibold">IT Support & Help Desk Intern</div>
                <div className="mb-2 text-primary">Rwanda Revenue Authority (RRA) – Kigali, Rwanda</div>
                <p className="text-muted-foreground">
                  Provided technical assistance and troubleshooting for hardware, software, and network connectivity. Trained users, managed IT inventory, and enhanced efficiency and reliability of IT systems across the organization.
                </p>
              </motion.div>

              <motion.div
                variants={slideInVariant('up')}
                className="relative pl-10 border-l-2 border-primary/30"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 text-xl font-semibold">Technical Customer Support Agent</div>
                <div className="mb-2 text-primary">Worldwide E-learning Campus</div>
                <p className="text-muted-foreground">
                  Provided technical guidance to 60+ users daily across multiple communication channels, explaining complex technical concepts clearly while maintaining high customer satisfaction.
                </p>
              </motion.div>

              <motion.div
                variants={slideInVariant('up')}
                className="relative pl-10 border-l-2 border-primary/30"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                <div className="mb-2 text-xl font-semibold">Multilingual Support Agent</div>
                <div className="mb-2 text-primary">Customer Connection International (CCI)</div>
                <p className="text-muted-foreground">
                  Assisted international clients with access to hotels, transport, restaurants, and essential services, delivering real-time multilingual support to ensure seamless customer experiences.
                </p>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Education section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariant}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeUpVariant}
              className="text-3xl font-bold mb-12 text-center"
            >
              Education
            </motion.h2>

            <div className="space-y-8">

              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="text-lg font-medium">
                  Bachelor of Science in Information Technology – Major: Software Engineering
                </div>
                <div className="text-primary mb-2">
                  Adventist University of Central Africa (AUCA)
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                <div className="text-lg font-medium">
                  High School Diploma
                </div>
                <div className="text-primary mb-2">
                  Petit Séminaire Virgo Fidelis De Butare
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;