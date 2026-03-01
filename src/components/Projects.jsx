const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack online store with React, Node.js, and Stripe payments.',
    tags: ['React', 'Node.js', 'MongoDB'],
    color: 'from-indigo-400 to-blue-500',
  },
  {
    title: 'Task Manager App',
    description: 'A Kanban-style productivity app with drag-and-drop and real-time sync.',
    tags: ['React', 'Firebase', 'Tailwind'],
    color: 'from-purple-400 to-pink-500',
  },
  {
    title: 'Portfolio Website',
    description: 'This very portfolio — built with React + Tailwind CSS v4 and Vite.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    color: 'from-emerald-400 to-teal-500',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Projects</h2>
        <p className="text-center text-gray-500 mb-16">A selection of things I've built</p>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map(({ title, description, tags, color }) => (
            <div
              key={title}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`h-40 bg-gradient-to-br ${color}`} />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
