import { motion } from 'framer-motion'
import data from '../data/portfolio.json'

export default function Footer() {
  const alias = data.personal.alias || data.personal.name.split(' ')[0]

  return (
    <footer className="relative py-8 sm:py-10 px-4 sm:px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <span className="text-white font-bold text-sm">{alias}</span>
          <span className="text-silver-600 text-xs">·</span>
          <span className="text-silver-500 text-xs font-mono">
            © {new Date().getFullYear()}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-5 gap-y-2"
        >
          {data.social.github && (
            <motion.a
              href={data.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-silver-500 hover:text-white transition-colors duration-300 text-xs font-mono tracking-wider uppercase"
            >
              GitHub
            </motion.a>
          )}
          {data.social.linkedin && (
            <motion.a
              href={data.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-silver-500 hover:text-white transition-colors duration-300 text-xs font-mono tracking-wider uppercase"
            >
              LinkedIn
            </motion.a>
          )}
          {data.social.instagram && (
            <motion.a
              href={data.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-silver-500 hover:text-white transition-colors duration-300 text-xs font-mono tracking-wider uppercase"
            >
              Instagram
            </motion.a>
          )}
        </motion.div>
      </div>
    </footer>
  )
}
