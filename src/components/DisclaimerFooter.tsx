import { Link } from 'react-router-dom';

const DisclaimerFooter = () => (
  <footer className="w-full bg-background/90 border-t border-border/50 px-4 py-1.5 text-center mt-auto">
    <p className="text-[11px] leading-tight text-muted-foreground/70">
      This is an unofficial fan-made educational project. Harry Potter™ names, characters, and spells are trademarks of Warner Bros. Entertainment &amp; J.K. Rowling. Not affiliated with or endorsed by the rights holders. Built as a portfolio demonstration — not for commercial use.
      {' '}
      <Link to="/about" className="underline hover:text-primary transition-colors">
        Privacy & Guide
      </Link>
    </p>
  </footer>
);

export default DisclaimerFooter;
