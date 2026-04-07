import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificates } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const INITIAL_VISIBLE = 3;

export function CertificatesSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll ? certificates : certificates.slice(0, INITIAL_VISIBLE);
  const hasMore = certificates.length > INITIAL_VISIBLE;

  return (
    <section id="certificates" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            My <span className="gradient-text">Certificates</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Certifications and courses I've completed
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleCertificates.map((cert, index) => (
              <Dialog key={cert.id}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    data-voice-target={`${cert.title.toLowerCase().replace(/[^a-z0-9]/g, "")}-cert`}
                    className="relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-lg group cursor-none h-64 md:h-72"
                  >
                    {/* The Image (always visible) */}
                    {cert.url !== "#" ? (
                      <img
                        src={cert.url}
                        alt={cert.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
                        <Award className="h-12 w-12 text-muted-foreground opacity-50" />
                      </div>
                    )}

                    {/* Hover Overlay with Information */}
                    <div className="absolute inset-0 bg-background/90 backdrop-blur-sm p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary transition-colors">
                          <Award className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold text-lg leading-tight text-foreground">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-foreground/80 mt-1">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/70 mb-4 line-clamp-3 flex-grow">
                        {cert.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-border/50 w-full">
                        <div className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground text-center text-sm font-medium transition-transform duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                          View Certificate
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-background/95 backdrop-blur-sm border-border">
                  <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center p-4">
                    {cert.url !== "#" ? (
                      <img
                        src={cert.url}
                        alt={cert.title}
                        className="w-full h-full object-contain max-h-[80vh] rounded-md"
                      />
                    ) : (
                      <div className="text-center p-10">
                        <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <p className="text-muted-foreground">Certificate image not available</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </AnimatePresence>
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="group"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-5 w-5 mr-2 group-hover:-translate-y-1 transition-transform" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 mr-2 group-hover:translate-y-1 transition-transform" />
                  See More ({certificates.length - INITIAL_VISIBLE} more)
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
