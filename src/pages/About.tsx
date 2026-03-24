import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Shield, BookOpen, Scale, AlertTriangle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-4"
  >
    <h2 className="text-2xl font-display text-primary flex items-center gap-2">
      <Icon size={22} />
      {title}
    </h2>
    <div className="text-muted-foreground font-body space-y-3 leading-relaxed">
      {children}
    </div>
  </motion.section>
);

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient-gold">
            SpellCraft Guide & Privacy
          </h1>
        </div>

        {/* How to Play */}
        <Section icon={BookOpen} title="How to Play">
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Enter your wizard name</strong> — pick any name you like. It stays on your device only and is never sent to our servers.</li>
            <li><strong>Choose a spell book</strong> — browse spells organized by Hogwarts year / difficulty level.</li>
            <li><strong>Learn the spell</strong> — read about each spell's history, pronunciation, and usage in the wizarding world.</li>
            <li><strong>Practice casting</strong> — type the incantation, then complete an interactive scenario (tap, drag, or choose the right answer).</li>
            <li><strong>Complete all 3 scenarios</strong> — master each spell by finishing all three narrative challenges.</li>
            <li><strong>Rate and track progress</strong> — rate how much you enjoyed each spell and view your overall stats.</li>
          </ol>
        </Section>

        {/* Privacy Policy */}
        <Section icon={Shield} title="Privacy Policy">
          <p><strong>Last updated:</strong> March 2026</p>
          <p>SpellCraft is designed with privacy in mind, especially for younger wizards.</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>No personal data stored on servers.</strong> The name you enter stays on your device only (in your browser's memory). It is never sent to or stored on our servers in readable form.</li>
            <li><strong>Anonymous analytics only.</strong> We track anonymized usage data (e.g., which spells are popular, average ratings) to improve the experience. Your name is cryptographically hashed (SHA-256) before any data leaves your device — it cannot be reversed.</li>
            <li><strong>No cookies.</strong> We do not use tracking cookies.</li>
            <li><strong>No third-party tracking.</strong> We do not use Google Analytics, Facebook Pixel, or any third-party analytics or advertising services.</li>
            <li><strong>No ads.</strong> SpellCraft is completely ad-free.</li>
            <li><strong>No account required.</strong> There is no sign-up, login, or account creation.</li>
          </ul>
        </Section>

        {/* For Parents */}
        <Section icon={Sparkles} title="For Parents & Guardians">
          <p>SpellCraft is a free, non-commercial educational game about the spells from the Harry Potter universe. Here's what you should know:</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li>We do <strong>not</strong> collect, store, or share any personally identifiable information (PII).</li>
            <li>The "wizard name" your child enters is used only for display on their device. It never leaves the browser in readable form.</li>
            <li>All analytics data is fully anonymized using one-way cryptographic hashing.</li>
            <li>There are no chat features, social features, or ways for users to interact with each other.</li>
            <li>There are no in-app purchases, advertisements, or links to external commercial services.</li>
            <li>The app works entirely in the browser — no downloads or installations required.</li>
          </ul>
        </Section>

        {/* Terms of Use */}
        <Section icon={Scale} title="Terms of Use">
          <ul className="list-disc list-inside space-y-1.5">
            <li>SpellCraft is provided <strong>"as is"</strong> without warranty of any kind.</li>
            <li>This is a <strong>non-commercial fan project</strong> built for educational and portfolio demonstration purposes only.</li>
            <li>You may use the app freely for personal, non-commercial entertainment and learning.</li>
            <li>We reserve the right to modify or discontinue the app at any time.</li>
          </ul>
        </Section>

        {/* Trademark Disclaimer */}
        <Section icon={AlertTriangle} title="Trademark Disclaimer">
          <p>
            This is an <strong>unofficial fan-made educational project</strong>. Harry Potter™ names, characters, and spells
            are trademarks of Warner Bros. Entertainment & J.K. Rowling. SpellCraft is not affiliated with, endorsed by,
            or connected to Warner Bros. Entertainment, J.K. Rowling, or any of their subsidiaries or affiliates.
          </p>
          <p>
            All Harry Potter content used in this app is for educational and demonstrative purposes only under fair use principles.
          </p>
        </Section>

        {/* Contact */}
        <Section icon={Mail} title="Contact">
          <p>
            Questions or concerns? Reach out at <strong>rmishra@alumni.chicagobooth.edu</strong>
          </p>
        </Section>
      </div>
    </div>
  );
}
