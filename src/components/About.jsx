export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-8xl font-bold shadow-xl">
            A
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About Me</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Hi! I'm Ambi, a passionate developer who loves building modern web applications
            with clean code and thoughtful design.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            I specialize in React, Node.js, and cloud-native architectures. When I'm not
            coding, you'll find me exploring new technologies and contributing to open source.
          </p>
          <div className="flex gap-6 text-center">
            {[
              { label: 'Projects', value: '20+' },
              { label: 'Years Exp.', value: '3+' },
              { label: 'Clients', value: '10+' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-indigo-50 rounded-2xl px-6 py-4">
                <p className="text-3xl font-extrabold text-indigo-600">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
