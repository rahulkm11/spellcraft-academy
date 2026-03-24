import { motion } from 'framer-motion';

interface ScenarioProgressProps {
  current: number;
  total: number;
}

export default function ScenarioProgress({ current, total }: ScenarioProgressProps) {
  return (
    <div className="flex items-center gap-3 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <motion.div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
              i < current
                ? 'bg-primary border-primary text-primary-foreground'
                : i === current
                ? 'border-primary text-primary bg-primary/20'
                : 'border-muted text-muted-foreground'
            }`}
            animate={i === current ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {i < current ? '✓' : i + 1}
          </motion.div>
          {i < total - 1 && (
            <div className={`w-8 h-0.5 ${i < current ? 'bg-primary' : 'bg-muted'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
