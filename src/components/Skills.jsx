const skills = [
  { name: 'React', level: 90 },
  { name: 'JavaScript', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'Tailwind CSS', level: 92 },
  { name: 'TypeScript', level: 75 },
  { name: 'Python', level: 70 },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Skills</h2>
        <p className="text-center text-gray-500 mb-16">Technologies I work with every day</p>
        <div className="grid sm:grid-cols-2 gap-8">
          {skills.map(({ name, level }) => (
            <div key={name}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{name}</span>
                <span className="text-indigo-600 font-semibold">{level}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
