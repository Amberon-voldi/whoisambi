export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-6 pt-20">
      <div className="text-center max-w-3xl">
        <p className="text-indigo-600 font-semibold tracking-widest uppercase text-sm mb-4">
          Hello, I'm
        </p>
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6">
          Ambi
        </h1>
        <p className="text-xl text-gray-500 mb-10">
          Full-Stack Developer &amp; Creative Designer crafting beautiful digital experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
