import React, { useState } from 'react';
import contactUs from '../../assets/contactUs';
import { ImFacebook2 } from 'react-icons/im';
import { BsTwitterX } from 'react-icons/bs';
import { FaSquareInstagram } from 'react-icons/fa6';

const ContactUs = () => {
  const [formData, setFormData] = useState({});

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted', formData);
    setFormData({});
  };

  return (
    <div className="contain mx-auto px-4 py-8">
      {contactUs.map((data, index) => (
        <div
          key={index}
          className="mb-12 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-wrap gap-8 justify-between"
        >
          {/* Company Info */}
          <div className="w-full sm:w-2/3 md:w-2/5">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Company Information</h2>
            <div className="flex flex-col gap-5 text-gray-700 dark:text-gray-300">
              <p><span className="font-bold">Company Name:</span> {data.company_name}</p>
              <p><span className="font-bold">Phone:</span> {data.phone_number}</p>
              <p><span className="font-bold">Email:</span> {data.email}</p>
              <p><span className="font-bold">Street:</span> {data.address.street}</p>
              <p><span className="font-bold">City:</span> {data.address.city}</p>
              <p><span className="font-bold">State:</span> {data.address.state}</p>
              <p><span className="font-bold">Country:</span> {data.address.country}</p>
              <p><span className="font-bold">Postal Code:</span> {data.address.postal_code}</p>
            </div>
          </div>

          {/* Working Hours and Social Media */}
          <div className="w-full sm:w-2/3 md:w-2/5">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Working Hours</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-black dark:text-white font-semibold text-xl">Monday to Friday:</span> {data.working_hours.monday_to_friday}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-black dark:text-white font-semibold text-xl">Saturday:</span> {data.working_hours.saturday}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="text-black dark:text-white font-semibold text-xl">Sunday:</span> {data.working_hours.sunday}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Follow us</h3>
              <div className="flex gap-5 items-center">
                {/* facebook */}
                <div
                  className="text-3xl cursor-pointer text-blue-800 hover:scale-110 transition-transform"
                  onClick={() => handleSocialClick(data.social_media.facebook)}
                >
                  <ImFacebook2 />
                </div>
                {/* twitter */}
                <div
                  className="text-3xl cursor-pointer text-black dark:text-white hover:scale-110 transition-transform"
                  onClick={() => handleSocialClick(data.social_media.twitter)}
                >
                  <BsTwitterX />
                </div>
                {/* instagram */}
                <div
                  style={{ background: 'linear-gradient(to right, yellow, purple, pink, orange, blue)' }}
                  className="text-3xl cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => handleSocialClick(data.social_media.instagram)}
                >
                  <FaSquareInstagram />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Contact Form</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {data.contact_form.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex flex-col">
                  <label htmlFor={field.name} className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                    {field.placeholder}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      placeholder={field.placeholder}
                      onChange={handleInputChange}
                      className="border rounded-md p-2 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  ) : (
                    <input
                      required={field.required}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ''}
                      placeholder={field.placeholder}
                      onChange={handleInputChange}
                      className="border rounded-md p-2 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="cursor-pointer mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200"
              >
                {data.contact_form.submit_button_text}
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactUs;
