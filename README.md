# wu-wei
a practice management app for CAM providers, especially acupuncturists

This project is in progress. check back soon for the fully featured version, Oct 11!

**Link to project COMING SOON**

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** HTML, JavaScript, Node, Express, MongoDB Atlas, Mongoose, EJS, EJS Layouts, Passport Auth, Method Override, Materialize CSS with datepicker, timepicker

Practice management software shouldn't be bulky or a hassle. From patient onboarding to records and payment, I wanted to create a secure app that would feature different views, allowing patients to log in and schedule appointments, and providers to add information directly to the appointment record. I added a section called "Patient Summary" that enables the provider to communicate an impression of the visit to the patient for future reference. The app behaves differently depending on who is logging in using the OOP principles of encapsulation and polymorphism to achieve a customized experience that is maintained on the backend.

## Optimizations

Future improvements:
<ul>
  <li>Updating appointments view to hold two tables: one for future appointments, and one for past appointments</li>
  <li>Grouping views into folders and updating hypertext references</li>
  <li>Creating an editable profile for providers that can be viewed by patients, could also add todo-style tags so patients can make notes on their preferred providers</li>
  <li>Connecting a billing api such as stripe that will process payments (I also like Helcim)</li>
  <li>Connecting provider-specific api's such as a <a href="https://github.com/moonlighter-dev/medicinals-api">medicinal herbs api</a> for more streamlined and user-friendly provider records.</li>
  <li>Adding and integrating a practice model so that patients and providers only see data relevant to the applicable business. Helpful for expanding the accessibility of the app to multiple providers in different areas.</li>
 </ul>

## Lessons Learned:

In mongoose, .findOne() and .find() return objects that are nested differently. Find returns an array of objects, but findOne returns a single object. Those objects behave very differently when passed as variables into an EJS Layout!

I originally had separate controllers for patients and providers, but then I realized that since they were both a part of the Users collection, MVC architecture dictates managing the behavior of the app in the Controller. So I abstracted Users and Appointments and wrote access for the views of each in the controller.
