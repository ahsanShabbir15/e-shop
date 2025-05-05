import React from 'react';
import AboutData from '../../assets/aboutUs';

const About = () => {
  return (
    <div className="contain mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white">
      {AboutData.map((data, index) => (
        <div key={index} className="mb-12 space-y-10">

          {/* Company Info */}
          <section>
            <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Company Name: {data.companyInfo.name}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">{data.companyInfo.description}</p>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
              {data.mission.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">{data.mission.content}</p>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              {data.team.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.team.members.map((member, memIndex) => (
                <div key={memIndex} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-md text-gray-500 dark:text-gray-400">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{member.bio}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400 mb-4">
              {data.values.title}
            </h2>
            <ul className="space-y-2">
              {data.values.list.map((value, valueIndex) => (
                <li key={valueIndex} className="text-lg text-gray-700 dark:text-gray-300">- {value}</li>
              ))}
            </ul>
          </section>

          {/* Vision */}
          <section>
            <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
              {data.vision.title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">{data.vision.content}</p>
          </section>

        </div>
      ))}
    </div>
  );
};

export default About;
